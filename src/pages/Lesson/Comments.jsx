import { useState, useEffect } from 'react';
import styled, { css } from "styled-components";
import Button from "../../components/Button";
import { 
    Avatar,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import { Style } from "../../constants/style";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentSchema } from "../../constants/yupSchemas";
import { addCommentAction, deleteCommentAction, getCommentsAction } from '../../service/api';
import useAuthStore from '../../context/authStore';
import { formatDate } from '../../service/utils';

const Comment = ({data, getData}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { user, token } = useAuthStore((state) => ({ token: state.token, user: state.user }));

    const handleDelete = async() => {
        setIsLoading(true)
        const dataDelete = await deleteCommentAction(data._id, token)

        if(dataDelete.error) {
            alert(dataDelete.error)
            return 
        }
        console.log(dataDelete.message)
        await getData()
        setIsLoading(false)
    }
    return (
        <CommentContainer>
            <AvatarContainer>
                <Avatar alt={data.author.name} src={data.author.avatar.url} />
            </AvatarContainer>
            <InformationContainer>
                <Name>{data.author.name}</Name> <Date>{formatDate(data.createdAt)}</Date>
                <Content>{data.content}</Content>
                <Buttons>
                    <IconButton 
                        size="small"
                    >
                        <ReplyIcon />
                    </IconButton>
                    {user.admin && <IconButton 
                        size="small"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        <DeleteIcon />
                    </IconButton>}
                </Buttons>
            </InformationContainer>
        </CommentContainer>
    )
}

const Comments = ({courseID, lessonID}) => {
    const [allComments, setAllComments] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { token } = useAuthStore((state) => ({ token: state.token }));
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(commentSchema),
    });

    const onSubmit = async(data, e) => {
        setIsLoading(true);
        const dataComment = await addCommentAction(data, lessonID, token);

        if(dataComment.error) {
            setErrorMessage(dataComment.error)
            return
        }

        fetchData()
        .then(res => {
            setValue('content', '', { shouldValidate: false });
        })
        .catch(e => setErrorMessage('Erro ao obter dados'))
    }

    const fetchData = async() => {
        setIsLoading(true);
        const data = await getCommentsAction(lessonID, token);
        setIsLoading(false);

        if(data.error) {
            setErrorMessage(data.error)
            return 
        }
        setAllComments(data.comments);
    }

    useEffect(() => {
        fetchData()
        .catch(e => setErrorMessage('Erro ao obter dados'))
    },[])

    return ( 
        <Container>
            <Title>Comentários</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Textarea
                    placeholder="Escreva seu comentário"
                    error={errors.content?.message}
                    {...register('content')}
                />
                <Error>{errors.content?.message} {errorMessage}</Error>
                <ButtonContainer>
                    <Button
                        variant="violet"
                        title="Enviar"
                        disabled={isLoading}
                    />
                </ButtonContainer>
            </Form>
            <CommentsList>
                {allComments?.map(comment => 
                    <Comment 
                        key={comment._id} 
                        data={comment} 
                        getData={fetchData}
                    />
                )}
            </CommentsList>
        </Container>
    );
}
 
export default Comments;

const Container = styled.div``
const Title = styled.h2`
    font-weight: bold;
    margin-bottom: 1rem;
`
const Textarea = styled.textarea((props) => css`
    width: 100%;
    padding: 1rem;
    border: ${props.error ? '1px solid red' : '1px solid #ADADAD'};
    border-radius: 4px;
    resize: none;
`)
const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    & Button {
        max-width: 10rem;
    }
`
const CommentsList = styled.div``
const CommentContainer = styled.div`
    display: flex;
    column-gap: 1rem;
    margin-top: 1rem;
`
const AvatarContainer = styled.div``
const InformationContainer = styled.div``
const Name = styled.span`
    font-weight: bold;
`
const Date = styled.span`
    color: ${Style.colors["light-gray"]};
    font-size: .8rem;
    margin-left: .5rem;
`
const Content = styled.p`
    padding: 0.5rem 0 0.5rem 0;
`
const Buttons = styled.div`
    & svg{
        opacity: .5;
    }
`
const Form = styled.form``
const Error = styled.p`
    color: red;;
`