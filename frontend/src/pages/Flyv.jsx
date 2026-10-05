import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Menu, MenuItem } from "@/components/Menu";

export default function Flyv() {
  return (
    <div className="">
      <Header></Header>
      <h2 className="text-xl text-grey-900 ml-4 mr-4 mb-4">Klub</h2>
      <Menu>
        <MenuItem text="Dagsrapporter"></MenuItem>
        <MenuItem text="Startlister"></MenuItem>
        <MenuItem text="Booking"></MenuItem>
        <MenuItem text="Klubstatistik"></MenuItem>
      </Menu>
      <h2 className="text-xl text-grey-900 m-4">Personlig</h2>
      <Menu>
        <MenuItem text="Logbog"></MenuItem>
      </Menu>

      <Navbar></Navbar>
    </div>
  );
}
