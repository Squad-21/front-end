import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Card from "./Card";
import axios from 'axios';
import { API } from '../../constants/api';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import useAuthStore from "../../context/authStore";
import { useNavigate } from "react-router-dom";
import { Links } from "../../constants/links";

const CoursesPage = () => {
    const [courses, setCourses] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const {token} = useAuthStore((state) => ({ token: state.token }))
    const navigate = useNavigate()

    useEffect(() => {
        if(!token) {
            navigate(Links.login)
            return 
        }

        axios.get(`${API.base_link}/courses`)
        .then(res => {
            setCourses(res.data);
            setErrorMessage(null);
        }).catch(e => {
            console.log(e);
            setErrorMessage(e.response?.data.message);
        })
    },[])

    return ( 
        <Container>
            {errorMessage && 
                <Alert severity="error">
                    <AlertTitle>Erro</AlertTitle>
                    {errorMessage}
                </Alert>
            }
            <div>
            </div>
            <List>
                {courses && 
                    courses.map(course => <Card course={course} key={course._id} />)
                }
            </List>
        </Container>
     );
}
 
export default CoursesPage;

const Container = styled.div`
    margin-top: 5rem;
`
const List = styled.div`
    display: flex;
    align-items: stretch;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 1rem;
    row-gap: 5rem;
`