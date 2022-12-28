import { useState } from 'react';
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
import useAuthStore from '../../context/authStore';
import { formatDate } from '../../service/utils';
import useFetchComments from '../../hooks/useFetchComments';
import useManageComments from '../../hooks/useManageComments';

const Comment = ({data, getData}) => {
    const { 
        deleteCommentAsync,
        isLoading 
    } = useManageComments();
    const { user, token } = useAuthStore((state) => ({ token: state.token, user: state.user }));

    const handleDelete = async() => {
        await deleteCommentAsync({ id: data._id, token: token })

        await getData()
    }

    if(!data.author) return 
    
    return (
        <CommentContainer>
            <AvatarContainer>
                <Avatar 
                    alt={data.author.name} 
                    src={data.author.avatar.url} 
                    sx={{
                        '.MuiAvatar-img': {
                          objectFit: 'fill'
                        }
                    }}
                />
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
    const [errorMessage, setErrorMessage] = useState(null);
    const { token } = useAuthStore((state) => ({ token: state.token }));
    const fetchComments = useFetchComments({ lessonID, token })
    const manageComment = useManageComments()
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(commentSchema),
    });

    const onSubmit = async(data, e) => {
        await manageComment.addCommentAsync({ data, lessonID, token })

        fetchComments.getCommentsAsync()
        .then(res => {
            setValue('content', '', { shouldValidate: false });
        })
        .catch(e => setErrorMessage('Erro ao obter dados'))
    }

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
                        disabled={fetchComments.isLoading || manageComment.isLoading}
                    />
                </ButtonContainer>
            </Form>
            <CommentsList>
                {fetchComments.allComments?.map(comment => 
                    <Comment 
                        key={comment._id} 
                        data={comment} 
                        getData={fetchComments.getCommentsAsync}
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