import { Line, Circle } from "rc-progress";
import { SlArrowRight } from "react-icons/sl";

export function CourseDashboard() {
  const handleMoveToModule = () => {
    console.log("move to");
  };

  return (
    <div className="flex items-center justify-items-center flex-col p-6">
      <h1 className="font-bold text-4xl text-left">
        Desenvolvimento Full Stack
      </h1>

      <p className="mt-8 text-x text-gray-400 text-left self-start">
        26h15min . 12 Cursos
      </p>

      <p className="mt-2 text-x text-gray-400 text-left self-start">
        Progresso do curso: 50%
      </p>

      <Line
        className="max-w-xs"
        percent={50}
        strokeWidth={4}
        strokeLinecap="square"
        strokeColor="#ADADAD"
      />

      <input
        type="button"
        className="text-lg font-bold text-white bg-orange-650 w-full rounded 
                     py-3 px-16 mt-4 cursor-pointer"
        value="Entrar"
      />

      <button
        onClick={handleMoveToModule}
        className="flex items-center justify-between border-2 mt-8 w-full rounded-md border-gray-500 p-4"
      >
        <p className="ml-4 text-left break-all text-md text-gray-700 font-bold">
          Módulo 1 - Introdução
        </p>

        <SlArrowRight size={30} color="#65686D" />
      </button>

      <button
        onClick={handleMoveToModule}
        className="flex items-center justify-between border-2 mt-8 w-full rounded-md border-gray-500 p-4"
      >
        <p className="ml-4 text-left break-all text-md text-gray-700 font-bold">
          Módulo 2 - Básico HTML
        </p>

        <SlArrowRight size={30} color="#65686D" />
      </button>
    </div>
  );
}
