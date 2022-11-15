import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Style } from '../../constants/style';
import Button from '../../components/Button';
import Comments from './Comments';
import { Link } from "react-router-dom";
import { Links } from '../../constants/links';
import { getOneCourseAction, markAsDoneAction } from '../../service/api';
import Feedback from './Feedback';
import useAuthStore from '../../context/authStore';
import { formatDate } from '../../service/utils';
import { isBrowser } from 'react-device-detect';
import Breadcrumbs from '../../components/Breadcrumbs';
import VideoContent from './VideoContent';

const LessonPage = () => {
    const [courseData, setCourseData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { courseID, lessonID } = useParams();
    const { 
        token, 
        user,
        setUser 
    } = useAuthStore((state) => ({
        token: state.token, 
        setUser: state.setUser,
        user: state.user
    }));
    const currentLesson = courseData?.lessons.find(lesson => lesson._id == lessonID);
    const currentModule = currentLesson? courseData.course.modules.find(module => module.code == currentLesson.module) : null
    const lessonHasBeenDone = user.lessons.find(lesson => lesson.lessonID == lessonID)
    const breadcrumbs = [
        <Link to={`${Links.courses.root}/${courseID}`} key='1'>
            {courseData?.course.title}
        </Link>,
        <Link to={`${Links.courses.root}/${courseID}`} key='2'>
            {currentModule?.title}
        </Link>,
        <Link to={Links.home} key='3'>
            {currentLesson?.title}
        </Link>
    ];

    const handleMarkAsDone = async() => {
        setIsLoading(true)
        const data = await markAsDoneAction(lessonID, token);
        setIsLoading(false)

        if(data.error) {
            setErrorMessage(data.error)
            return 
        }

        setUser(data.user)
    }

    const fetchData = async() => {

        const data = await getOneCourseAction(courseID);

        if(data.error) {
            setErrorMessage(data.error)
            return 
        }
        return data.courseData
    }

    useEffect(() => {
        fetchData()
        .then(res => {
            setCourseData(res);
        })
        .catch(e => setErrorMessage('Erro ao obter dados'))
    },[])

    const MarkAsDone = () => {
        return (
            <MarkAsDoneContainer>
                <Button
                    title={lessonHasBeenDone? `Aula concluída em ${formatDate(user.lessons.find(lesson => lesson.lessonID == lessonID).doneAt)}` : 'Marcar Concluída'}
                    disabled={isLoading||lessonHasBeenDone}
                    onClick={handleMarkAsDone}
                />
            </MarkAsDoneContainer>
        )
    }

    return ( 
        <Container>
            <Header>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                {isBrowser && <MarkAsDone />}
            </Header>
            <Title>{currentLesson?.title}</Title>
            <Author>{currentLesson?.author}</Author>
            {currentLesson?.type == 'Artigo' &&
                <Content>
                    <TextContent>
                        {currentLesson?.content}
                    </TextContent>
                </Content>
            }
            {(currentLesson?.type == 'Video' || currentLesson?.type == 'Vídeo') &&
                    <VideoContent url={currentLesson?.content} />
            }
            <Feedback lesson={currentLesson} />
            {!isBrowser && <MarkAsDone />}
            <Comments
                courseID={courseID}
                lessonID={lessonID}
            />
        </Container>
    );
}
 
export default LessonPage;

const Container = styled.div`
    padding: ${isBrowser? '1.5rem 10rem 1.5rem 10rem' : '1.5rem'};
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
    align-items: flex-start;
`
const Title = styled.h1`
    font-size: 2.25rem;
    line-height: 2.25rem;
    word-break: break-all;
    font-weight: bold;
    margin-bottom: 2.5rem;
`
const Author = styled.h2`
    color: #65686D;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin-bottom: 1rem;
`
const Content = styled.div`
    width: ${isBrowser? '70%' : '100%'};
    margin-bottom: 5rem;
`
const TextContent = styled.p`
    white-space: pre-line;
`
const MarkAsDoneContainer = styled.div`
    ${!isBrowser? `
        margin: 2rem;
    ` : null}
    & button {
        padding-left: 1rem;
        padding-right: 1rem;
    }
`