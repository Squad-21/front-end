import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { 
    Typography, 
    Alert,
    AlertTitle
} from '@mui/material';
import Table from "../Table";
import FabButton from "../FabButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOneCourseAction } from '../../../service/api';
import Row from "./Row";
import { Links } from "../../../constants/links";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { isBrowser } from "react-device-detect";

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
    const currentModule = courseData?.course.modules.find(module => module.code == moduleCode);
    const breadcrumbs = [
        <Link key={1} to={Links.path.home}>
            Home
        </Link>,
        <Link key={2} to={Links.path.admin.root}>
            Admin
        </Link>,
        <Link key={3} to={Links.path.admin.modules.root.replace('{courseID}', courseID)}>
            {courseData?.course.title}
        </Link>,
        <Link key={4} to={Links.path.admin.modules.module.replace('{courseID}', courseID).replace('{moduleCode}', moduleCode)}>
            {currentModule?.title}
        </Link>
    ]

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
            <Breadcrumbs breadcrumbs={breadcrumbs} />
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
                {currentModule?.title}
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
    width: ${isBrowser? '50%' : '100%'};
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.75rem;

`)