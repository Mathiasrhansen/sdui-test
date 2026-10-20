import Header from "@/components/Header";
import {
  FlightData,
  Logdata,
  Remarks,
  ViewTemplate,
} from "@/components/Logbog";
import Navbar from "@/components/Navbar";

export default function View() {
  return (
    <div>
      <Header />
      <ViewTemplate>
        <Logdata
          date="16/09-2026"
          pilotInitials="MRH"
          pilot="Mathias Rønne-Hansen"
          pilotNumber="942"
          instructorInitials="KKP"
          instructor="Kristian Klok Pedersen"
          instructorNumber="481"
        ></Logdata>
        <FlightData
          planeType="ASK-21"
          planeName="XKI"
          towType="Pawnee"
          towName="CYP"
          tacho="11"
          departure="19:09"
          arrival="19:22"
          price="192,50"
        ></FlightData>
        <Remarks></Remarks>
      </ViewTemplate>
      <Navbar />
    </div>
  );
}
