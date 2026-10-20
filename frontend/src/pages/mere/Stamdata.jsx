import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import {
  StamdataList,
  StamdataHeader,
  StamdataContact,
  StamdataPermissions,
  StamdataSubscription,
} from "@/components/Stamdata";

export default function Stamdata() {
  return (
    <div className="">
      <Header></Header>
      <StamdataList>
        <StamdataHeader
          name="Mathias Rønne-Hansen"
          initials="MRH"
          pilotType="A-elev"
          pilotNumber="942"
        />
        <StamdataContact
          address="Refshalevej 160, 1432 København"
          email="mathias.mail@example.com"
          phone="+4520304050"
        />
        <StamdataPermissions
          permissions={[{ name: "Spilstart" }, { name: "Flyslæb" }]}
        />
        <StamdataSubscription
          subscriptionGroup="Gruppe A"
          nextPayment="01/12-2026"
        ></StamdataSubscription>
      </StamdataList>
      <Navbar></Navbar>
    </div>
  );
}
