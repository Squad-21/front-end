import styled, { css } from "styled-components";
import { Style } from "../../constants/style";
import ArticleIcon from '@mui/icons-material/Article';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from "react-router-dom";
import { isBrowser } from "react-device-detect";

const adminPages = [
    {
        id: 'course',
        title: 'Cursos',
        link: '/admin/cursos',
        icon: <ArticleIcon />
    },
    {
        id: 'users',
        title: 'Usuários',
        link: '/admin/usuarios',
        icon: <GroupIcon />
    }    
]
const Link = ({
    data,
    active
}) => {
    const navigate = useNavigate();

    return (
        <LinkContainer
            active={active}
            onClick={() => navigate(data.link)}
        >
            <IconContainer>
                {data.icon}
            </IconContainer>
            <TitleContainer>
                {data.title}
            </TitleContainer>
        </LinkContainer>
    )
}
const AdminContent = ({children, active}) => {
    return ( 
        <Container>
            {isBrowser && <LeftMenu>
                {
                    adminPages.map(link => 
                        <Link
                            active={link.id==active}
                            key={link.id}
                            data={link}
                        />
                    )
                }
            </LeftMenu>}
            <Content>
                {children}
            </Content>
        </Container>
    );
}
 
export default AdminContent;

const Container = styled.div`
    display: flex;
    min-height: 100vh;
`
const LinkContainer = styled.div((props) => css`
    color: ${props.active? 'white' : Style.colors['light-gray']};
    background-color: ${props.active? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
    padding: 1rem;
    display: flex;
    column-gap: 1rem;
    cursor: pointer;
    transition: .3s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`)
const LeftMenu = styled.div`
    background-color: ${Style.colors.blue};
    width: 13rem;
    padding-top: 3rem;
`
const Content = styled.div`
    padding: 1rem;
    flex: 1;
`
const IconContainer = styled.div``
const TitleContainer = styled.div``