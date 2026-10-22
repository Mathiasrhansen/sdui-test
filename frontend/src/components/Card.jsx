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
  subtitle,
  pill, // { label: "OK", color: "blue", className: "..." }
  right,
  actions,
  titleClassName,
  favorite = false,
  onToggleFavorite,
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

      <div className="flex-1 min-w-0">
        <div className={cn("text-lg", titleClassName)}>{title}</div>
        {subtitle && <div className="text-base">{subtitle}</div>}
      </div>

      {right && <span className="text-lg">{right}</span>}

      {(pill || actions) && (
        <div className="flex flex-col items-end gap-1">
          {pill && (
            <Pill
              variant="subtle"
              color={pill.color}
              className={cn("px-3 text-sm", pill.className)}
            >
              {pill.label}
            </Pill>
          )}
          {actions}
        </div>
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

// Til Dagsrapporter
export function RapportCard({ date, instructor, endTime }) {
  return (
    <button className="flex w-full items-center justify-between rounded-xl bg-grey-50 px-4 py-3">
      <div className="flex flex-col text-left">
        <p className="text-grey-900">{date}</p>
        <p className="text-grey-600">{instructor}</p>
      </div>
      <Pill
        variant="subtle"
        color={endTime ? "blue" : "yellow"}
        className="px-3 text-sm"
      >
        {endTime ? `Afmeldt kl ${endTime}` : "Ikke afmeldt"}
      </Pill>
    </button>
  );
}

//til Startlister
export function StartCard({
  date,
  startLocation,
  startType,
  startAmmount,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl bg-grey-50 px-4 py-3"
    >
      <div className="flex flex-col text-left">
        <p className="text-grey-900">{date}</p>
        <p className="text-grey-600">
          {startLocation} · {startType} · {startAmmount} starter
        </p>
      </div>
      <Pill variant="subtle" color="blue" className="px-3 text-sm">
        Åben
      </Pill>
    </button>
  );
}

//til booking
export function BookingCard({ title, availableAmmount }) {
  return (
    <button className="flex w-full items-center justify-between rounded-xl bg-grey-50 px-4 py-3">
      <p className="text-grey-900">{title}</p>
      <Pill
        variant="subtle"
        color={availableAmmount ? "green" : "grey"}
        className="px-3 text-sm"
      >
        {availableAmmount ? `${availableAmmount} ledige` : "0 ledige"}
      </Pill>
    </button>
  );
}

//til logbog
export function LogCard({
  flightName,
  flightType,
  flightTime,
  startLocation,
  instructorInitials,
  startType,
}) {
  return (
    <button className="flex w-full items-center justify-between rounded-xl bg-grey-50 px-4 py-3">
      <div className="flex flex-col text-left">
        <p className="text-grey-900">
          {flightName} · {flightType}
        </p>
        <p className="text-grey-600">
          {startLocation} · Instruktør {instructorInitials}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-grey-900">{flightTime}</p>
        <Pill variant="subtle" color="blue" className="px-3 text-sm">
          {startType}
        </Pill>
      </div>
    </button>
  );
}
