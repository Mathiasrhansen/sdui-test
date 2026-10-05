// src/components/Card.jsx
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pill } from "@/components/Pill";

// Fælles ramme
export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn("rounded-xl border border-grey-400 bg-white", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Type 1: liste af rækker med ikon + tekst
export function CardList({ className, children }) {
  return (
    <Card className={cn("divide-y divide-grey-400 overflow-hidden", className)}>
      {children}
    </Card>
  );
}

export function IconRow({ icon: Icon, children, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-lg",
        onClick && "cursor-pointer",
      )}
    >
      <Icon className="h-6 w-6 shrink-0 text-blue-800" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

// Rækken: tekst + pill og valgfri favorit-stjerne (ingen ramme)
export function ItemRow({
  title,
  pill, // { label: "OK", color: "blue" }
  favorite = false,
  onToggleFavorite, // hvis den er med, vises stjernen
  className,
}) {
  return (
    <div className={cn("flex items-center gap-2 px-3 py-2", className)}>
      {onToggleFavorite && (
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label={favorite ? "Fjern som favorit" : "Tilføj som favorit"}
          aria-pressed={favorite}
        >
          <Star
            className={cn(
              "h-6 w-6",
              favorite ? "fill-warning-400 text-warning-400" : "text-grey-400",
            )}
          />
        </button>
      )}
      <span className="flex-1 text-lg">{title}</span>
      {pill && (
        <Pill variant="subtle" color={pill.color} className="px-3 text-sm">
          {pill.label}
        </Pill>
      )}
    </div>
  );
}

// Type 2 + 3: tekst + pill, og valgfri favorit-stjerne
export function ItemCard({ className, ...rowProps }) {
  return (
    <Card className={className}>
      <ItemRow {...rowProps} />
    </Card>
  );
}
