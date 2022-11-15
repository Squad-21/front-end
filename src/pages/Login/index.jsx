import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import FormItem from "../../components/FormItem";
import { Links } from "../../constants/links";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../constants/yupSchemas";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import useAuthStore from "../../context/authStore";
import useSettingsStore from "../../context/settingsStore";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../service/api";
import { FcGoogle } from "react-icons/fc";

export function LoginPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    token,
    setToken,
    setUser
  } = useAuthStore((state) => ({ 
    token: state.token, 
    setToken: state.setToken,
    setUser: state.setUser
  }));
  const { toggleNotificationVisibility } = useSettingsStore((state) => ({ toggleNotificationVisibility: state.toggleNotificationVisibility }));
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async(data, e) => {
    setIsLoading(true);

    const loginData = await loginAction(data);
    setIsLoading(false);

    if(loginData.error) {
      setErrorMessage(loginData.error);
      return 
    }

    setToken(loginData.token);
    setUser(loginData.user);
    setErrorMessage(null);
    toggleNotificationVisibility(true);
    navigate(Links.courses.root);
  }

  useEffect(() => {
    if(token) {
      navigate(Links.courses.root);
    }
  },[])

  return (
    <Container>
      <Logo />
      <Title>Login</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && 
          <Alert severity="error">
            <AlertTitle>Erro</AlertTitle>
            {errorMessage}
          </Alert>
        }
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
        <Button 
          title={"Entrar"} 
          disabled={isLoading}
        />
      </Form>
      <div id="ou" className="flex items-center mt-4">
        <hr className="border-t-[1px] w-24 border-black opacity-30" />
        <p className="mx-8">Ou</p>
        <hr className="border-t-[1px] w-24 border-black opacity-30" />
      </div>
      <button
        className="flex items-center justify-center gap-4 mt-5 py-4 rounded border-[2px] 
        border-black border-opacity-30 text-sm font-medium w-full"
      >
        <FcGoogle size={20} />
        Login com o Google
      </button>
      <Legend>
        Ainda não tem conta?
        <LinkElement href={Links.path.register}>Registre-se</LinkElement>
      </Legend>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2.5rem;
  max-width: 30rem;
  margin-left: auto;
  margin-right: auto;
`;
const Title = styled.h2`
  font-size: 1.25rem;
  line-height: 1.75rem;
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
  margin-bottom: 1.75rem;
`;
const LinkElement = styled.a`
  text-decoration-line: underline;
  font-weight: 800;
  padding-left: 0.3rem;
`;
