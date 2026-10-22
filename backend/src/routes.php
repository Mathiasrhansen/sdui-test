<?php
declare(strict_types=1);

// Gyldig bcrypt-hash brugt til at udligne svartid, når e-mailen ikke findes.
const DUMMY_HASH = '$2y$10$.vGA1O9wmRjrwAVXD98HNOgsNpDczlqm3Jq7KnEd1rVAGv3Fykk1a';

return [
    ['POST', '/api/login', function () {
        $in = Http::body();
        $email = strtolower(trim((string)($in['email'] ?? '')));
        $password = (string)($in['password'] ?? '');
        if ($email === '' || $password === '') Http::fail('Udfyld email og adgangskode', 422);

        $st = Db::pdo()->prepare('SELECT id, email, name, role, password_hash FROM users WHERE email = ?');
        $st->execute([$email]);
        $user = $st->fetch();

        $valid = password_verify($password, $user['password_hash'] ?? DUMMY_HASH) && $user;
        if (!$valid) Http::fail('Forkert email eller adgangskode', 401);

        session_regenerate_id(true); // forhindrer session fixation
        $_SESSION['uid'] = (int)$user['id'];
        unset($user['password_hash']);
        Http::json($user);
    }],

    ['POST', '/api/logout', function () {
        $_SESSION = [];
        if (session_status() === PHP_SESSION_ACTIVE) session_destroy();
        setcookie(session_name(), '', ['expires' => time() - 3600, 'path' => '/', 'httponly' => true, 'samesite' => 'Lax']);
        Http::json(['ok' => true]);
    }],

    ['GET', '/api/me', fn() => Http::json(Http::requireUser())],

    // Alle fly med seneste notes status og den loggede brugers favorit-markering
    ['GET', '/api/fly', function () {
        $user = Http::requireUser();
        $st = Db::pdo()->prepare(
            'SELECT f.id, f.flymodel, f.callsign, n.status, n.statusColor,
                    (ff.fly_id IS NOT NULL) AS favorite
             FROM fly f
             LEFT JOIN noter n ON n.id = (SELECT MAX(id) FROM noter WHERE callsign = f.callsign)
             LEFT JOIN fly_favoritter ff ON ff.fly_id = f.id AND ff.user_id = ?
             ORDER BY f.callsign'
        );
        $st->execute([$user['id']]);
        $rows = array_map(
            fn($r) => ['favorite' => (bool)$r['favorite']] + $r,
            $st->fetchAll()
        );
        Http::json($rows);
    }],

    // Sæt/fjern favorit for den loggede bruger: {fly_id, favorite: true|false}
    ['POST', '/api/fly/favorite', function () {
        $user = Http::requireUser();
        $in = Http::body();
        $flyId = filter_var($in['fly_id'] ?? null, FILTER_VALIDATE_INT);
        if ($flyId === false || !is_bool($in['favorite'] ?? null)) {
            Http::fail('Ugyldigt input', 422);
        }

        $pdo = Db::pdo();
        $st = $pdo->prepare('SELECT 1 FROM fly WHERE id = ?');
        $st->execute([$flyId]);
        if (!$st->fetchColumn()) Http::fail('Flyet findes ikke', 404);

        if ($in['favorite']) {
            $pdo->prepare('INSERT IGNORE INTO fly_favoritter (user_id, fly_id) VALUES (?, ?)')
                ->execute([$user['id'], $flyId]);
        } else {
            $pdo->prepare('DELETE FROM fly_favoritter WHERE user_id = ? AND fly_id = ?')
                ->execute([$user['id'], $flyId]);
        }
        Http::json(['fly_id' => $flyId, 'favorite' => $in['favorite']]);
    }],

    // Eksempel på beskyttet ressource, altid afgrænset til den loggede bruger
    ['GET', '/api/notes', function () {
        $user = Http::requireUser();
        $st = Db::pdo()->prepare('SELECT id, body, created_at FROM notes WHERE user_id = ? ORDER BY id DESC LIMIT 50');
        $st->execute([$user['id']]);
        Http::json($st->fetchAll());
    }],

    ['POST', '/api/notes', function () {
        $user = Http::requireUser();
        $body = trim((string)(Http::body()['body'] ?? ''));
        if ($body === '' || mb_strlen($body) > 500) Http::fail('Noten skal være 1-500 tegn', 422, ['body' => 'Ugyldig længde']);
        $pdo = Db::pdo();
        $pdo->prepare('INSERT INTO notes (user_id, body) VALUES (?, ?)')->execute([$user['id'], $body]);
        $st = $pdo->prepare('SELECT id, body, created_at FROM notes WHERE id = ?');
        $st->execute([$pdo->lastInsertId()]);
        Http::json($st->fetch(), 201);
    }],

    // Liste over startlister med antal starter. ?page=1&q=søgetekst
    ['GET', '/api/start-lists', function () {
        Http::requireUser();
        $perPage = 5;
        $page = max(1, (int)($_GET['page'] ?? 1));
        $q = trim((string)($_GET['q'] ?? ''));
        $like = '%' . addcslashes($q, '%_\\') . '%';
        $where = "(? = '' OR sl.location LIKE ? OR sl.launch_method LIKE ? OR DATE_FORMAT(sl.date, '%d/%m-%Y') LIKE ?)";
        $args = [$q, $like, $like, $like];

        $pdo = Db::pdo();
        $st = $pdo->prepare("SELECT COUNT(*) FROM start_lists sl WHERE $where");
        $st->execute($args);
        $total = (int)$st->fetchColumn();

        $offset = ($page - 1) * $perPage;
        $st = $pdo->prepare(
            "SELECT sl.id, sl.date, sl.location, sl.launch_method,
                    COALESCE(SUM(i.launch_count), 0) AS launch_count
             FROM start_lists sl
             LEFT JOIN start_list_items i ON i.start_list_id = sl.id
             WHERE $where
             GROUP BY sl.id
             ORDER BY sl.date DESC, sl.id DESC
             LIMIT $perPage OFFSET $offset"
        );
        $st->execute($args);
        $items = array_map(
            fn($r) => ['id' => (int)$r['id'], 'launch_count' => (int)$r['launch_count']] + $r,
            $st->fetchAll()
        );
        Http::json(['items' => $items, 'page' => $page, 'pages' => max(1, (int)ceil($total / $perPage))]);
    }],

    // Én startliste med flyregistrering, linjer og totaler. ?id=3
    ['GET', '/api/start-list', function () {
        Http::requireUser();
        $id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT);
        if ($id === false || $id === null) Http::fail('Ugyldigt id', 422);

        $pdo = Db::pdo();
        $st = $pdo->prepare('SELECT id, date, location, launch_method FROM start_lists WHERE id = ?');
        $st->execute([$id]);
        $list = $st->fetch();
        if (!$list) Http::fail('Startlisten findes ikke', 404);

        $st = $pdo->prepare(
            'SELECT i.id, u.name, u.initials, f.callsign, f.flymodel AS model,
                    i.launch_count, i.flight_minutes, i.price
             FROM start_list_items i
             JOIN users u ON u.id = i.user_id
             JOIN fly f ON f.id = i.fly_id
             WHERE i.start_list_id = ?
             ORDER BY i.id'
        );
        $st->execute([$id]);
        $items = array_map(fn($r) => [
            'id' => (int)$r['id'],
            'launch_count' => (int)$r['launch_count'],
            'flight_minutes' => (int)$r['flight_minutes'],
            'price' => (float)$r['price'],
        ] + $r, $st->fetchAll());

        // Flyregistrering og totaler udledes af linjerne
        $aircraft = [];
        $total = ['launch_count' => 0, 'flight_minutes' => 0, 'price' => 0.0];
        foreach ($items as $it) {
            $a = &$aircraft[$it['callsign']];
            $a ??= ['callsign' => $it['callsign'], 'model' => $it['model'], 'launch_count' => 0, 'flight_minutes' => 0];
            $a['launch_count'] += $it['launch_count'];
            $a['flight_minutes'] += $it['flight_minutes'];
            unset($a);
            $total['launch_count'] += $it['launch_count'];
            $total['flight_minutes'] += $it['flight_minutes'];
            $total['price'] += $it['price'];
        }

        Http::json($list + ['aircraft' => array_values($aircraft), 'items' => $items, 'total' => $total]);
    }],
];
