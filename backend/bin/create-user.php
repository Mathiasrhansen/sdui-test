<?php
declare(strict_types=1);
// Brug: php bin/create-user.php email "Navn" adgangskode [admin]
require __DIR__ . '/../src/Env.php';
require __DIR__ . '/../src/Db.php';
Env::load(__DIR__ . '/../.env');

[, $email, $name, $password] = $argv + [null, null, null, null];
$role = ($argv[4] ?? 'user') === 'admin' ? 'admin' : 'user';
if (!$email || !$name || !$password) exit("Brug: php bin/create-user.php email \"Navn\" adgangskode [admin]\n");

Db::pdo()->prepare('INSERT INTO users (email, name, role, password_hash) VALUES (?, ?, ?, ?)')
    ->execute([strtolower($email), $name, $role, password_hash($password, PASSWORD_DEFAULT)]);
echo "Bruger oprettet: $email ($role)\n";
