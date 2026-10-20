import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { RapportCard } from "@/components/Card";
import { Search, ArrowLeft, ArrowRight, Plus } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

export default function Dagsrapporter() {
  return (
    <div className="">
      <Header></Header>
      <div className="px-4 flex flex-col gap-3.5">
        <InputGroup className="rounded-xl bg-grey-50">
          <InputGroupInput placeholder="Søg dagsrapport..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <RapportCard
          date="20/09-2026"
          instructor="Glenn Bille Carstensen"
          endTime="14:30"
        />
        <RapportCard date="20/09-2026" instructor="Glenn Bille Carstensen" />
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
            className="flex flex-row items-center justify-center gap-2"
          >
            <span className="leading-none">Næste side</span>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Button>
        </div>
      </div>
      <div className="fixed bottom-20 left-0 right-0 w-full px-4 py-3 flex flex-row justify-center">
        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Tilføj ny dagsrapport
        </Button>
      </div>
      <Navbar></Navbar>
    </div>
  );
}
