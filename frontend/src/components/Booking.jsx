import { Pill } from "@/components/pill";

//Skelettet
export function BookingList({ children }) {
  return <div className="px-4 flex flex-col gap-3.5">{children}</div>;
}

//Infomation om booking
export function BookingInfo({ date, time, availableAmmount, totalAmmount }) {
  return (
    <div className="bg-grey-50 p-4 rounded-xl flex flex-col w-full gap-2.5">
      <div className="flex flex-row justify-between">
        <p className="text-grey-600">Dato</p>
        <p className="text-grey-900">{date}</p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-grey-600">Tid</p>
        <p className="text-grey-900">{time}</p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-grey-600">Pladser</p>
        <Pill
          variant="subtle"
          color={availableAmmount ? "green" : "grey"}
          className="px-3 text-sm"
        >
          {availableAmmount} ud af {totalAmmount} ledige
        </Pill>
      </div>
    </div>
  );
}

//Beskrivelse af booking
export function BookingDescription({ description }) {
  return (
    <div className="bg-grey-50 p-4 rounded-xl flex flex-col w-full gap-2.5">
      <p className="text-grey-600">Beskrivelse</p>
      <p className="text-grey-900">{description}</p>
    </div>
  );
}

//Tilmeldte til booking
export function BookingParticipants({ participants }) {
  return (
    <div className="bg-grey-50 p-4 rounded-xl flex flex-col w-full gap-2.5">
      <p className="text-grey-600">Tilmeldte</p>
      {participants.map((participant, index) => (
        <div className="border-b border-grey-600 pb-2" key={index}>
          <p className="text-grey-900">{participant.name}</p>
          <p>{participant.description}</p>
        </div>
      ))}
    </div>
  );
}

//Venteliste til booking
export function BookingWaitlist({ waitlist }) {
  return (
    <div className="bg-grey-50 p-4 rounded-xl flex flex-col w-full gap-2.5">
      <p className="text-grey-600">Venteliste</p>
      {waitlist.map((participant, index) => (
        <div className="border-b border-grey-600 pb-2" key={index}>
          <p className="text-grey-900">{participant.name}</p>
          <p>{participant.description}</p>
        </div>
      ))}
    </div>
  );
}

//Tilmeldingsknap til booking
export function BookingButton({ onClick, disabled }) {
  return (
    <div className="fixed bottom-17 left-0 right-0 w-full px-4 py-3 flex flex-col justify-center">
      <input
        type="text"
        placeholder="Tilføj kommentar til tilmelding..."
        className="b rounded-t-xl py-3 px-3 border-6 border-b-0 border-grey-50 w-full"
      />
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full rounded-b-xl py-3 text-white ${
          disabled ? "bg-grey-400" : "bg-blue-800"
        }`}
      >
        Tilmeld
      </button>
    </div>
  );
}
