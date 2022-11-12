import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components'
import InputText from '../../components/InputText';
import { getCoursesAction } from '../../service/api';
import Table from './Table';
import { 
    Typography, 
    Fab
 } from '@mui/material';
 import AddIcon from '@mui/icons-material/Add';

const AdminPage = () => {
    const [allCourses, setAllCourses] =  useState(null);
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            const data = await getCoursesAction();

            if(data.error) {
                setErrorMessage(data.error)
                return 
            }
            setAllCourses(data.courses);
            console.log(data.courses)
        }
        fetchData().catch(e => setErrorMessage('Erro ao obter dados'))
    },[])

    return ( 
        <Container>
            <SearchContainer>
                <InputText
                    name="search"
                    placeholder="Pesquise um curso..."
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
            <Table courses={allCourses} />
            <Fab 
                color="primary" 
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16
                }}
            >
                <AddIcon />
            </Fab>
        </Container>
     );
}
 
export default AdminPage;

const Container = styled.div`
    padding: 1rem;
`
const SearchContainer = styled.div`

`