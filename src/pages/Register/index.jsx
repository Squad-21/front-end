import { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import FormItem from "./FormItem";
import { Links } from "../../constants/links";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../constants/yupSchemas";
import axios from 'axios';
import { API } from '../../constants/api';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = async(data, e) => {
    setIsLoading(true);

    axios.post(`${API.base_link}/auth/register`, data).then(response => {
      console.log(response);
      setErrorMessage(null);
      setIsLoading(false)
    }).catch(e => {
      console.log(e);
      setErrorMessage(e.response?.data.message);
      setIsLoading(false);
    });
  }
  const onError = (errors, e) => console.log(errors, e)

  return (
    <Container>
      <Logo />
      <Title>Registrar-se</Title>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        {errorMessage && 
          <Alert severity="error">
            <AlertTitle>Erro</AlertTitle>
            {errorMessage}
          </Alert>
        }
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
        <Button 
          title={"Registrar"} 
          disabled={isLoading}
        />
      </Form>
      <Legend>
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
  max-width: 30rem;
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
