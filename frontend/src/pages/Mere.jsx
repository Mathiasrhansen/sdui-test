import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Menu, MenuItem, LogoutMenuItem } from "@/components/Menu";

export default function Mere() {
  return (
    <div className="">
      <Header></Header>
      <Menu>
        <MenuItem text="Stamdata"></MenuItem>
        <MenuItem text="Konto"></MenuItem>
        <MenuItem text="Bilag"></MenuItem>
        <LogoutMenuItem></LogoutMenuItem>
      </Menu>
      <Navbar></Navbar>
    </div>
  );
}
