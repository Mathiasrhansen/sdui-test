import { NavLink } from "react-router-dom";
import { House, Plane, Warehouse, Calendar, Menu } from "lucide-react";

const items = [
  { label: "Hjem", to: "/", icon: House },
  { label: "Flyv", to: "/flyv", icon: Plane },
  { label: "Klub", to: "/klub", icon: Warehouse },
  { label: "Kalender", to: "/kalender", icon: Calendar },
  { label: "Mere", to: "/mere", icon: Menu },
];

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 bg-sea-600 text-white pb-[env(safe-area-inset-bottom)] pt-1">
      <ul className="grid h-16 grid-cols-5">
        {items.map(({ label, to, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex h-full flex-col items-center justify-center gap-1 text-sm ${
                  isActive ? "font-semibold opacity-100" : "opacity-70"
                }`
              }
            >
              <Icon className="h-6 w-6" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
