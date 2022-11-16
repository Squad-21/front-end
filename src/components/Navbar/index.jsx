import { Sidebar } from "./Sidebar";
import LogoImg from "../../images/laranja_logo.png";
import { useMediaQuery } from "@mui/material";
import DefaultBar from "./Default";
import Logo from "./Logo";
import { Links } from "../../constants/links";
import styled from "styled-components";
import { Style } from "../../constants/style";
import Button from '../Button';

export function Navbar() {
  const pathname = window.location.pathname;
  const isDesktopOrLaptop = useMediaQuery("(min-width:926px)");

  if(pathname == Links.home && isDesktopOrLaptop) {
    return (
      <LandingPageMenu>
        <Logo />
        <Button 
          title="Inscreva-se"
          onClick={() => window.location.href = Links.register}
        />
      </LandingPageMenu>
    )
  }
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

const LandingPageMenu = styled.div`
  background-color: ${Style.colors["violet-550"]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 5rem 0.25rem 5rem;

  & button {
    width: 10rem;
  }
`