import { cn } from "@/lib/utils";

export function ViewTemplate({ children }) {
  return <div className="px-4 flex flex-col gap-3.5">{children}</div>;
}

export function Logdata({
  date,
  pilot,
  pilotInitials,
  pilotNumber,
  instructor,
  instructorInitials,
  instructorNumber,
}) {
  return (
    <div className="bg-grey-50 rounded-2xl py-3 px-3 flex flex-col gap-2.5">
      <div>
        <p className="font-heading text-grey-600">Dato</p>
        <p>{date}</p>
      </div>
      <div>
        <p className="font-heading text-grey-600">Pilot</p>
        <p>
          {pilotInitials} · {pilot} ({pilotNumber})
        </p>
      </div>
      <div>
        <p className="font-heading text-grey-600">Instruktør</p>
        <p>
          {instructorInitials} · {instructor} ({instructorNumber})
        </p>
      </div>
    </div>
  );
}

export function FlightData({
  planeType,
  planeName,
  towType,
  towName,
  tacho,
  departure,
  arrival,
  price,
}) {
  return (
    <div className="bg-grey-50 rounded-2xl py-3 px-3 flex flex-col gap-2.5">
      <div>
        <p className="font-heading text-grey-600">Fly</p>
        <p>
          {planeType} · {planeName}
        </p>
      </div>
      <div>
        <p className="font-heading text-grey-600">Slæbefly</p>
        <p>
          {towType} · {towName}
        </p>
      </div>
      <div>
        <p className="font-heading text-grey-600">Tacho Flyslæb</p>
        <p>{tacho}</p>
      </div>
      <div>
        <p className="font-heading text-grey-600">Take-off</p>
        <p>{departure}</p>
      </div>
      <div>
        <p className="font-heading text-grey-600">Landing</p>
        <p>{arrival}</p>
      </div>
      <div>
        <p className="font-heading text-grey-600">Pris</p>
        <p>{price} kr</p>
      </div>
    </div>
  );
}

export function Remarks({ remark, className, title }) {
  return (
    <div
      className={cn(
        "bg-grey-50 rounded-2xl py-3 px-3 flex flex-col gap-2.5 mb-4",
        className,
      )}
    >
      <p className="font-heading text-grey-600">{title}</p>
      <p>{remark || "Ingen poster"}</p>
    </div>
  );
}
