import { Sidebar } from "./Sidebar";
import LogoImg from "../../images/laranja_logo.png";
import styled from "styled-components";

export function Navbar() {
  return (
    <Container>
      <Sidebar />
      <Img src={LogoImg} alt="logo" />
    </Container>
  );
}

const Container = styled.div`
  background: #5458be;
  height: 3rem;
`;

const Img = styled.img`
  width: 2.5rem;
  margin-left: 1.5rem;
`;
