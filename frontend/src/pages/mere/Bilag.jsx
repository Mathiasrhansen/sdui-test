import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Plus, ReceiptText } from "lucide-react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const statusStyle = {
  behandles: { label: "Behandles", className: "bg-amber-100 text-amber-800" },
  udbetalt: { label: "Udbetalt", className: "bg-green-200 text-green-800" },
  afvist: { label: "Afvist", className: "bg-red-100 text-red-600" },
};

const kroner = new Intl.NumberFormat("da-DK", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Eksempeldata. Erstat med data fra din backend (fx et react-query hook).
// Sæt listen til [] for at se "tom"-tilstanden fra mockuppet.
const bilag = [
  {
    id: 1,
    category: "Brændstof",
    creditor: "Mathias Rønne-Hansen",
    date: "2026-09-21",
    amount: 485,
    status: "udbetalt",
  },
  {
    id: 2,
    category: "Mekaniker",
    creditor: "Mathias Rønne-Hansen",
    date: "2026-09-13",
    amount: 665,
    status: "udbetalt",
  },
  {
    id: 3,
    category: "Netto",
    creditor: "Mathias Rønne-Hansen",
    date: "2026-09-10",
    amount: 68,
    status: "afvist",
  },
];

function BilagCard({ item }) {
  const status = statusStyle[item.status];
  return (
    <div className="flex justify-between gap-3 rounded-xl bg-muted p-4">
      <div className="flex flex-col gap-1">
        <span className="font-medium">{item.category}</span>
        <span className="text-muted-foreground">{item.creditor}</span>
        <span className="text-muted-foreground">
          {format(parseISO(item.date), "dd/MM-yyyy")}
        </span>
      </div>
      <div className="flex flex-col items-end justify-between">
        <span
          className={`rounded-full px-3 py-0.5 text-sm ${status.className}`}
        >
          {status.label}
        </span>
        <span className="font-medium">{kroner.format(item.amount)} kr</span>
      </div>
    </div>
  );
}

function EmptyCard({ title, subtitle, className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 rounded-xl bg-muted p-6 text-center ${className}`}
    >
      <ReceiptText className="mb-1 h-8 w-8 text-muted-foreground" />
      <p className="text-xl font-medium">{title}</p>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export default function Bilag() {
  const pending = bilag.filter((b) => b.status === "behandles");
  const finished = bilag.filter((b) => b.status !== "behandles");

  return (
    <div>
      <Header />
      <div className="px-4">
        <h2 className="text-xl font-heading mb-2">Under behandling</h2>
        <div className="flex flex-col gap-3">
          {pending.length > 0 ? (
            pending.map((item) => <BilagCard key={item.id} item={item} />)
          ) : (
            <EmptyCard
              title="Ingen bilag"
              subtitle="Upload dit bilag til kasseren"
            />
          )}
          <Button
            asChild
            variant="default"
            color="blue"
            className="w-full justify-center"
          >
            <Link to="/mere/bilag/opret">
              <Plus className="h-5 w-5" />
              Tilføj bilag
            </Link>
          </Button>
        </div>

        <h2 className="text-xl font-heading mt-6 mb-2">Afsluttede bilag</h2>
        <div className="flex flex-col gap-3">
          {finished.length > 0 ? (
            finished.map((item) => <BilagCard key={item.id} item={item} />)
          ) : (
            <EmptyCard title="Ingen bilag endnu" className="min-h-[40vh]" />
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
}
