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

export const loginSchema = yup
    .object({
    email: yup
        .string()
        .email("Digite um email válido")
        .required("Email obrigatório"),
    password: yup.string().required("Digite sua senha"),
    })
    .required();

export const courseSchema = yup.object({
        title: yup.string().required("Digite um título"),
        description: yup.string().required("Digite uma descrição"),
        image: yup.mixed().test("required", "Forneça uma imagem válida", (image) => {
            if(image.length && image[0].type.indexOf('image') == -1) return false;
            return true;
        })
}).required();