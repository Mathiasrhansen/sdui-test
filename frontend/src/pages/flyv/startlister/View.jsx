import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import {
  FlightItem,
  List,
  StartInfo,
  StartItem,
  Total,
  ViewTemplate,
} from "@/components/Startliste";

export default function View() {
  return (
    <div>
      <Header />
      <ViewTemplate>
        <StartInfo
          location="Gørløse (EKGL)"
          startType="Flyslæb"
          starterAmmount="4"
          starterTime="01:10"
        ></StartInfo>
        <List title="Flyregistrering">
          <FlightItem
            name="XKI"
            type="ASK-21"
            starters="2"
            time="00:32"
          ></FlightItem>
          <FlightItem
            name="XOD"
            type="ASK-23"
            starters="2"
            time="00:38"
          ></FlightItem>
        </List>
        <List title="Startliste">
          <StartItem
            pilot="Anette Larsen"
            initials="ALA"
            name="XOD"
            starterAmmount="2"
            starterTime="00:38"
            price="350"
          ></StartItem>
          <StartItem
            pilot="Casper Gyldenpalm"
            initials="CAG"
            name="XKI"
            starterAmmount="1"
            starterTime="00:18"
            price="315"
          ></StartItem>
          <StartItem
            pilot="Poul Erik Thomsen"
            initials="POT"
            name="XKI"
            starterAmmount="1"
            starterTime="00:14"
            price="210"
          ></StartItem>
        </List>
        <Total totalStarterAmmount="4" totalPrice="875"></Total>
      </ViewTemplate>
      <Navbar />
    </div>
  );
}
