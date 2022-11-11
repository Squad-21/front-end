import * as yup from 'yup';

export const registerSchema = 
    yup
    .object({
        name: yup
            .string()
            .required("Digite seu nome"),
        email: yup
            .string()
            .email("Digite um email válido")
            .required("Email obrigatório"),
        password: yup.string().required("Digite sua senha"),
    })
    .required();