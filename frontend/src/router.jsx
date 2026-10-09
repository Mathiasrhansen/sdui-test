import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useMe } from "@/auth";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Flyv from "@/pages/flyv/Flyv";
import Dagsrapporter from "@/pages/flyv/Dagsrapporter";
import Startlister from "@/pages/flyv/Startlister";
import Booking from "@/pages/flyv/Booking";
import Klubstatistik from "@/pages/flyv/Klubstatistik";
import Logbog from "@/pages/flyv/Logbog";
import Klub from "@/pages/Klub";
import Kalender from "@/pages/kalender/Kalender";
import Ferie from "@/pages/kalender/Ferie";
import Mere from "@/pages/mere/Mere";
import Stamdata from "@/pages/mere/Stamdata";
import Konto from "@/pages/mere/Konto";
import Bilag from "@/pages/mere/Bilag";
import OpretBilag from "@/pages/mere/OpretBilag";

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
      { path: "/mere/bilag/opret", element: <OpretBilag /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
