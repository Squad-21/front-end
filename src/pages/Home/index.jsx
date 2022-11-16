import Button from "../../components/Button";
import { HomeCard } from "./Card";
import devImg from "../../images/dev.png";
import uxImg from "../../images/ux.png";
import bgImg from "../../images/orange2.png";
import { useNavigate } from "react-router-dom";
import { Links } from "../../constants/links";
import { FaInstagram, FaLinkedinIn, FaDiscord } from "react-icons/fa";
import useAuthStore from "../../context/authStore";
import { useEffect } from "react";

export const HomePage = () => {
  const { user } = useAuthStore((state) => ({ user: state.user }));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      window.location.href = Links.path.courses
    }
  }, []);

  return (
    <div
      id="container"
      className="px-6 max-w-[840px] mx-auto text-center sm:text-left"
    >
      <h1 className="text-violet-550 font-bold text-4xl mt-6">
        Quer impulsionar sua carreira em Tecnologia?
      </h1>
      <div className="sm:flex items-center gap-10 ">
        <p className="text-violet-550 font-bold mt-4 sm:w-[620px]">
          Explore conhecimentos que estão transformando indústrias, negócios e
          vidas através de trilhas gratuitas em Desenvolvimento, UX/UI Design e
          QA!
        </p>

        <div className="mb-7 sm:w-80 w-60 mt-12 sm:mt-0 mx-auto">
          <Button
            title="Inscreva-se"
            onClick={() => navigate(Links.register)}
          />
        </div>
      </div>

      <div
        className="flex flex-wrap gap-3 justify-center md:justify-start md:gap-16 mt-8"
        style={{
          background: `url(${bgImg}) 80% 60%  no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <div className="w-80">
          <HomeCard
            imgPath={devImg}
            title="Desenvolvimento Full Stack"
            right={true}
          >
            Essa trilha foi montada pensando em quem está começando na área, ou
            passando por uma migração de carreira e ainda não sabe exatamente o
            que é esse mundo.
          </HomeCard>
        </div>
        <div className="w-80">
          <HomeCard imgPath={uxImg} title="UX/UI Designer">
            Essa trilha foi montada pensando em quem está começando na área, ou
            passando por uma migração de carreira e ainda não sabe exatamente o
            que é esse mundo.
          </HomeCard>
        </div>
      </div>

      <footer className="text-violet-550 text-2xl md:text-3xl flex gap-2 items-center justify-center my-5">
        <FaInstagram />
        <FaDiscord />
        <FaLinkedinIn />
      </footer>
    </div>
  );
};
