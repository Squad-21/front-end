import { useState } from 'react';
import styled, { css } from 'styled-components'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { moduleSchema } from '../../../constants/yupSchemas';
import Button from '../../../components/Button'
import FormItem from '../../../components/FormItem';
import useAuthStore from '../../../context/authStore';
import { addModuleAction } from '../../../service/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Links } from '../../../constants/links';
import { Alert, AlertTitle } from '@mui/material';
import AdminContent from "../AdminContent";
import Snackbar from '../Snackbar';

const AddModulePage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [snackIsOpen, setSnackIsOpen] = useState(false);
    const { token } = useAuthStore((state) => ({ token: state.token }));
    const navigate = useNavigate();
    const { courseID } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(moduleSchema),
    });
    const onSubmit = async(data, e) => {
        
        setIsLoading(true);
        const addModuleData = await addModuleAction(data, token, courseID);
        setIsLoading(false)

        if(addModuleData.error) {
            setErrorMessage(addModuleData.error);
            return 
        }
        setSnackIsOpen(true);
        setErrorMessage(null);
        navigate(`${Links.admin.root}/${Links.admin.courses}/${courseID}/modulos`);
    }

    return ( 
        <AdminContent active='course'>
            <Title>Adicionar Módulo</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {errorMessage && 
                    <Alert severity="error">
                        <AlertTitle>Erro</AlertTitle>
                        {errorMessage}
                    </Alert>
                }
                <FormItem
                    title="Título"
                    name="title"
                    errorMessage={errors.title?.message}
                    registerForm={register("title")}
                />
                <FormItem
                    title="Descrição"
                    name="description"
                    type="textarea"
                    errorMessage={errors.description?.message}
                    registerForm={register("description")}
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
            <Snackbar
                isOpen={snackIsOpen}
                setIsOpen={setSnackIsOpen}
                type={'success'}
            />
        </AdminContent>
    );
}
 
export default AddModulePage;

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