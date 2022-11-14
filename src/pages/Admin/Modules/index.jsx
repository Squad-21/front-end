import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components'
import { getOneCourseAction } from '../../../service/api';
import Table from '../Table';
import { 
    Typography, 
    Alert,
    AlertTitle
} from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { Links } from '../../../constants/links';
import Row from './Row';
import FabButton from '../FabButton';

const columns = [
    {
        id: 'name',
        label: 'Nome',
        textAlign: 'left',
        minWidth: 170,
        maxWidth: 170
    },
    {
        id: 'lessons',
        label: 'Aulas',
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

const AdminModulesPage = () => {
    const [courseData, setCourseData] = useState(null)
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { courseID } = useParams();

    let searchedModules = searchText && searchText != ''?
        courseData?.course.modules.filter(course => course.title.toLowerCase().indexOf(searchText.toLowerCase()) != -1) 
        : courseData?.course.modules

    const fetchData = async() => {
        setIsLoading(true);

        const data = await getOneCourseAction(courseID);

        if(data.error) {
            setErrorMessage(data.error)
            return 
        }
        setCourseData(data.courseData);
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
                {courseData?.course.title}
            </Typography>
            <Table columns={columns}>
                {
                    searchedModules?.map((module, index) => {
                        module.lessons = courseData.lessons.filter(lesson => lesson.module == module.code)
                        return (
                            <Row 
                                module={module}
                                courseID={courseID}
                                index={index + 1}
                                key={module._id}
                                getData={fetchData}
                            />
                        )
                    })
                }
            </Table>
            <FabButton
                onClick={() => navigate(`${Links.admin.root}/${Links.admin.courses}/${courseID}/modulos/add`)}
            />
        </Container>
     );
}
 
export default AdminModulesPage;

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