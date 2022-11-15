import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import FormItem from "../../components/FormItem";
import { questionsSchema } from "../../constants/yupSchemas";

export function QuestionsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(questionsSchema),
  });

  function onSubmit(e) {
    e.preventDefault();
  }

  //{title: m.title, value: m.code, id: m._id}
  const options = [
    { title: "Desenvolvimento FullStack", value: "dev", id: "1" },
    { title: "UX/ UI Designer", value: "ux", id: "2" },
  ];

  return (
    <div id="container" className="flex justify-center h-screen">
      <div className="w-full px-5 mt-44 max-w-xl">
        <h1 className="text-xl font-bold text-center mb-16">
          Central de dúvidas
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem
            title="Curso"
            name="course"
            type="select"
            placeholder="Curso"
            selectOptions={options}
            errorMessage={errors.question?.course}
            registerForm={register("course")}
          />
          <FormItem
            title="Dúvida"
            name="question"
            type="textarea"
            errorMessage={errors.question?.message}
            registerForm={register("question")}
          />
          <div className="mt-4 w-36 mr-0 ml-auto">
            <Button
              title="enviar"
              variant="violet"
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
