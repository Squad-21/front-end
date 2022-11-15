import { slide as Menu } from "react-burger-menu";
import { BsHouse } from "react-icons/bs";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import { MdModeComment } from "react-icons/md";
import { AiFillQuestionCircle } from "react-icons/ai";
import { MdOutlineLightbulb } from "react-icons/md";
import { GiExitDoor } from "react-icons/gi";
import { FaGraduationCap } from 'react-icons/fa';
import { Links } from '../../../constants/links';
import styled from "styled-components";
import useAuthStore from "../../../context/authStore";
import { BsShieldFillExclamation } from 'react-icons/bs';
import { useLogout } from '../../../hooks/useLogout';
import { RiLoginCircleFill } from 'react-icons/ri';
import { BsFillPersonPlusFill } from 'react-icons/bs'

import "./index.css";

const NotAuth = () => {
  return (
    <Menu>
      <Link
        className="menu-item"
        href="/"
      >
        <BsHouse />
        <span>Página Inicial</span>
      </Link>
      <Link
        className="menu-item"
        href={Links.path.login}
      >
        <RiLoginCircleFill />
        <span>Entrar</span>
      </Link>
      <Link
        className="menu-item"
        href={Links.path.register}
      >
        <BsFillPersonPlusFill />
        <span>Registrar</span>
      </Link>
      <Link
        className="menu-item"
        href="https://discord.com/channels/847518545156112424"
        target='_blank'
      >
        <MdModeComment />
        <span>Comunidade</span> 
      </Link>
      <Link
        className="menu-item"
        href="#"
      >
        <AiFillQuestionCircle />
        <span>Dúvidas</span> 
      </Link>
      <hr className="divisao" />
      <Link
        className="menu-item"
        href="#"
      >
        <MdOutlineLightbulb />
        <span>Apagas as luzes</span> 
      </Link>
    </Menu>
  )
}
const Auth = () => {
  const { user } = useAuthStore((state) => ({ user: state.user }))
  const logout = useLogout();

  return (
    <Menu>
      <Link
        className="menu-item"
        href="/"
      >
        <BsHouse />
        <span>Página Inicial</span>
      </Link>
      {user?.admin && 
      <Link
        className="menu-item"
        href={Links.path.admin.root}
      >
        <BsShieldFillExclamation />
        <span>Administração</span>
      </Link>}
      <Link
        className="menu-item"
        href={Links.courses.root}
      >
        <FaGraduationCap />
        <span>Cursos</span>
      </Link>
      <Link
        className="menu-item"
        href="#"
      >
        <BsFillEmojiSunglassesFill />
        <span>Minha conta</span> 
      </Link>
      <Link
        className="menu-item"
        href="https://discord.com/channels/847518545156112424"
        target='_blank'
      >
        <MdModeComment />
        <span>Comunidade</span> 
      </Link>
      <Link
        className="menu-item"
        href="#"
      >
        <AiFillQuestionCircle />
        <span>Dúvidas</span> 
      </Link>
      <hr className="divisao" />
      <Link
        className="menu-item"
        href="#"
      >
        <MdOutlineLightbulb />
        <span>Apagas as luzes</span> 
      </Link>
      <Link
        className="menu-item"
        href="#"
        onClick={logout}
      >
        <GiExitDoor />
        <span>Sair</span> 
      </Link>
    </Menu>
  )
}
export function Sidebar() {
  const { user } = useAuthStore((state) => ({ user: state.user }))

  return (
    <>
      {user? <Auth /> : <NotAuth />}
    </>
  );
}

const Link = styled.a`
  display: flex;
  flex-direction: row;
  gap: 5px;

  & svg {
    display: inline;
  }
  & span {
    margin-left: 5px;
  }
`