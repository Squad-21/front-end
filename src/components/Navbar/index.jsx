import { Sidebar } from "./Sidebar";
import LogoImg from "../../images/laranja_logo.png";
import styled from "styled-components";
import { LoginNav } from "./Login";
import { HomeNav } from "./Home";
import { Links } from '../../constants/links'
import { useIsDesktop } from '../../hooks/useIsDesktop'

function subscribe() {
  console.log("inscrito");
}

export function Navbar() {
  const pathname = window.location.pathname;
  const isDesktopOrLaptop = useIsDesktop()

  return (
    <div className="bg-violet-550 h-12 sm:h-16">
      {isDesktopOrLaptop && pathname === Links.home && (
        <HomeNav subscribe={subscribe} />
      )}
      {!isDesktopOrLaptop && pathname !== Links.home && (
        <div>
          <Sidebar />
          <Img src={LogoImg} alt="logo" />
        </div>
      )}
      {isDesktopOrLaptop && pathname === Links.login && <LoginNav />}
    </div>
  );
}

const Img = styled.img`
  width: 2.5rem;
  margin-left: 1.5rem;
`;
