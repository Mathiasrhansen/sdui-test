export function KontoList({ children }) {
  return <div className="px-4 flex flex-col gap-3.5">{children}</div>;
}

export function KontoSaldo({ saldo }) {
  return (
    <div className="bg-grey-50 flex flex-col rounded-2xl py-3 px-3 w-full gap-0.5">
      <h2 className="font-heading text-grey-600">Saldo</h2>
      <p className="text-grey-900 text-2xl">{saldo} kr</p>
    </div>
  );
}

export function KontoNextPayment({ ammount, date }) {
  return (
    <div className="bg-grey-50 flex flex-col rounded-2xl w-full py-3 px-3 gap-0.5">
      <h2 className="font-heading text-grey-600">Næste opkrævning</h2>
      <div className="flex flex-row justify-between">
        <p className="text-grey-900 text-2xl">{ammount} kr</p>
        <p className="text-grey-900 text-2xl"> · </p>
        <p className="text-grey-900 text-2xl">{date}</p>
      </div>
    </div>
  );
}

export function KontoEarlierPayments({ children }) {
  return (
    <div className="bg-grey-50 flex flex-col rounded-2xl px-3 py-5 gap-2">
      <h2 className="text-grey-900 text-xl font-heading">
        Tidligere opkrævninger
      </h2>
      {children}
    </div>
  );
}

export function PaymentItem({ title, ammount }) {
  return (
    <div className="flex flex-row justify-between border-b py-2">
      <p>{title}</p>
      <p>{ammount} kr</p>
    </div>
  );
}
