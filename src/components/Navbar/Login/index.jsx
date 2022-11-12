import LogoImg from "../../../images/laranja_logo.png";

export function LoginNav() {
  return (
    <div className="flex items-center justify-start py-3 px-10">
      <div className="w-[150px] h-[40px] bg-white flex gap-1 items-center ">
        <img src={LogoImg} alt="logo" className="w-10" />
        <span>Logo</span>
      </div>
    </div>
  );
}
