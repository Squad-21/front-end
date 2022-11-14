import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Button from "../../components/Button";
import { Progress } from "../Courses/Progress";
import { useNavigate, useParams } from "react-router-dom";
import { getOneCourseAction } from "../../service/api";
import PathLegend from "./PathLegend";
import ModulesList from "./ModulesList";
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { isMobile } from 'react-device-detect';
import { 
    Alert,
    AlertTitle
} from '@mui/material';

const CoursePage = () => {
    const [courseData, setCourseData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { courseID } = useParams();
    const isDesktop = useIsDesktop();

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
                <PathLegend course={courseData?.course} />
                <h1 className="text-4xl font-bold mt-4">
                    {courseData?.course.title}
                </h1>

                <div className="flex gap-1 text-sm opacity-50 my-4 ">
                    <p>26h 15min</p>
                    <p>.</p>
                    <p>{courseData?.course.modules.length} módulos</p>
                </div>

                <Progress />

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