import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import {
  Info,
  ShiftItem,
  Shiftlist,
  ViewTemplate,
} from "@/components/Dagsrapporter";
import { Remarks } from "@/components/Logbog";

export default function View() {
  return (
    <div>
      <Header />
      <ViewTemplate>
        <Info
          location="Gørløse (EKGL)"
          responsiblePilot="Glenn Bille Carstensen"
          deregister="16:00"
        ></Info>
        <Remarks
          className="mb-0"
          title="Bemærkninger"
          remark="Flyvning aflyst pga dårlige vejrforhold. Stort fremmøde."
        ></Remarks>
        <Shiftlist>
          <ShiftItem
            title="Instruktør"
            pilot="Glenn Bille Carstensen"
          ></ShiftItem>
          <ShiftItem title="Instruktør" pilot="Leo Feldborg"></ShiftItem>
          <ShiftItem title="Spil formiddag" pilot="Kenneth Dahl"></ShiftItem>
          <ShiftItem
            title="Spil eftermiddag"
            pilot="Andrea Jørgensen"
          ></ShiftItem>
          <ShiftItem
            title="Flyslæb formiddag"
            pilot="Kim Christiansen"
          ></ShiftItem>
          <ShiftItem
            title="Flyslæb eftermiddag"
            pilot="Søren Holtze"
          ></ShiftItem>
        </Shiftlist>
        <Remarks title="Udmærkelser"></Remarks>
      </ViewTemplate>
      <Navbar />
    </div>
  );
}
