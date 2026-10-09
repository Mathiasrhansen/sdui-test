import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useMe } from "@/auth";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Flyv from "@/pages/Flyv";
import Dagsrapporter from "@/pages/Dagsrapporter";
import Startlister from "@/pages/Startlister";
import Booking from "@/pages/Booking";
import Klubstatistik from "@/pages/Klubstatistik";
import Logbog from "@/pages/Logbog";
import Klub from "@/pages/Klub";
import Kalender from "@/pages/Kalender";
import Ferie from "@/pages/Ferie";
import Mere from "@/pages/Mere";
import Stamdata from "@/pages/Stamdata";
import Konto from "@/pages/Konto";
import Bilag from "@/pages/Bilag";

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
      { path: "/flyv/dagsrapporter", element: <Dagsrapporter /> },
      { path: "/flyv/startlister", element: <Startlister /> },
      { path: "/flyv/booking", element: <Booking /> },
      { path: "/flyv/klubstatistik", element: <Klubstatistik /> },
      { path: "/flyv/logbog", element: <Logbog /> },
      { path: "/klub", element: <Klub /> },
      { path: "/kalender", element: <Kalender /> },
      { path: "/kalender/ferie", element: <Ferie /> },
      { path: "/mere", element: <Mere /> },
      { path: "/mere/stamdata", element: <Stamdata /> },
      { path: "/mere/konto", element: <Konto /> },
      { path: "/mere/bilag", element: <Bilag /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
