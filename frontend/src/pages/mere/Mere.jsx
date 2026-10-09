import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Menu, MenuItem, LogoutMenuItem } from "@/components/Menu";

export default function Mere() {
  return (
    <div className="">
      <Header></Header>
      <Menu>
        <MenuItem text="Stamdata" to="/mere/stamdata"></MenuItem>
        <MenuItem text="Konto" to="/mere/konto"></MenuItem>
        <MenuItem text="Bilag" to="/mere/bilag"></MenuItem>
        <LogoutMenuItem></LogoutMenuItem>
      </Menu>
      <Navbar></Navbar>
    </div>
  );
}
