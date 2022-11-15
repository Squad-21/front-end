import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Card from "./Card";
import axios from "axios";
import { API } from "../../constants/api";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import useAuthStore from "../../context/authStore";
import { useNavigate } from "react-router-dom";
import { Links } from "../../constants/links";
import Notification from "./Notification";
import LoadingPage from "../Loading";

const CoursesPage = () => {
  const [courses, setCourses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {

    axios
      .get(`${API.base_link}/courses`)
      .then((res) => {
        setCourses(res.data);
        setErrorMessage(null);
        setIsLoading(false)
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(e.response?.data.message);
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
        {courses &&
          courses.map((course) => <Card course={course} key={course._id} />)}
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
