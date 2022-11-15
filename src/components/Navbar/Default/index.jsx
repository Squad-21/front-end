import LogoImg from "../../../images/laranja_logo.png";
import SchoolIcon from "@mui/icons-material/School";
import ForumIcon from "@mui/icons-material/Forum";
import HelpIcon from "@mui/icons-material/Help";
import ShieldIcon from "@mui/icons-material/Shield";
import { useIsDesktop } from "../../../hooks/useIsDesktop";
import { Links } from "../../../constants/links";
import styled, { css } from "styled-components";
import { Style } from "../../../constants/style";
import Avatar from "./Avatar";
import SearchBar from "./SearchBar";
import useAuthStore from "../../../context/authStore";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Logo from "../Logo";

const DefaultBar = () => {
  const { user } = useAuthStore((state) => ({ user: state.user }));
  const isDesktopOrLaptop = useIsDesktop();

  return (
    <Container className="flex items-center justify-between px-10 navbar">
      <div id="logo-search" className="flex items-center gap-3">
        <Logo />
        {user && <SearchBar />}
      </div>

      <div id="nav-menu" className="flex items-center">
        {user?.admin && (
          <a
            href={`${Links.admin.root}/${Links.admin.courses}`}
            className="text-white mr-6 hover:text-orange-650"
          >
            <ShieldIcon sx={{ marginRight: "5px" }} />
            Administração
          </a>
        )}
        {user && (
          <a
            href={Links.courses.root}
            className="text-white mr-6 hover:text-orange-650"
          >
            <SchoolIcon sx={{ marginRight: "5px" }} />
            Cursos
          </a>
        )}
        {!user && (
          <a
            href={Links.path.login}
            className="text-white mr-6 hover:text-orange-650"
          >
            <LoginIcon sx={{ marginRight: "5px" }} />
            Entrar
          </a>
        )}
        {!user && (
          <a
            href={Links.path.register}
            className="text-white mr-6 hover:text-orange-650"
          >
            <HowToRegIcon sx={{ marginRight: "5px" }} />
            Registrar
          </a>
        )}
        <a
          href={Links.discord}
          className="text-white mr-6 hover:text-orange-650"
          target="_blank"
        >
          <ForumIcon sx={{ marginRight: "5px" }} />
          Comunidade
        </a>
        {user && <a
          href={Links.questions}
          className="text-white mr-6 hover:text-orange-650"
        >
          <HelpIcon sx={{ marginRight: "5px" }} />
          Dúvidas
        </a>}
        {user && <Avatar />}
      </div>
    </Container>
  );
};

export default DefaultBar;

const Container = styled.div`
  background-color: ${Style.colors["violet-550"]};

  & a {
    transition: 0.3s;
  }
`;
