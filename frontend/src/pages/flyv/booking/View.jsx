import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import {
  BookingList,
  BookingInfo,
  BookingDescription,
  BookingParticipants,
  BookingButton,
} from "@/components/Booking";

export default function View() {
  const participants = [
    {
      name: "Glenn Bille Carstensen",
      description: "Jeg kommer først kl 15:20",
    },
    {
      name: "Mathias Bille Carstensen",
      description: "A-elev, ASK-21",
    },
  ];
  return (
    <div>
      <Header />
      <BookingList>
        <BookingInfo
          date="26/09-2026"
          time="Formiddag"
          availableAmmount={1}
          totalAmmount={3}
        />
        <BookingDescription description="Elevflyvning 9-14" />
        <BookingParticipants participants={participants} />
        <BookingButton></BookingButton>
      </BookingList>
      <Navbar />
    </div>
  );
}
