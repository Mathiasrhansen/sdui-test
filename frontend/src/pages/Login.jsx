import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useLogin, useMe } from "@/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Header-baggrund (DSVU-skyer). Ligger inline som data-URI, så den ikke afhænger af SVG-loaderen i bundleren.
const HEADER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="402" height="200" viewBox="0 0 402 200" fill="none"><rect width="402" height="200" fill="#1C4D8D"/><path d="M0 200V190C10.5789 183.333 21.1579 182.333 31.7368 187C48.6632 174.333 65.5895 176 82.5158 192C90.9789 186.667 99.0895 184.667 106.847 186C126.595 170 145.989 171.667 165.032 191C177.726 181 190.421 180 203.116 188C210.874 184 218.279 185.667 225.332 193C247.195 175 268.705 173.667 289.863 189C301.147 181.667 312.432 182.667 323.716 192C339.937 178.667 356.511 178 373.437 190C382.605 183.333 392.126 183.333 402 190V200H0Z" fill="white"/></svg>`;
const HEADER_BG = `url("data:image/svg+xml,${encodeURIComponent(HEADER_SVG)}")`;

// TODO: erstat med rigtige klubber (fx fra et API-kald)
const CLUBS = [
  { value: "klub-1", label: "Nordsjællands Svæeveflyklub" },
  { value: "klub-2", label: "Fr.sund-Fr.værk Flyvelkub" },
];

export default function Login() {
  const { data: user } = useMe();
  const login = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    email: "",
    password: "",
    club: "",
    remember: false,
  });
  const from = location.state?.from?.pathname ?? "/";

  if (user) return <Navigate to={from} replace />;

  const onSubmit = (e) => {
    e.preventDefault();
    login.mutate(form, { onSuccess: () => navigate(from, { replace: true }) });
  };

  const labelClass = "text-lg font-normal uppercase text-white";
  const inputClass =
    "h-10 rounded-xl border-0 bg-white px-3 text-sea-800 focus-visible:ring-2 focus-visible:ring-white/70 text-lg";

  return (
    <main className="min-h-screen bg-white">
      <header
        className="grid h-[25vh] place-items-center px-4 pb-8"
        style={{
          backgroundColor: "#1C4D8D",
          backgroundImage: HEADER_BG,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "center bottom",
        }}
      >
        <h1 className="text-center text-4xl font-medium text-white sm:text-5xl">
          DSVU online
        </h1>
      </header>

      <div className="px-6 pb-10 pt-16">
        <form
          onSubmit={onSubmit}
          className="mx-auto grid w-full max-w-sm gap-5 rounded-xl bg-sea-600 p-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="username" className={labelClass}>
              Brugernavn
            </Label>
            <Input
              id="username"
              type="text"
              autoComplete="username"
              required
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className={labelClass}>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className={inputClass}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="relative">
            <select
              id="club"
              aria-label="Vælg klub"
              required
              value={form.club}
              onChange={(e) => setForm({ ...form, club: e.target.value })}
              className="h-10 w-full appearance-none rounded-xl border border-black bg-white px-3 pr-10 text-sm uppercase text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <option value="" disabled>
                Vælg klub
              </option>
              {CLUBS.map((club) => (
                <option key={club.value} value={club.value}>
                  {club.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-black"
            />
          </div>

          {login.error && (
            <p
              role="alert"
              className="rounded-md bg-white/90 px-3 py-2 text-sm text-destructive"
            >
              {login.error.message}
            </p>
          )}

          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="remember"
              className="flex cursor-pointer items-center gap-2 text-sm uppercase text-white"
            >
              Husk mig
              <input
                id="remember"
                type="checkbox"
                checked={form.remember}
                onChange={(e) =>
                  setForm({ ...form, remember: e.target.checked })
                }
                className="size-4 cursor-pointer appearance-none rounded-[3px] border border-white bg-transparent checked:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              />
            </label>

            <button
              type="submit"
              disabled={login.isPending}
              className="h-9 min-w-36 rounded-xl border border-black/70 bg-neutral-100 px-6 text-lg uppercase text-sea-800 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:opacity-60"
            >
              {login.isPending ? "Logger ind…" : "Log ind"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
