import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useMe } from "@/auth";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Profile from "./pages/Profile";
import Flyv from "./pages/Flyv";
import Klub from "./pages/Klub";
import Kalender from "./pages/Kalender";
import Mere from "./pages/Mere";

// Kun for brugervenlighed! Den rigtige adgangskontrol sker i PHP på hvert endpoint.
function RequireAuth() {
  const { data: user, isPending } = useMe();
  const location = useLocation();
  if (isPending)
    return <p className="p-6 text-sm text-muted-foreground">Indlæser…</p>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    element: <RequireAuth />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/flyv", element: <Flyv /> },
      { path: "/klub", element: <Klub /> },
      { path: "/kalender", element: <Kalender /> },
      { path: "/mere", element: <Mere /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
