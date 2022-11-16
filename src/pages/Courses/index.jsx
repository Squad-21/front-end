import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Card from "./Card";
import axios from "axios";
import { API } from "../../constants/api";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useParams } from "react-router-dom";
import Notification from "./Notification";
import LoadingPage from "../Loading";
import { getCoursesAction } from "../../service/api";

const CoursesPage = () => {
  const [courses, setCourses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { courseSearched } = useParams();
  const coursesFiltered = courseSearched && courses? courses.filter(course => course.title.toLowerCase().indexOf(courseSearched) != -1) : courses

  const fetchData = async() => {
    const data = await getCoursesAction()

    if(data.error) {
      setIsLoading(false);
      setErrorMessage(data.error);

      return
    }

    return data.courses
  }

  useEffect(() => {

    fetchData()
    .then(res => {
      setIsLoading(false);
      setCourses(res)
    })
    .catch((e) => {
      console.log(e);
      setErrorMessage('Erro ao obter dados');
    });
  }, []);

  if(isLoading) {
    return (
      <LoadingPage />
    )
  }

  return (
    <Container>
      {errorMessage && (
        <Alert severity="error">
          <AlertTitle>Erro</AlertTitle>
          {errorMessage}
        </Alert>
      )}
      <div>
        <Notification />
      </div>
      <List>
        {coursesFiltered.length?
          coursesFiltered.map((course) => <Card course={course} key={course._id} />) :
          <Alert 
            severity="warning"
          >
            Nenhum curso com esse nome encontrado :(
          </Alert>
        }
      </List>
    </Container>
  );
};

export default CoursesPage;

const Container = styled.div`
  margin-top: 5rem;
`;
const List = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 1rem;
  row-gap: 5rem;
`;
