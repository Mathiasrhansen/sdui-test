import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useLogin, useMe } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const { data: user } = useMe();
  const login = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const from = location.state?.from?.pathname ?? "/";

  if (user) return <Navigate to={from} replace />;

  const onSubmit = (e) => {
    e.preventDefault();
    login.mutate(form, { onSuccess: () => navigate(from, { replace: true }) });
  };

  return (
    <main className="grid min-h-screen place-items-center bg-muted p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Log ind</CardTitle>
          <CardDescription>Brug din e-mail og adgangskode.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" autoComplete="username" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Adgangskode</Label>
              <Input id="password" type="password" autoComplete="current-password" required value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            {login.error && <p role="alert" className="text-sm text-destructive">{login.error.message}</p>}
            <Button type="submit" disabled={login.isPending}>{login.isPending ? "Logger ind…" : "Log ind"}</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
