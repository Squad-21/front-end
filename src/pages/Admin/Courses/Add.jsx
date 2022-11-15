import { useState } from 'react';
import styled, { css } from 'styled-components'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseSchema } from '../../../constants/yupSchemas';
import Button from '../../../components/Button'
import FormItem from '../../../components/FormItem';
import useAuthStore from '../../../context/authStore';
import { addCourseAction } from '../../../service/api';
import { useNavigate } from 'react-router-dom';
import { Links } from '../../../constants/links';
import { Alert, AlertTitle } from '@mui/material';
import AdminContent from '../AdminContent';

const AddCoursePage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuthStore((state) => ({ token: state.token }));
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(courseSchema),
      });
      const onSubmit = async(data, e) => {
        
        setIsLoading(true);
        const addCourseData = await addCourseAction(data, token);
        setIsLoading(false)

        if(addCourseData.error) {
            setErrorMessage(addCourseData.error);
            return 
        }
        setErrorMessage(null);
        navigate(`${Links.admin.root}/${Links.admin.courses}`);
      }
      const onError = (errors, e) => console.log(errors, e)

    return ( 
        <Container>
            <AdminContent active='course'>
                <Title>Adicionar Curso</Title>
                <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
        </Container>
    );
}
 
export default AddCoursePage;

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