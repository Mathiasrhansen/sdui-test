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
];