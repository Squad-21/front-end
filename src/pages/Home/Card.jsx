export function HomeCard({ imgPath, title, children, right }) {
  return (
    <div
      id="container"
      className={`flex flex-col  ${right ? "items-end" : "items-start"}`}
    >
      <img src={imgPath} alt="card" className="w-64 h-52" />
      <div id="content" className="bg-violet-550 bg-opacity-30 mt-3">
        <div className="p-4">
          <h2 className="text-xl font-bold text-violet-550">{title}</h2>
          <p className="text-[#324174;]">{children}</p>
        </div>
      </div>
    </div>
  );
}
