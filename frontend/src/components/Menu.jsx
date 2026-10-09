import {
  ChevronRight,
  SquareText,
  ListTodo,
  CalendarPlus,
  ChartColumnBig,
  BookText,
  Database,
  User,
  Paperclip,
  LogOut,
} from "lucide-react";
import { useLogout } from "@/auth";
import { Link, useNavigate } from "react-router-dom";

export function Menu({ children }) {
  return <div className="flex flex-col gap-3 ml-4 mr-4">{children}</div>;
}

const menuIcons = {
  dagsrapporter: SquareText,
  startlister: ListTodo,
  booking: CalendarPlus,
  klubstatistik: ChartColumnBig,
  logbog: BookText,
  stamdata: Database,
  konto: User,
  bilag: Paperclip,
};

export function MenuItem({ text, to }) {
  const key = text.toLowerCase().replace(/\s/g, "");
  const Icon = menuIcons[key];

  return (
    <Link
      to={to}
      className="flex flex-row w-full justify-between pb-1 border-b-2 border-b-grey-200 text-lg font-medium text-grey-900"
    >
      <div className="flex flex-row items-center gap-2">
        {Icon && <Icon size={18} color="#0D47A1" />}
        {text}
      </div>
      <ChevronRight size={18} />
    </Link>
  );
}

export function LogoutMenuItem({ children = "Log ud" }) {
  const logout = useLogout();
  const navigate = useNavigate();

  const onClick = () => {
    logout.mutate(undefined, {
      onSuccess: () => navigate("/login", { replace: true }),
    });
  };

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={logout.isPending}
        className="flex flex-row w-full justify-between pb-1 border-b-2 border-b-grey-200 text-lg font-medium text-left text-[#A32D2D] disabled:opacity-50"
      >
        <div className="flex flex-row items-center gap-2">
          <LogOut size={18} color="#A32D2D" />
          {logout.isPending ? "Logger ud…" : children}
        </div>
        <ChevronRight size={18} color="#A32D2D" />
      </button>
      {logout.error && (
        <p role="alert" className="text-sm text-destructive">
          {logout.error.message}
        </p>
      )}
    </div>
  );
}
