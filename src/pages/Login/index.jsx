import logoImg from "../../images/laranja_logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FcGoogle } from "react-icons/fc";
import Button from '../../components/Button';
import { useState, useEffect } from "react";
import { loginSchema } from "../../constants/yupSchemas";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Links } from '../../constants/links'
import { loginAction } from "../../service/api";
import useAuthStore from "../../context/authStore";
import useSettingsStore from "../../context/settingsStore";
import { useNavigate } from "react-router-dom";

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
    navigate(Links.courses);
  }

  useEffect(() => {
    if(token) {
      navigate(Links.courses);
    }
  },[])

  return (
    <div
      id="container"
      className="px-4 pt-10 flex flex-col items-center max-w-xs mx-auto"
    >
      <img src={logoImg} alt="logo" />
      <h2 className="font-bold mt-8 text-xl">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {errorMessage && 
          <Alert severity="error">
            <AlertTitle>Erro</AlertTitle>
            {errorMessage}
          </Alert>
        }
        <label
          htmlFor="email"
          className="block ml-2 mt-16 mb-1 font-bold text-sm"
        >
          Email
        </label>
        <input
          type="text"
          placeholder="exemplo@gmail.com"
          className={`border-[0.3px] border-[#ADADAD] ${
            errors.email && "border-red-600"
          }  bg-gray-10 rounded w-full text-sm p-3`}
          {...register("email")}
        />
        <p className="text-red-600">{errors.email?.message}</p>

        <label
          htmlFor="password"
          className="block ml-2 mt-5 mb-1 font-bold text-sm"
        >
          Senha
        </label>
        <input
          type="password"
          placeholder="**********"
          className={`border-[0.3px] border-[#ADADAD] ${
            errors.password && "border-red-600"
          }  bg-gray-10 rounded w-full text-xs p-3`}
          {...register("password")}
        />
        <p className="text-red-600">{errors.password?.message}</p>
        <p className="text-right text-xs font-extrabold mt-2 mb-2 text-gray-550">
          Esqueçeu a senha?
        </p>
        <Button
          title="Entrar"
          disabled={isLoading}
        />
      </form>
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
      <p className="text-xs font-normal mt-7">
        Não tem conta ainda?
        <a href={Links.register} className="font-extrabold underline">
          Cadastre-se
        </a>
      </p>
    </div>
  );
}
