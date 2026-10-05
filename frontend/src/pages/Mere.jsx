import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import LogoutButton from "@/components/LogoutButton";
import { Menu, MenuItem, LogoutMenuItem } from "@/components/Menu";

export default function Mere() {
  return (
    <div className="">
      <Header></Header>
      {/* <LogoutButton></LogoutButton> */}
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
