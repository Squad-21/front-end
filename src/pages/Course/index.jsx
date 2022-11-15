import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Button from "../../components/Button";
import Progress from './Progress';
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOneCourseAction } from "../../service/api";
import ModulesList from "./ModulesList";
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { isMobile } from 'react-device-detect';
import { 
    Alert,
    AlertTitle
} from '@mui/material';
import { Links } from "../../constants/links";
import Breadcrumbs from "../../components/Breadcrumbs";
import useAuthStore from '../../context/authStore';
import { calculateHoursOfLesson } from "../../service/utils";

const CoursePage = () => {
    const [courseData, setCourseData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { courseID } = useParams();
    const { user } = useAuthStore((state) => ({ user: state.user }));
    const isDesktop = useIsDesktop();
    const lessonsDone = user?.lessons.filter(lesson => lesson.courseID == courseID).length;
    const lessonsDonePercentage = (100 * lessonsDone) / courseData?.lessons.length;
    const time = calculateHoursOfLesson(courseData?.lessons);
    const breadcrumns = [
        <Link key={1} to={Links.home}>
            Home
        </Link>,
        <Link key={2} to={Links.courses.root}>
            Cursos 
        </Link>,
        <Link key={3} to={`${Links.courses.root}/${courseData?.course?._id}`}>
                {courseData?.course.title}
        </Link>
    ]

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
    
    return ( 
        <Container className="flex flex-wrap justify-center">
            <LeftContainer>
                {errorMessage && 
                    <Alert severity="error" sx={{marginBottom: '1rem'}}>
                        <AlertTitle>Erro</AlertTitle>
                        {errorMessage}
                    </Alert>
                }
                <Breadcrumbs breadcrumbs={breadcrumns} />
                <h1 className="text-4xl font-bold mt-4">
                    {courseData?.course.title}
                </h1>

                <div className="flex gap-1 text-sm opacity-50 my-4 ">
                    <p>{time.hours}h {time.min}min</p>
                    <p>·</p>
                    <p>{courseData?.course.modules.length} módulos</p>
                </div>

                <Progress value={isNaN(lessonsDonePercentage)? 0 : lessonsDonePercentage} />
  
                <div className="w-64 mx-auto mt-6">
                    <Button title="Começar agora" />
                </div>
            </LeftContainer>

            <RightContainer>
                <ModulesList courseData={courseData} />
            </RightContainer>
        </Container>
     );
}
 
export default CoursePage;

const Container = styled.div`
    flex-direction: row;
    padding: ${isMobile? '1.5rem' : '1.5rem 8rem 1.5rem 8rem'};
    column-gap: 8rem;
`
const LeftContainer = styled.div`
    flex: 1;
`
const RightContainer = styled.div`
    flex: 1;
    margin-top: 1.5rem;
`