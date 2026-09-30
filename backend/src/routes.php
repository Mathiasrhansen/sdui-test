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
