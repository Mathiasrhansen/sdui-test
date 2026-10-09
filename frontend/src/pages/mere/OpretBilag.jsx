import { useNavigate } from "react-router-dom";
import { ChevronDown, Plus } from "lucide-react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

// Midlertidige lister. Erstat med data fra din backend.
const categories = ["Brændstof", "Mekaniker", "Andet"];
const creditors = ["Mathias Rønne-Hansen"];

const inputClass = "rounded-lg bg-white px-3 py-1.5";

function Field({ label, htmlFor, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function AmountInput({ id, name, required }) {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        name={name}
        type="number"
        inputMode="decimal"
        step="1"
        min="0"
        required={required}
        className={`${inputClass} w-32`}
      />
      <span>kr</span>
    </div>
  );
}

function SelectInput({ id, name, options }) {
  return (
    <div className="relative w-fit">
      <select
        id={id}
        name={name}
        required
        defaultValue=""
        className={`${inputClass} appearance-none pr-9`}
      >
        <option value="" disabled>
          Vælg værdi
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2" />
    </div>
  );
}

export default function OpretBilag() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // TODO: send `data` (multipart) til dit PHP-endpoint
    console.log(Object.fromEntries(data));
    navigate("/mere/bilag");
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4">
        <div className="flex flex-col gap-4 rounded-xl bg-muted p-4">
          <Field label="Købsdato" htmlFor="purchaseDate">
            <input
              id="purchaseDate"
              name="purchaseDate"
              type="date"
              required
              className={`${inputClass} w-fit`}
            />
          </Field>

          <Field label="Beløb" htmlFor="amount">
            <AmountInput id="amount" name="amount" required />
          </Field>

          <Field label="Beskrivelse" htmlFor="description">
            <textarea
              id="description"
              name="description"
              rows={3}
              className={`${inputClass} w-full resize-none`}
            />
          </Field>

          <Field label="Kategori" htmlFor="category">
            <SelectInput id="category" name="category" options={categories} />
          </Field>

          <Field label="Kreditor" htmlFor="creditor">
            <SelectInput id="creditor" name="creditor" options={creditors} />
          </Field>

          <Field label="Udbetales" htmlFor="payout">
            <AmountInput id="payout" name="payout" required />
          </Field>

          <Field label="Bank konto" htmlFor="bankRegNo">
            <div className="flex gap-2">
              <input
                id="bankRegNo"
                name="bankRegNo"
                inputMode="numeric"
                maxLength={4}
                placeholder="Reg."
                aria-label="Registreringsnummer"
                className={`${inputClass} w-20`}
              />
              <input
                name="bankAccountNo"
                inputMode="numeric"
                maxLength={10}
                placeholder="Kontonummer"
                aria-label="Kontonummer"
                className={`${inputClass} min-w-0 flex-1`}
              />
            </div>
          </Field>

          <Field label="Bilag fil" htmlFor="file">
            <input
              id="file"
              name="file"
              type="file"
              accept="image/*,application/pdf"
              required
              className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-1.5"
            />
          </Field>
        </div>

        <Button
          type="submit"
          variant="default"
          color="blue"
          className="w-full justify-center"
        >
          <Plus className="h-5 w-5" />
          Upload bilag
        </Button>
      </form>
      <Navbar />
    </div>
  );
}
