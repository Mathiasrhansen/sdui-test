<?php
declare(strict_types=1);

final class Http
{
    public static function json(mixed $data, int $status = 200): never
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit;
    }

    public static function fail(string $message, int $status, array $errors = []): never
    {
        self::json(['error' => $message, 'errors' => $errors], $status);
    }

    public static function body(): array
    {
        $raw = file_get_contents('php://input');
        if ($raw === '' || $raw === false) return [];
        $data = json_decode($raw, true);
        if (!is_array($data)) self::fail('Ugyldig JSON', 400);
        return $data;
    }

    /** Returnerer den loggede bruger eller svarer 401. Kald den på HVERT beskyttet endpoint. */
    public static function requireUser(): array
    {
        $id = $_SESSION['uid'] ?? null;
        if (!$id) self::fail('Ikke logget ind', 401);
        $st = Db::pdo()->prepare('SELECT id, email, name, role FROM users WHERE id = ?');
        $st->execute([$id]);
        $user = $st->fetch();
        if (!$user) {
            $_SESSION = [];
            self::fail('Ikke logget ind', 401);
        }
        return $user;
    }

    public static function requireRole(array $user, string $role): void
    {
        if ($user['role'] !== $role) self::fail('Ingen adgang', 403);
    }

    /**
     * CSRF-beskyttelse for ændrende requests (POST/PUT/PATCH/DELETE):
     * 1) SameSite=Lax på session-cookien
     * 2) kræver en custom header (kan ikke sendes cross-origin uden CORS-preflight,
     *    og vi sender ingen CORS-headere)
     * 3) hvis Origin er sat, skal den passe til Host
     */
    public static function guardCsrf(): void
    {
        if (in_array($_SERVER['REQUEST_METHOD'], ['GET', 'HEAD', 'OPTIONS'], true)) return;
        if (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') !== 'fetch') self::fail('Ugyldig anmodning', 403);
        $origin = $_SERVER['HTTP_ORIGIN'] ?? null;
        if ($origin !== null) {
            $host = parse_url($origin, PHP_URL_HOST) . (($p = parse_url($origin, PHP_URL_PORT)) ? ":$p" : '');
            if ($host !== ($_SERVER['HTTP_HOST'] ?? '')) self::fail('Ugyldig origin', 403);
        }
    }
}
