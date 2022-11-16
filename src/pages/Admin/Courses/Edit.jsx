import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseSchema } from '../../../constants/yupSchemas';
import Button from '../../../components/Button'
import FormItem from '../../../components/FormItem';
import useAuthStore from '../../../context/authStore';
import { editCourseAction, getOneCourseAction } from '../../../service/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Links } from '../../../constants/links';
import { Alert, AlertTitle } from '@mui/material';
import LoadingPage from '../../Loading';
import AdminContent from '../AdminContent';
import Snackbar from '../Snackbar';

const EditCoursePage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [snackIsOpen, setSnackIsOpen] = useState(false);
    const { token } = useAuthStore((state) => ({ token: state.token }));
    const navigate = useNavigate();
    const { courseID } = useParams();
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(courseSchema),
    });
    const onSubmit = async(data, e) => {
        setIsLoading(true);
        const editCourseData = await editCourseAction(data, token, courseID);
        setIsLoading(false)

        if(editCourseData.error) {
            setErrorMessage(editCourseData.error);
            return 
        }
        setSnackIsOpen(true);
        setErrorMessage(null);
        navigate(`${Links.admin.root}/${Links.admin.courses}`);
    }

    const fetchData = async() => {

        const data = await getOneCourseAction(courseID);

        if(data.error) {
            setErrorMessage(data.error)
            return 
        }
        return data.courseData.course
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
        <Container>
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
                    <FormItem
                        title="Imagem"
                        name="image"
                        type="file"
                        errorMessage={errors.image?.message}
                        registerForm={register("image")}
                    />
                    <ButtonContainer>
                        <Button 
                            title="Cancelar"
                            variant="gray"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`${Links.admin.root}/${Links.admin.courses}`);
                            }}
                        />
                        <Button
                            title="Salvar"
                            disabled={isLoading}
                        />
                    </ButtonContainer>
                </Form>
            </AdminContent>
            <Snackbar
                isOpen={snackIsOpen}
                setIsOpen={setSnackIsOpen}
                type={'success'}
            />
        </Container>
    );
}
 
export default EditCoursePage;

const Container = styled.div`
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