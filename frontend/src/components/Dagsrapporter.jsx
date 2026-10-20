import { Pill } from "./Pill";

export function ViewTemplate({ children }) {
  return <div className="px-4 flex flex-col gap-3.5">{children}</div>;
}

export function Info({ location, responsiblePilot, deregister }) {
  return (
    <div className="bg-grey-50 rounded-2xl flex flex-col px-3 py-3 gap-2.5">
      <div className="flex flex-col gap-1">
        <p className="font-heading text-grey-600">Startsted</p>
        <p>{location}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-heading text-grey-600">Ansvarshavende</p>
        <p>{responsiblePilot}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-heading text-grey-600">Områder afmeldt</p>
        <Pill variant="subtle" color="blue" className="text-sm w-fit">
          Afmeldt kl {deregister}
        </Pill>
      </div>
    </div>
  );
}

export function Shiftlist({ children }) {
  return (
    <div className="bg-grey-50 rounded-2xl flex flex-col px-3 py-3 gap-2.5">
      {children}
    </div>
  );
}

export function ShiftItem({ title, pilot }) {
  return (
    <div className="flex flex-row justify-between">
      <p className="font-heading text-grey-600">{title}</p>
      <p>{pilot}</p>
    </div>
  );
}
