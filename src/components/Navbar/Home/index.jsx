import LogoImg from "../../../images/laranja_logo.png";
import Button from "../../Button";

export function HomeNav({ subscribe }) {
  return (
    <div className="flex items-center justify-between py-1 px-10">
      <div className="w-[150px] h-[40px] bg-white flex gap-1 items-center ">
        <img src={LogoImg} alt="logo" className="w-10" />
        <span>Logo</span>
      </div>
      <div className="w-36">
        <Button title="Inscreva-se" onClick={subscribe} />
      </div>
    </div>
  );
}
