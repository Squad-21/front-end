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

export const moduleSchema = yup.object({
    title: yup.string().required("Digite um título"),
    description: yup.string().required("Digite uma descrição")
}).required();

export const lessonSchema = yup.object({
    title: yup.string().required("Digite um título"),
    content: yup.string().required("Forneça o conteúdo da aula"),
    author: yup.string().required("Informe o autor da aula"),
    module: yup.string().test("required", "Escolha um módulo", (module) => {
        if(!module || module == 0) return false
        return true;
    }),
    type: yup.string().test("required", "Escolha o tipo de conteúdo", (type) => {
        if(!type || type == 0) return false
        return true;
    }),
    duration: yup.string().test("required", "Informe uma duração válida", (duration) => {
        const pattern = /[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/;
        if(!duration || !duration.match(pattern)) return false
        return true;
    }),
}).required();