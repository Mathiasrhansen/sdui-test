import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Search, ArrowLeft, ArrowRight, Plus } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { LogCard } from "@/components/Card";

export default function Logbog() {
  return (
    <div className="">
      <Header></Header>
      <div className="px-4 flex flex-col gap-3.5">
        <InputGroup className="rounded-xl bg-grey-50">
          <InputGroupInput placeholder="Søg flyvning..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <h2 className="font-heading text-lg text-grey-600">16/09-2026</h2>
        <LogCard
          flightName="ASK-21"
          flightType="XKI"
          flightTime="00:13"
          startLocation="EKGL"
          instructorInitials="KKP"
          startType="Flyslæb"
        />
        <h2 className="font-heading text-lg text-grey-600">26/08-2026</h2>
        <LogCard
          flightName="ASK-21"
          flightType="XVC"
          flightTime="00:14"
          startLocation="EKGL"
          instructorInitials="KKP"
          startType="Flyslæb"
        />
        <LogCard
          flightName="ASK-21"
          flightType="XVC"
          flightTime="01:19"
          startLocation="EKGL"
          instructorInitials="KKP"
          startType="Flyslæb"
        />
        <h2 className="font-heading text-lg text-grey-600">19/08-2026</h2>
        <LogCard
          flightName="ASK-21"
          flightType="XKI"
          flightTime="00:14"
          startLocation="EKGL"
          instructorInitials="KKP"
          startType="Flyslæb"
        />
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
