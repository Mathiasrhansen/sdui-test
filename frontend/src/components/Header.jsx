import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const pages = [
  { label: "Flyv", path: "/flyv" },
  { label: "Klub", path: "/klub" },
  { label: "Kalender", path: "/kalender" },
  { label: "Mere", path: "/mere" },
];

// Nested sider: viser en tilbageknap til parent
const nestedPages = [
  { label: "Ferie", path: "/kalender/ferie", parent: "/kalender" },
];

const Header = () => {
  const { pathname } = useLocation();

  const nested = nestedPages.find((page) => pathname.startsWith(page.path));

  if (nested) {
    return (
      <header className="w-full bg-sea-600 text-white h-[10vh] flex flex-col justify-center p-4 mb-5 font-heading">
        <Link to={nested.parent} className="flex items-center gap-2 text-base">
          <ArrowLeft className="h-4 w-4" />
          Tilbage
        </Link>
        <span className="text-4xl">{nested.label}</span>
      </header>
    );
  }

  const activePage =
    pages.find((page) => pathname.startsWith(page.path))?.label ??
    "DSVU online";

  return (
    <header className="w-full bg-sea-600 text-white h-[10vh] flex place-items-center p-4 mb-5 text-4xl font-heading">
      {activePage}
    </header>
  );
};

export default Header;
