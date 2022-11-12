import styled from "styled-components";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import FormItem from "./FormItem";
import { Links } from "../../constants/links";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../constants/yupSchemas";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Container>
      <Logo />
      <Title>Registrar-se</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormItem
          title={"Nome"}
          name={"name"}
          placeholder={"Augusto dos Anjos"}
          errorMessage={errors.name?.message}
          registerForm={register("name")}
        />
        <FormItem
          title={"Email"}
          name={"email"}
          placeholder={"exemplo@gmail.com"}
          errorMessage={errors.email?.message}
          registerForm={register("email")}
        />
        <FormItem
          title={"Senha"}
          name={"password"}
          type={"password"}
          placeholder={"**********"}
          errorMessage={errors.password?.message}
          registerForm={register("password")}
        />
        <div className="mt-4"></div>
        <Button title={"Registrar"} onClick={() => console.log("Click")} />
      </Form>
      <Legend className="text-xs font-normal mt-7">
        Já tem conta?
        <LinkElement href={Links.login}>Faça login</LinkElement>
      </Legend>
    </Container>
  );
};

export default RegisterPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2.5rem;
  max-width: 20rem;
  margin-left: auto;
  margin-right: auto;
`;
const Title = styled.h2`
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin-top: 2rem;
  font-weight: 700;
`;
const Form = styled.form`
  width: 100%;
  margin-top: 2.75rem;
`;
const Legend = styled.p`
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1rem;
  margin-top: 1.75rem;
`;
const LinkElement = styled.a`
  text-decoration-line: underline;
  font-weight: 800;
  padding-left: 0.3rem;
`;
