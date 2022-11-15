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
import LoadingPage from '../../Loading';
import SearchBar from "../SearchBar";
import AdminContent from "../AdminContent";

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
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { courseID, moduleCode } = useParams();
    const currentModule = courseData?.course.modules.find(module => module.code == moduleCode);
    const breadcrumbs = [
        <Link key={1} to={Links.path.admin.root}>
            Admin
        </Link>,
        <Link key={2} to={Links.path.admin.root}>
            Cursos
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

        const data = await getOneCourseAction(courseID);

        if(data.error) {
            setIsLoading(false);
            setErrorMessage(data.error)
            return 
        }
        setCourseData(data.courseData);
        setErrorMessage(null);
        return data.courseData
    }

    useEffect(() => {
        fetchData()
        .then(res => {
            setIsLoading(false);
        })
        .catch(e => setErrorMessage('Erro ao obter dados'))
    },[])

    if(isLoading) {
        return <LoadingPage />
    }

    return ( 
        <Container>
            <AdminContent active='course'>
                {errorMessage && 
                    <Alert severity="error" sx={{marginBottom: '1rem'}}>
                        <AlertTitle>Erro</AlertTitle>
                        {errorMessage}
                    </Alert>
                }
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <SearchBar
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
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
            </AdminContent>
        </Container>
    );
}
 
export default AdminLessonsPage;

const Container = styled.div`
`