import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { lessonSchema, userSchema } from '../../../constants/yupSchemas';
import FormItem from "../../../components/FormItem";
import { Alert, AlertTitle } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { editLessonAction, getOneCourseAction } from "../../../service/api";
import { API } from "../../../constants/api";
import { Links } from "../../../constants/links";
import useAuthStore from "../../../context/authStore";
import LoadingPage from '../../Loading';

const options = [
    {
        title: 'Administrador', 
        value: true, 
        id: 'Administrador'
    },
    {
        title: 'Comum', 
        value: false, 
        id: 'Comum'
    },
]
const EditUserPage = () => {
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuthStore((state) => ({ token: state.token }));
    const navigate = useNavigate();
    const { userID } = useParams();
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userSchema),
    });
    const onSubmit = async(data, e) => {
       console.log(data)
    }

    const fetchData = async() => {

    }


    const setValues = () => {
  
    }

    useEffect(() => {
        fetchData()
        .then(res => {
            setIsLoading(false);
        })
        .catch(e => setErrorMessage('Erro ao obter dados'))
    },[])

    useEffect(() => {
        if(!userData) return

        setValues()
    },[userData])

    if(isLoading) {
        return <LoadingPage />
    }

    return ( 
        <Container>
            <Title>Editar Usuário</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {errorMessage && 
                    <Alert severity="error">
                        <AlertTitle>Erro</AlertTitle>
                        {errorMessage}
                    </Alert>
                }
                <FormItem
                    title="Nome"
                    name="Name"
                    errorMessage={errors.name?.message}
                    registerForm={register("name")}
                />
                <FormItem
                    title="Email"
                    name="email"
                    errorMessage={errors.email?.message}
                    registerForm={register("email")}
                />
                <FormItem
                    title="Nível"
                    name="admin"
                    type="select"
                    placeholder="Escolha o nível de permissão"
                    selectOptions={options}
                    errorMessage={errors.admin?.message}
                    registerForm={register("admin")}
                />
                
                <ButtonContainer>
                    <Button 
                        title="Cancelar"
                        variant="gray"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}
                    />
                    <Button
                        title="Salvar"
                        disabled={isLoading}
                    />
                </ButtonContainer>
            </Form>
        </Container>
    );
}
 
export default EditUserPage;

const Container = styled.div`
    padding: 1rem;
`
const Form = styled.form``
const ButtonContainer = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    column-gap: 1rem;

    & Button {
        max-width: 15rem;
    }
`
const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
`