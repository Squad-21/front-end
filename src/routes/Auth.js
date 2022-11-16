import { createBrowserRouter } from "react-router-dom/dist";
import { HomePage } from "../pages/Home";
import { ErrorPage } from "../pages/Error";
import { Links } from "../constants/links";
import CoursesPage from "../pages/Courses";
import CoursePage from "../pages/Course";
import LessonPage from "../pages/Lesson";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

export const RouterAuth = createBrowserRouter([
  {
    path: Links.home,
    element: <HomePage />,
  },
  {
    path: Links.courses.root,
    children: [
      {
        path: "",
        element: <CoursesPage />,
      },
      {
        path: Links.courses.search,
        children: [
          {
            path: ':courseSearched',
            element: <CoursesPage />
          }
        ]
      },
      {
        path: ":courseID",
        children: [
          {
            path: "",
            element: <CoursePage />,
          },
          {
            path: `${Links.courses.lesson}/:lessonID`,
            element: <LessonPage />,
          }
        ]
      },
    ],
  },
  {
    path: Links.login,
    element: <LoginPage />,
  },
  {
    path: Links.register,
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
