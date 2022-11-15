import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components'
import { getCoursesAction } from '../../../service/api';
import Table from '../Table';
import { 
    Typography, 
    Alert,
    AlertTitle
} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { Links } from '../../../constants/links';
import Row from './Row';
import FabButton from '../FabButton';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { isBrowser } from 'react-device-detect';
import LoadingPage from '../../Loading';

const AdminCoursesPage = () => {
    const [allCourses, setAllCourses] =  useState(null);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const breadcrumbs = [
        <Link key={1} to={Links.path.home}>
            Home
        </Link>,
        <Link key={2} to={Links.path.admin.root}>
            Admin
        </Link>
    ]

    let searchedCourses = searchText && searchText != ''?
        allCourses.filter(course => course.title.toLowerCase().indexOf(searchText.toLowerCase()) != -1) 
        : allCourses
    const columns = [
        {
            id: 'name',
            label: 'Nome',
            textAlign: 'left',
            minWidth: 170,
            maxWidth: 170
        },
        {
            id: 'modules',
            label: 'Módulos',
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

    const fetchData = async() => {

        const data = await getCoursesAction();

        if(data.error) {
            setIsLoading(false);
            setErrorMessage(data.error)
            return 
        }
        return data.courses
    }

    useEffect(() => {
        fetchData()
        .then(res => {
            setAllCourses(res);
            setErrorMessage(null);
            setIsLoading(false);
        })
        .catch(e => setErrorMessage('Erro ao obter dados'))
    },[])

    if(isLoading) {
        return <LoadingPage />
    }

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
                Todos os cursos
            </Typography>
            <Table columns={columns}>
                {
                    searchedCourses?.map(course =>  
                        <Row 
                            course={course} 
                            key={course._id}
                            getCourses={fetchData}
                        />
                    )
                }
            </Table>
            <FabButton
                onClick={() => navigate(`${Links.admin.root}/${Links.admin.courses}/add`)}
            />
        </Container>
     );
}
 
export default AdminCoursesPage;

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