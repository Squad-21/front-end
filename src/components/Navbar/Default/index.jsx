import LogoImg from "../../../images/laranja_logo.png";
import SchoolIcon from "@mui/icons-material/School";
import ForumIcon from "@mui/icons-material/Forum";
import HelpIcon from "@mui/icons-material/Help";
import ShieldIcon from '@mui/icons-material/Shield';
import { useIsDesktop } from "../../../hooks/useIsDesktop";
import { Links } from "../../../constants/links";
import styled, { css } from "styled-components";
import { Style } from '../../../constants/style';
import Avatar from "./Avatar";
import SearchBar from './SearchBar';
import useAuthStore from "../../../context/authStore";

const DefaultBar = () => {
  const { user } = useAuthStore((state) => ({ user: state.user }))
  const isDesktopOrLaptop = useIsDesktop();

  return (
    <Container className="flex items-center justify-between px-10">
      <div id="logo-search" className="flex items-center gap-3">
        <div className="w-[150px] h-[40px] bg-white flex gap-1 items-center ">
          <img src={LogoImg} alt="logo" className="w-10" />
          <span>Logo</span>
        </div>
        <SearchBar />
      </div>

      <div id="nav-menu" className="flex items-center">
        {user?.admin && <a href={`${Links.admin.root}/${Links.admin.courses}`} className="text-white mr-6 hover:text-orange-650">
          <ShieldIcon sx={{ marginRight: "5px" }} />
          Administração
        </a>}
        <a href={Links.courses.root} className="text-white mr-6 hover:text-orange-650">
          <SchoolIcon sx={{ marginRight: "5px" }} />
          Cursos
        </a>
        <a 
          href={Links.discord} 
          className="text-white mr-6 hover:text-orange-650"
          target='_blank'
        >
          <ForumIcon sx={{ marginRight: "5px" }} />
          Comunidade
        </a>
        <a href="#" className="text-white mr-6 hover:text-orange-650">
          <HelpIcon sx={{ marginRight: "5px" }} />
          Dúvidas
        </a>
        <Avatar />
      </div>
    </Container>
  );
}

export default DefaultBar;

const Container = styled.div`
    background-color: ${Style.colors["violet-550"]};
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    & a {
      transition: .3s;
    }
`