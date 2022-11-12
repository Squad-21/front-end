import { Sidebar } from "./Sidebar";
import LogoImg from "../../images/laranja_logo.png";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { LoginNav } from "./Login";
import { HomeNav } from "./Home";

function subscribe() {
  console.log("inscrito");
}

export function Navbar() {
  const pathname = window.location.pathname;
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 640px)",
  });

  return (
    <div className="bg-violet-550 h-12 sm:h-16">
      {isDesktopOrLaptop && pathname === "/" && (
        <HomeNav subscribe={subscribe} />
      )}
      {!isDesktopOrLaptop && pathname !== "/" && (
        <div>
          <Sidebar />
          <Img src={LogoImg} alt="logo" />
        </div>
      )}
      {isDesktopOrLaptop && pathname === "/login" && <LoginNav />}
    </div>
  );
}

const Img = styled.img`
  width: 2.5rem;
  margin-left: 1.5rem;
`;
