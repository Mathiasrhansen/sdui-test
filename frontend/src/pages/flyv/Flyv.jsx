import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Menu, MenuItem } from "@/components/Menu";

export default function Flyv() {
  return (
    <div className="">
      <Header></Header>
      <h2 className="text-xl text-grey-900 ml-4 mr-4 mb-4">Klub</h2>
      <Menu>
        <MenuItem text="Dagsrapporter" to="/flyv/dagsrapporter"></MenuItem>
        <MenuItem text="Startlister" to="/flyv/startlister"></MenuItem>
        <MenuItem text="Booking" to="/flyv/booking"></MenuItem>
        <MenuItem text="Klubstatistik" to="/flyv/klubstatistik"></MenuItem>
      </Menu>
      <h2 className="text-xl text-grey-900 m-4">Personlig</h2>
      <Menu>
        <MenuItem text="Logbog" to="/flyv/logbog"></MenuItem>
      </Menu>
      <Navbar></Navbar>
    </div>
  );
}
