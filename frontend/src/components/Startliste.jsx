export function ViewTemplate({ children }) {
  return <div className="px-4 flex flex-col gap-3.5">{children}</div>;
}

export function StartInfo({
  location,
  startType,
  starterAmmount,
  starterTime,
}) {
  return (
    <div className="bg-grey-50 rounded-2xl flex flex-col gap-2.5 px-3 py-3">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-grey-600">Startsted</h2>
        <p>{location}</p>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-grey-600">Startmetode</h2>
        <p>{startType}</p>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-grey-600">Starter</h2>
        <p>
          {starterAmmount} · {starterTime} timer
        </p>
      </div>
    </div>
  );
}

export function List({ title, children }) {
  return (
    <div className="bg-grey-50 rounded-2xl flex flex-col gap-2 px-3 py-4">
      <h2 className="font-heading text-grey-600">{title}</h2>
      {children}
    </div>
  );
}

export function FlightItem({ name, type, starters, time }) {
  return (
    <div className="flex flex-row justify-between border-b py-2 px-1">
      <p>{name}</p>
      <p>{type}</p>
      <p>{starters}</p>
      <p>{time}</p>
    </div>
  );
}

export function StartItem({
  pilot,
  initials,
  name,
  starterAmmount,
  starterTime,
  price,
}) {
  return (
    <div className="flex flex-col border-b py-2 px-1">
      <div className="flex flex-row justify-between">
        <p>
          {pilot} · {initials}
        </p>
        <p>{name}</p>
      </div>
      <p className="text-grey-600">
        {starterAmmount} starter · {starterTime} flyvetid · {price} kr
      </p>
    </div>
  );
}

export function Total({ totalStarterAmmount, totalPrice }) {
  return (
    <div className="bg-grey-50 rounded-2xl flex flex-row justify-between px-3 py-3 mb-4 font-heading text-xl">
      <h2>Total:</h2>
      <p>
        {totalStarterAmmount} starter · {totalPrice} kr
      </p>
    </div>
  );
}
