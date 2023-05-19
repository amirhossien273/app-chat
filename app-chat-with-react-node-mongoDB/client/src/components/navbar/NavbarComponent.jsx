import "./style.css";
import SideNavBar from "./SideNavBarComponent";
import HeaderBar from "./HeaderBarComponent";

export default function Navbar() {
  return (
    <div>
      <HeaderBar />

      <SideNavBar />
    </div>
  );
}