# Starter: Vite + React + Router + Tailwind/shadcn + PHP (rent API) + MariaDB

## Kom i gang
**Database**

    mysql -u root -p < backend/schema.sql
    cp backend/.env.example backend/.env       # ret DB_USER / DB_PASS
    cd backend && php bin/create-user.php dig@example.dk "Dit Navn" hemmeligt123

**API** (kræver PHP 8.1+ med pdo_mysql)

    cd backend && php -S localhost:8000 -t public public/index.php

**Frontend** (i en anden terminal)

    cd frontend && npm install && npm run dev      # http://localhost:5173

Vite proxyer `/api` → `localhost:8000`, så browseren kun taler med ét origin (ingen CORS).

## API
| Metode | Sti | Beskrivelse |
|---|---|---|
| POST | /api/login | `{email, password}` → sætter session-cookie |
| POST | /api/logout | |
| GET | /api/me | 200 = bruger, 401 = ikke logget ind |
| GET/POST | /api/notes | eksempel på beskyttet ressource |

Nyt endpoint = ny linje i `backend/src/routes.php`. Kald `Http::requireUser()` først, og `Http::requireRole()` til admin-ting.

## Sikkerhed (indbygget)
- `password_hash`/`password_verify`, ens svar og svartid for ukendt e-mail vs. forkert kode
- Session-cookie: HttpOnly, SameSite=Lax, Secure over https, `session_regenerate_id` ved login
- CSRF: custom header `X-Requested-With` + Origin-tjek på alle ændrende requests
- PDO med prepared statements; data afgrænses altid til `user_id`

**Mangler til produktion:** rate limiting på `/api/login`, HTTPS, `APP_DEBUG=0`, evt. password-reset.

## Produktion (Apache-eksempel)
Byg med `npm run build`, og server `frontend/dist` som rod:

    DocumentRoot /var/www/app/frontend/dist
    <Directory /var/www/app/frontend/dist>
        FallbackResource /index.html
    </Directory>
    Alias /api /var/www/app/backend/public
    <Directory /var/www/app/backend/public>
        FallbackResource /api/index.php
        Require all granted
    </Directory>

Flere shadcn-komponenter: `cd frontend && npx shadcn@latest add dialog` (`components.json` er sat op).
