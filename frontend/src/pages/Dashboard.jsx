import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Barometer from "@/components/Barometer";
import { Pill, BarometerPill } from "@/components/Pill";
import { calculateTrainingStatus } from "@/components/utils/calculateTrainingStatus";
import { CardList, IconRow, ItemRow } from "@/components/Card";
import { ClipboardCheck, Plane, ListChecks } from "lucide-react";

export default function Dashboard() {
  const starts = 38;
  const hours = 8 + 56 / 60;

  const { status, percentage } = calculateTrainingStatus(hours, starts);

  return (
    <div className="">
      <Header></Header>
      <div className="pl-4 pr-4">
        <h1 className="font-heading text-2xl">Flyvestatus i dag</h1>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div className="bg-gray-100 rounded-2xl flex flex-col gap-4 px-4 py-2">
            <h2 className="font-heading text-lg">Starter</h2>
            <p className="text-4xl">69</p>
          </div>
          <div className="bg-gray-100 rounded-2xl flex flex-col gap-4 px-4 py-2">
            <h2 className="font-heading text-lg">Flyvetid</h2>
            <p className="text-4xl">15:27</p>
          </div>
          <div className="bg-sea-100 rounded-2xl flex flex-col gap-0.5 px-4 py-4 col-span-2">
            <div className="flex flex-row justify-between">
              <h2 className="font-heading text-lg text-sea-600">
                Træningsbarometer
              </h2>
              <BarometerPill level={status}></BarometerPill>
            </div>
            <p className="text-lg text-blue-800">
              38 starter · 99 starter i alt
            </p>
            <p className="text-lg text-blue-800">
              08:56 timer · 24:05 timer i alt
            </p>
            <Barometer percentage={percentage}></Barometer>
          </div>
        </div>
      </div>
      <div className="pl-4 pr-4 mt-4">
        <h2 className="font-heading text-lg mb-2.5">I dag</h2>
        <CardList>
          <IconRow icon={ClipboardCheck}>Vagt: spil formiddag</IconRow>
          <IconRow icon={ListChecks}>1 punkt på todo-listen</IconRow>
        </CardList>
      </div>
      <div className="pl-4 pr-4 mt-4">
        <h2 className="font-heading text-lg mb-2.5">Materiel status</h2>
        <CardList>
          <ItemRow
            title="XOD · ASK-23"
            pill={{ label: "Batteri svagt", color: "yellow" }}
          />
          <ItemRow
            title="XVF · Duo Discus"
            pill={{ label: "U/S: skal repareres", color: "red" }}
          />
        </CardList>
      </div>
      <Navbar></Navbar>
    </div>
  );
}
