import { slide as Menu } from "react-burger-menu";
import { BsHouse } from "react-icons/bs";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import { MdModeComment } from "react-icons/md";
import { AiFillQuestionCircle } from "react-icons/ai";
import { MdOutlineLightbulb } from "react-icons/md";
import { GiExitDoor } from "react-icons/gi";

import "./index.css";

export function Sidebar() {
  return (
    <Menu>
      <a
        className="menu-item"
        style={{ display: "flex", gap: "5px", alignItems: "center" }}
        href="/"
      >
        <BsHouse />
        <span>Página Inicial</span>
      </a>
      <a
        className="menu-item"
        style={{ display: "flex", gap: "5px", alignItems: "center" }}
        href="/"
      >
        <BsFillEmojiSunglassesFill />
        Minha conta
      </a>
      <a
        className="menu-item"
        style={{ display: "flex", gap: "5px", alignItems: "center" }}
        href="/"
      >
        <MdModeComment />
        Comunidade
      </a>
      <a
        className="menu-item"
        style={{ display: "flex", gap: "5px", alignItems: "center" }}
        href="/"
      >
        <AiFillQuestionCircle />
        Dúvidas
      </a>
      <hr className="divisao" />
      <a
        className="menu-item"
        style={{ display: "flex", gap: "5px", alignItems: "center" }}
        href="/"
      >
        <MdOutlineLightbulb />
        Apagar as luzes
      </a>
      <a
        className="menu-item"
        style={{ display: "flex", gap: "5px", alignItems: "center" }}
        href="/"
      >
        <GiExitDoor />
        Sair
      </a>
    </Menu>
  );
}
