import { useLocation } from "react-router-dom";

const pages = [
  { label: "Flyv", path: "/flyv" },
  { label: "Klub", path: "/klub" },
  { label: "Kalender", path: "/kalender" },
  { label: "Mere", path: "/mere" },
];

const Header = () => {
  const { pathname } = useLocation();

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
