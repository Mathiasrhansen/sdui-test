import * as React from "react";
import { da } from "date-fns/locale";
import { differenceInCalendarDays, format, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Dage med vagt eller arrangement (vises med en prik i kalenderen).
// Erstat med rigtige data fra din backend.
const eventDates = [new Date(2026, 9, 7)];

const formatDay = (date) => {
  const text = format(date, "EEE d/M", { locale: da });
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default function Ferie() {
  const [range, setRange] = React.useState();
  const [comment, setComment] = React.useState("");

  const from = range?.from;
  const to = range?.to ?? range?.from;
  const days = from && to ? differenceInCalendarDays(to, from) + 1 : 0;

  const hasRange = from && to && !isSameDay(from, to);

  // Første/sidste dag: helt rund knap i sea-600.
  // Dagene imellem: blå-200 bånd, som løber helt ind til de runde ender.
  const endButton =
    "[&_button]:rounded-full! [&_button]:bg-sea-600! [&_button]:text-white!";
  const rangeClassNames = {
    range_start: cn(
      "rounded-none bg-transparent",
      endButton,
      hasRange &&
        "bg-[linear-gradient(to_right,transparent_50%,var(--color-blue-200)_50%)]",
    ),
    range_end: cn(
      "rounded-none bg-transparent",
      endButton,
      hasRange &&
        "bg-[linear-gradient(to_left,transparent_50%,var(--color-blue-200)_50%)]",
    ),
    range_middle:
      "rounded-none bg-blue-200 [&_button]:bg-transparent! [&_button]:rounded-none! [&_button]:text-foreground!",
  };

  const handleCreate = () => {
    if (!from || !to) return;
    // TODO: send til backend
    console.log({ from, to, comment });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col gap-4 px-4 pb-4">
        {/* Kalender */}
        <div className="rounded-xl bg-muted p-2">
          <Calendar
            mode="range"
            locale={da}
            numberOfMonths={1}
            defaultMonth={range?.from ?? new Date()}
            selected={range}
            onSelect={setRange}
            modifiers={{ event: eventDates }}
            modifiersClassNames={{
              event:
                "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-amber-400",
            }}
            className="w-full bg-transparent"
            classNames={rangeClassNames}
          />
          <div className="flex items-center gap-2 px-3 pb-2 text-sm text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Vagt eller arrangement
          </div>
        </div>

        {/* Valgt ferie */}
        <div className="rounded-xl bg-muted p-3">
          <p className="text-sm text-muted-foreground mb-1">Valgt ferie</p>
          {from ? (
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {formatDay(from)}
                {to && days > 1 && ` - ${formatDay(to)}`}
              </span>
              <span className="rounded-full bg-blue-200 px-2 py-0.5 text-sm">
                {days} {days === 1 ? "dag" : "dage"}
              </span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Vælg første og sidste feriedag
            </p>
          )}
        </div>

        {/* Kommentar */}
        <div className="rounded-xl bg-muted p-3">
          <label
            htmlFor="ferie-kommentar"
            className="block text-sm text-muted-foreground mb-2"
          >
            Kommentar
          </label>
          <Input
            id="ferie-kommentar"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-white"
          />
        </div>

        {/* Opret */}
        <Button
          variant="default"
          color="blue"
          className="w-full justify-center mt-auto"
          disabled={!from}
          onClick={handleCreate}
        >
          <Plus className="h-5 w-5" />
          Opret
        </Button>
      </div>

      <Navbar />
    </div>
  );
}
