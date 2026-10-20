import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { BookingCard } from "@/components/Card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Booking() {
  return (
    <div className="">
      <Header></Header>
      <div className="px-4 flex flex-col gap-3.5">
        <h2 className="font-heading text-lg text-grey-600">
          Lørdag 26/09-2026
        </h2>
        <BookingCard title="Elevflyvning formiddag" availableAmmount={3} />
        <BookingCard title="Elevflyvning eftermiddag" availableAmmount={0} />
        <BookingCard title="Elevflyvning ensædet" availableAmmount={1} />
        <h2 className="font-heading text-lg text-grey-600">
          Søndag 27/09-2026
        </h2>
        <BookingCard title="Elevflyvning eftermiddag" availableAmmount={0} />
        <BookingCard title="Elevflyvning ensædet" availableAmmount={0} />
        <h2 className="font-heading text-lg text-grey-600">
          Onsdag 30/09-2026
        </h2>
        <BookingCard title="Hverdagsflyvning" availableAmmount={5} />
      </div>
      <div className="fixed bottom-17 left-0 right-0 z-10 w-full px-4 py-3 flex flex-row justify-between">
        <Button
          variant="disabled"
          className="flex flex-row items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          <span className="leading-none">Forrige side</span>
        </Button>
        <Button
          variant="navigation"
          className="flex flex-row items-center justify-center gap-2"
        >
          <span className="leading-none">Næste side</span>
          <ArrowRight className="h-4 w-4 shrink-0" />
        </Button>
      </div>
      <Navbar></Navbar>
    </div>
  );
}
