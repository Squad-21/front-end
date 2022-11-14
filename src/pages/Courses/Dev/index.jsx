import Button from "../../../components/Button";
import SimpleAccordion from "../Accordion";
import { Breadcrumbs } from "../Breadcrumbs";
import { Progress } from "../Progress";

export function Devpage() {
  return (
    <>
      <div className="p-6 flex flex-wrap justify-center min-[928px]:gap-28 gap-6">
        <div className="max-w-xs">
          <Breadcrumbs />
          <h1 className="text-4xl font-bold mt-4">
            Desenvolvimento Full Stack
          </h1>

          <div className="flex gap-1 text-sm opacity-50 my-4 ">
            <p>26h 15min</p>
            <p>.</p>
            <p>6 módulos</p>
          </div>

          <Progress />

          <div className="w-64 mx-auto mt-6">
            <Button title="Começar agora" />
          </div>
        </div>

        <div className="md:max-w-md max-w-sm min-[928px]:mt-8">
          <SimpleAccordion />
        </div>
      </div>
    </>
  );
}
