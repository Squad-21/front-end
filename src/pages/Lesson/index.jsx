import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Style } from '../../constants/style';
import Button from '../../components/Button';
import Comments from './Comments';
import { Link } from "react-router-dom";
import { Links } from '../../constants/links';
import { getOneCourseAction } from '../../service/api';

const LessonPage = () => {
    const [courseData, setCourseData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { courseID, lessonID } = useParams();
    const currentLesson = courseData?.lessons.find(lesson => lesson._id == lessonID);
    const currentModule = currentLesson? courseData.course.modules.find(module => module.code == currentLesson.module) : null
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
            console.log(res);
        })
        .catch(e => setErrorMessage('Erro ao obter dados'))
    },[])

    return ( 
        <Container>
            <Stack
                sx={{
                    marginBottom: '2rem'
                }}
            >
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{
                        color: Style.colors['violet-550'],
                        fontWeight: 'bold'
                    }}
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <Title>{currentLesson?.title}</Title>
            <Author>{currentLesson?.author}</Author>
            <Content>
                <TextContent>
                    {currentLesson?.content}
                </TextContent>
            </Content>
            <FeedbackContainer>
                <FeedbackButton>
                    <ThumbUpIcon />
                </FeedbackButton>
                <FeedbackButton>
                    <ThumbDownIcon />
                </FeedbackButton>
            </FeedbackContainer>
            <MarkAsDoneContainer>
                <Button
                    title="Marcar Concluída"
                />
            </MarkAsDoneContainer>
            <Comments />
        </Container>
    );
}
 
export default LessonPage;

const Container = styled.div`
    padding: 1.5rem;
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
const Content = styled.div``
const TextContent = styled.p`
    white-space: pre-line;
`
const FeedbackContainer = styled.div`
    display: flex;
    column-gap: 2rem;
    justify-content: flex-end;
    flex-direction: row;
`
const FeedbackButton = styled.button`
    background-color: ${Style.colors['violet-550']};
    width: 5rem;
    height: 2.5rem;
    border-radius: 4px;

    & svg {
        fill: white;
    }
`
const MarkAsDoneContainer = styled.div`
    margin: 3rem 0 3rem 0;
`