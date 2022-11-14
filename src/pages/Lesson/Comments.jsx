import styled from "styled-components";
import Button from "../../components/Button";
import { 
    Avatar,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import { Style } from "../../constants/style";

const Comment = () => {
    return (
        <CommentContainer>
            <AvatarContainer>
                <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
            </AvatarContainer>
            <InformationContainer>
                <Name>Remy Sharp</Name> <Date>12/11/22</Date>
                <Content>Adorei essa aula ;)</Content>
                <Buttons>
                    <IconButton 
                        size="small"
                    >
                        <ReplyIcon />
                    </IconButton>
                    <IconButton size="small">
                        <DeleteIcon />
                    </IconButton>
                </Buttons>
            </InformationContainer>
        </CommentContainer>
    )
}

const Comments = () => {
    return ( 
        <Container>
            <Title>Comentários</Title>
            <Textarea
                placeholder="Escreva seu comentário"
            />
            <ButtonContainer>
                <Button
                    variant="violet"
                    title="Enviar"
                />
            </ButtonContainer>
            <CommentsList>
                <Comment />
                <Comment />
                <Comment />
            </CommentsList>
        </Container>
    );
}
 
export default Comments;

const Container = styled.div``
const Title = styled.h2`
    font-weight: bold;
`
const Textarea = styled.textarea`
    width: 100%;
    padding: 1rem;
`
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