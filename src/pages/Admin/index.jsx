import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components'
import { getCoursesAction } from '../../service/api';
import Table from './Table';
import { 
    Typography, 
    Fab,
    Alert,
    AlertTitle
 } from '@mui/material';
 import AddIcon from '@mui/icons-material/Add';
import { Style } from '../../constants/style';
import { createTheme, ThemeProvider } from '@mui/material/styles';

let theme = createTheme({
    palette: {
      primary: {
        main: Style.colors['violet-550'],
      }
    },
});

const AdminPage = () => {
    const [allCourses, setAllCourses] =  useState(null);
    const [searchText, setSearchText] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    let searchedCourses = searchText && searchText != ''?
        allCourses.filter(course => course.title.toLowerCase().indexOf(searchText.toLowerCase()) != -1) 
        : allCourses

    useEffect(() => {
        const fetchData = async() => {
            const data = await getCoursesAction();

            if(data.error) {
                setErrorMessage(data.error)
                return 
            }
            setAllCourses(data.courses);
            setErrorMessage(null)
        }
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
                Todos os cursos
            </Typography>
            <Table courses={searchedCourses} />
            <ThemeProvider theme={theme}>
                <Fab 
                    color='primary'
                    aria-label="add"
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,

                    }}
                >
                    <AddIcon />
                </Fab>
            </ThemeProvider>
        </Container>
     );
}
 
export default AdminPage;

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