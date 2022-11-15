import Button from "../../components/Button";
import { HomeCard } from "./Card";
import devImg from "../../images/dev.png";
import uxImg from "../../images/ux.png";
import bgImg from "../../images/orange2.png";
import { useNavigate } from "react-router-dom";
import { Links } from '../../constants/links';
import { FaInstagram, FaLinkedinIn, FaDiscord } from "react-icons/fa";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div id="container" className="px-6 max-w-[840px] mx-auto">
      <h1 className="text-violet-550 font-bold text-4xl mt-6">
        Quer impulsionar sua carreira em Tecnologia?
      </h1>
      <p className="text-violet-550 font-bold mt-4">
        Explore conhecimentos que estão transformando indústrias, negócios e
        vidas através de trilhas gratuitas em Desenvolvimento, UX/UI Design e
        QA!
      </p>

      <div className="mt-12 w-60 mx-auto">
        <Button 
          title="Inscreva-se"
          onClick={() => navigate(Links.register)}
        />
      </div>

      <div
        className="flex flex-wrap gap-3 justify-center md:justify-between"
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
}
