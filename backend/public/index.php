<?php
declare(strict_types=1);

spl_autoload_register(function (string $class) {
    $file = __DIR__ . "/../src/$class.php";
    if (is_file($file)) require $file;
});

Env::load(__DIR__ . '/../.env');
$debug = Env::get('APP_DEBUG') === '1';

set_exception_handler(function (Throwable $e) use ($debug) {
    error_log((string)$e);
    Http::fail($debug ? $e->getMessage() : 'Serverfejl', 500);
});

$path = rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/', '/') ?: '/';
$method = $_SERVER['REQUEST_METHOD'];

// Session-cookie: HttpOnly, SameSite=Lax, Secure over https. Startes kun når nødvendigt.
session_name('app_session');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'httponly' => true,
    'samesite' => 'Lax',
]);
if (isset($_COOKIE['app_session']) || $path === '/api/login') session_start();

Http::guardCsrf();

$allowed = [];
foreach (require __DIR__ . '/../src/routes.php' as [$m, $p, $handler]) {
    if ($p !== $path) continue;
    if ($m === $method) $handler();
    $allowed[] = $m;
}
if ($allowed) {
    header('Allow: ' . implode(', ', $allowed));
    Http::fail('Metode ikke tilladt', 405);
}
Http::fail('Ikke fundet', 404);
