import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";
import { useMe } from "@/auth";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";

// Kun for brugervenlighed! Den rigtige adgangskontrol sker i PHP på hvert endpoint.
function RequireAuth() {
  const { data: user, isPending } = useMe();
  const location = useLocation();
  if (isPending) return <p className="p-6 text-sm text-muted-foreground">Indlæser…</p>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { element: <RequireAuth />, children: [{ path: "/", element: <Dashboard /> }] },
  { path: "*", element: <Navigate to="/" replace /> },
]);
