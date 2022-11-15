import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import FormItem from "../../components/FormItem";
import { profileSchema } from "../../constants/yupSchemas";

function onSubmit(e) {
  e.preventDefault();
}

export function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  return (
    <div id="container" className="flex justify-center h-screen">
      <div className="w-full px-5  max-w-xl mt-7">
        <h1 className="text-xl font-bold text-center mb-16">Meu perfil</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem
            title="Nome"
            name="name"
            type="text"
            placeholder="Nome"
            errorMessage={errors.question?.name}
            registerForm={register("name")}
          />
          <FormItem
            title="Email"
            name="email"
            type="text"
            placeholder="Email"
            errorMessage={errors.email?.message}
            registerForm={register("email")}
          />
          <FormItem
            title="Senha"
            name="password"
            type="password"
            errorMessage={errors.password?.message}
            registerForm={register("password")}
          />
          <FormItem
            title="Foto"
            name="photo"
            type="file"
            errorMessage={errors.photo?.message}
            registerForm={register("photo")}
          />
          <div className="mt-4 w-36 mr-0 ml-auto">
            <Button
              title="Enviar"
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
