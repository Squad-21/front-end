import { Sidebar } from "./Sidebar";
import LogoImg from "../../images/laranja_logo.png";
import { AuthBar } from "./Auth";
import { useMediaQuery } from "@mui/material";
import DefaultBar from "./Default";

export function Navbar() {
  const pathname = window.location.pathname;
  const isDesktopOrLaptop = useMediaQuery("(min-width:926px)");

  if (isDesktopOrLaptop) {
    return (
        <DefaultBar />
    );
  }
  return (
    <div className="bg-violet-550 h-16">
      <div>
        <Sidebar />
        <img className="w-10 ml-6 pt-2" src={LogoImg} alt="logo" />
      </div>
    </div>
  );
}
