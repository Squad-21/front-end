import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { 
    Typography, 
    Alert,
    AlertTitle
} from '@mui/material';
import Table from "../Table";
import FabButton from "../FabButton";
import { useNavigate, useParams } from "react-router-dom";
import { getOneCourseAction } from '../../../service/api';
import Row from "./Row";
import { Links } from "../../../constants/links";

const columns = [
    {
        id: 'lesson',
        label: 'Aula',
        textAlign: 'left',
        minWidth: 170,
        maxWidth: 170
    },
    {
        id: 'likes',
        label: 'Curtidas',
        textAlign: 'center',
        minWidth: 50,
        maxWidth: 100
    },

    {
        id: 'edit',
        label: 'Editar',
        textAlign: 'center',
        minWidth: 50,
        maxWidth: 50
    }
]

const AdminLessonsPage = () => {
    const [courseData, setCourseData] = useState(null)
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { courseID, moduleCode } = useParams();

    let searchedLessons = searchText && searchText != ''?
        courseData?.lessons.filter(lesson => lesson.title.toLowerCase().indexOf(searchText.toLowerCase()) != -1 && lesson.module == moduleCode) 
        : courseData?.lessons.filter(lesson => lesson.module == moduleCode)

    const fetchData = async() => {
        setIsLoading(true);

        const data = await getOneCourseAction(courseID);

        if(data.error) {
            setErrorMessage(data.error)
            return 
        }
        setCourseData(data.courseData);
        console.log(data.courseData);
        setErrorMessage(null);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData().catch(e => setErrorMessage('Erro ao obter dados'))
    },[])

    return ( 
        <Container>
            {errorMessage && 
                <Alert severity="error" sx={{marginBottom: '1rem'}}>
                    <AlertTitle>Erro</AlertTitle>
                    {errorMessage}
                </Alert>
            }
            <SearchContainer>
                <Input
                    name="search"
                    className={`bg-gray-10`}                    placeholder="Pesquise um curso..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </SearchContainer>
            <Typography 
                variant="h5" 
                component="div"
                fontWeight='bold'
                sx={{
                    paddingTop: '2rem'
                }}
            >
                Módulo 1 - Introdução {moduleCode}
            </Typography>
            <Table columns={columns}>
                {
                    searchedLessons?.map(lesson => 
                            <Row 
                                lesson={lesson}
                                courseID={courseID}
                                key={lesson._id}
                                getData={fetchData}
                            />
                    )
                }
            </Table>
            <FabButton
                onClick={() => navigate(`${Links.admin.root}/${Links.admin.courses}/${courseID}/aulas/add`)}
            />
        </Container>
    );
}
 
export default AdminLessonsPage;

const Container = styled.div`
    padding: 1rem;
`
const SearchContainer = styled.div`
`
const Input = styled.input((props) => css`
    border-radius: 0.25rem;
    border: 0.3px solid #ADADAD;
    width: 100%;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.75rem;

`)