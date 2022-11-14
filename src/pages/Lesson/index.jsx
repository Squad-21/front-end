import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const LessonPage = () => {
    const { lessonID } = useParams();
    return ( 
        <Container>
            <h1>Aulas cria { lessonID }</h1>
        </Container>
    );
}
 
export default LessonPage;

const Container = styled.div``