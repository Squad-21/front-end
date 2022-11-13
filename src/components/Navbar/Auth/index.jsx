import LogoImg from "../../../images/laranja_logo.png";
import { SearchBar } from "./SearchBar";
import SchoolIcon from "@mui/icons-material/School";
import ForumIcon from "@mui/icons-material/Forum";
import HelpIcon from "@mui/icons-material/Help";
import { AvatarPopper } from "./AvatarPopper";
import { useIsDesktop } from "../../../hooks/useIsDesktop";

export function AuthBar() {
  const isDesktopOrLaptop = useIsDesktop();

  return (
    <div className="flex items-center justify-between py-3 px-10">
      <div id="logo-search" className="flex items-center gap-3">
        <div className="w-[150px] h-[40px] bg-white flex gap-1 items-center ">
          <img src={LogoImg} alt="logo" className="w-10" />
          <span>Logo</span>
        </div>
        <SearchBar />
      </div>

      <div id="nav-menu" className="flex items-center">
        <a href="/cursos" className="text-white mr-6 hover:text-orange-650">
          <SchoolIcon sx={{ marginRight: "5px" }} />
          Cursos
        </a>
        <a href="/cursos" className="text-white mr-6 hover:text-orange-650">
          <ForumIcon sx={{ marginRight: "5px" }} />
          Comunidade
        </a>
        <a href="/cursos" className="text-white mr-6 hover:text-orange-650">
          <HelpIcon sx={{ marginRight: "5px" }} />
          Dúvidas
        </a>
        <AvatarPopper />
      </div>
    </div>
  );
}
