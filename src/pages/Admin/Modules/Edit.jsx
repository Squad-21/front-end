import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { moduleSchema } from '../../../constants/yupSchemas';
import Button from '../../../components/Button'
import FormItem from '../../../components/FormItem';
import useAuthStore from '../../../context/authStore';
import { editCourseAction, editModuleAction, getOneCourseAction } from '../../../service/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Links } from '../../../constants/links';
import { Alert, AlertTitle } from '@mui/material';
import LoadingPage from '../../Loading';
import AdminContent from '../AdminContent';
import Snackbar from '../Snackbar';

const EditModulePage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [snackIsOpen, setSnackIsOpen] = useState(false);
    const { token } = useAuthStore((state) => ({ token: state.token }));
    const navigate = useNavigate();
    const { courseID, moduleCode } = useParams();
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(moduleSchema),
    });
    const onSubmit = async(data, e) => {
        setIsLoading(true);
        const editModuleData = await editModuleAction(
            data, 
            token, 
            courseID, 
            moduleCode
        );
        setIsLoading(false);

        if(editModuleData.error) {
            setErrorMessage(editModuleData.error);
            return 
        }
        setSnackIsOpen(true);
        setErrorMessage(null);
        navigate(`${Links.admin.root}/${Links.admin.courses}/${courseID}/modulos`);
    }

    const fetchData = async() => {
        const data = await getOneCourseAction(courseID);

        if(data.error) {
            setErrorMessage(data.error)
            return 
        }
        return data.courseData.course.modules.find(module => module.code == moduleCode)
    }

    useEffect(() => {
        fetchData()
        .then(res => {
            setValue('title', res.title, { shouldValidate: true });
            setValue('description', res.description, { shouldValidate: true });
            setIsLoading(false);
        })
        .catch(e => setErrorMessage('Erro ao obter dados'))
    },[])

    if(isLoading) {
        return <LoadingPage />
    }

    return ( 
        <AdminContent active='course'>
            <Title>Editar Curso</Title>
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
 
export default EditModulePage;

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