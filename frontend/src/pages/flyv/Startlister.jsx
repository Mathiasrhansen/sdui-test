import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useStartLists, formatDate } from "@/lib/startlists";

export default function Startlister() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const { data, isPending, isError } = useStartLists({ page, q });

  const hasPrev = page > 1;
  const hasNext = data && page < data.pages;

  return (
    <div className="">
      <Header></Header>
      <div className="px-4 flex flex-col gap-3.5">
        <InputGroup className="rounded-xl bg-grey-50">
          <InputGroupInput
            placeholder="Søg startliste..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        {isPending && <p className="text-grey-600">Henter startlister...</p>}
        {isError && (
          <p className="text-grey-600">Kunne ikke hente startlister.</p>
        )}
        {data?.items.length === 0 && (
          <p className="text-grey-600">Ingen startlister fundet.</p>
        )}
        {data?.items.map((s) => (
          <StartCard
            key={s.id}
            date={formatDate(s.date)}
            startLocation={s.location}
            startType={s.launch_method}
            startAmmount={s.launch_count}
            onClick={() => navigate(`/flyv/startlister/view?id=${s.id}`)}
          />
        ))}
        <div className="w-full flex flex-row justify-between">
          <Button
            variant={hasPrev ? "navigation" : "disabled"}
            disabled={!hasPrev}
            onClick={() => setPage((p) => p - 1)}
            className="flex flex-row items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="leading-none">Forrige side</span>
          </Button>
          <Button
            variant={hasNext ? "navigation" : "disabled"}
            disabled={!hasNext}
            onClick={() => setPage((p) => p + 1)}
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
