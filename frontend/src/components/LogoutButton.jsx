import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useLogout } from "@/auth";
import { Button } from "@/components/ui/button";

export default function LogoutButton({
  variant = "outline",
  size,
  className,
  children = "Log ud",
}) {
  const logout = useLogout();
  const navigate = useNavigate();

  const onClick = () => {
    logout.mutate(undefined, {
      onSuccess: () => navigate("/login", { replace: true }),
    });
  };

  return (
    <div className="grid gap-2">
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={onClick}
        disabled={logout.isPending}
      >
        <LogOut className="h-4 w-4" />
        {logout.isPending ? "Logger ud…" : children}
      </Button>
      {logout.error && (
        <p role="alert" className="text-sm text-destructive">
          {logout.error.message}
        </p>
      )}
    </div>
  );
}
