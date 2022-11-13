import LogoImg from "../../../images/laranja_logo.png";
import Button from "../../Button";

export function HomeNav({ subscribe }) {
  return (
    <div className="flex items-center justify-between py-1 px-10">
      <div className="sm:w-[150px] sm:h-[40px] w-[120px] h-[30px] bg-white flex gap-1 items-center ">
        <img src={LogoImg} alt="logo" className="sm:w-10 w-6" />
        <span>Logo</span>
      </div>
      <div className="sm:w-36 w-32">
        <Button title="Inscreva-se" onClick={subscribe} />
      </div>
    </div>
  );
}
