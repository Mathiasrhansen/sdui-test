import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { StartCard } from "@/components/Card";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

export default function Startlister() {
  return (
    <div className="">
      <Header></Header>
      <div className="px-4 flex flex-col gap-3.5">
        <InputGroup className="rounded-xl bg-grey-50">
          <InputGroupInput placeholder="Søg startliste..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <StartCard
          date="20/09-2026"
          startLocation="EKGL"
          startType="Flyslæb"
          startAmmount={4}
        />
        <StartCard
          date="16/09-2026"
          startLocation="EGKL"
          startType="Flyslæb"
          startAmmount={5}
        />
        <div className="w-full flex flex-row justify-between">
          <Button
            variant="disabled"
            className="flex flex-row items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="leading-none">Forrige side</span>
          </Button>
          <Button
            variant="navigation"
            className="text-white flex flex-row items-center justify-center gap-2"
          >
            <span className="leading-none">Næste side</span>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Button>
        </div>
        <div className="fixed bottom-20 left-0 right-0 w-full px-4 py-3 flex flex-row justify-center">
          <Button className="w-full">Startlist.Club update</Button>
        </div>
      </div>
      <Navbar></Navbar>
    </div>
  );
}
