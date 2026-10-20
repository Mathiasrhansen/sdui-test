import { Pill } from "@/components/Pill";

export function StamdataList({ children }) {
  return <div className="px-4 flex flex-col gap-3.5">{children}</div>;
}

export function StamdataHeader({ name, initials, pilotType, pilotNumber }) {
  return (
    <div className=" rounded-xl flex flex-col w-full gap-2.5">
      <h1 className="text-grey-900 font-heading text-2xl">{name}</h1>
      <div className="">
        <p className="text-grey-600">
          {initials} · {pilotType} · {pilotNumber}
        </p>
      </div>
    </div>
  );
}

export function StamdataContact({ email, phone, address }) {
  return (
    <div className="bg-grey-50 p-4 rounded-xl flex flex-col w-full gap-2.5">
      <h2 className="text-grey-900 font-heading text-lg">Kontaktoplysninger</h2>
      <div className="flex flex-col gap-1">
        <p className="text-grey-600">Adresse</p>
        <p>{address}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-grey-600">Email</p>
        <p className="text-grey-900">{email}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-grey-600">Telefon</p>
        <p className="text-grey-900">{phone}</p>
      </div>
    </div>
  );
}

export function StamdataPermissions({ permissions }) {
  return (
    <div className="bg-grey-50 p-4 rounded-xl flex flex-col w-full gap-2.5">
      <h2 className="text-grey-900 font-heading text-lg">Tilladelser</h2>
      <div className="flex flex-row gap-2 flex-wrap">
        {permissions.map((permission, index) => (
          <Pill
            variant="regular"
            color="green"
            className="px-3 py-0.5 text-sm"
            key={index}
          >
            {permission.name}
          </Pill>
        ))}
      </div>
    </div>
  );
}

export function StamdataSubscription({ subscriptionGroup, nextPayment }) {
  return (
    <div className="bg-grey-50 p-4 rounded-xl flex flex-col w-full gap-2.5">
      <h2 className="text-grey-900 font-heading text-lg">Kontingent</h2>
      <div className="flex flex-col gap-1">
        <p className="text-grey-600">Kontingent kategori</p>
        <p>{subscriptionGroup}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-grey-600">Næste kontingent</p>
        <p>{nextPayment}</p>
      </div>
    </div>
  );
}
