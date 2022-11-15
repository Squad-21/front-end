import { Sidebar } from "./Sidebar";
import LogoImg from "../../images/laranja_logo.png";
import { useMediaQuery } from "@mui/material";
import DefaultBar from "./Default";
import Logo from "./Logo";

export function Navbar() {
  const pathname = window.location.pathname;
  const isDesktopOrLaptop = useMediaQuery("(min-width:926px)");

  if (isDesktopOrLaptop) {
    return (
        <DefaultBar />
    );
  }
  return (
    <div className="bg-violet-550 h-16 navbar">
      <div>
        <Sidebar />
        <Logo />
      </div>
    </div>
  );
}
