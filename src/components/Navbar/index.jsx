import { Sidebar } from "./Sidebar";
import LogoImg from "../../images/laranja_logo.png";
import { LoginNav } from "./Login";
import { HomeNav } from "./Home";
import { Links } from "../../constants/links";
import { AuthBar } from "./Auth";
import { useMediaQuery } from "@mui/material";

function subscribe() {
  console.log("inscrito");
}

export function Navbar() {
  const pathname = window.location.pathname;
  const isDesktopOrLaptop = useMediaQuery("(min-width:926px)");

  if (pathname === Links.home) {
    return (
      <div className="bg-violet-550 h-16">
        <HomeNav subscribe={subscribe} />
      </div>
    );
  }
  if (pathname === Links.login || pathname === Links.register) {
    return (
      <div className="bg-violet-550 h-16">
        <LoginNav />
      </div>
    );
  }
  if (isDesktopOrLaptop) {
    return (
      <div className="bg-violet-550 h-16">
        <AuthBar subscribe={subscribe} />
      </div>
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
