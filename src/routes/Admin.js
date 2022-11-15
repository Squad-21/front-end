import { createBrowserRouter } from "react-router-dom/dist";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { ErrorPage } from "../pages/Error";
import RegisterPage from "../pages/Register";
import { Links } from "../constants/links";
import CoursesPage from "../pages/Courses";
import AdminCoursesPage from "../pages/Admin/Courses";
import AddCoursePage from "../pages/Admin/Courses/Add";
import EditCoursePage from "../pages/Admin/Courses/Edit";
import AdminModulesPage from "../pages/Admin/Modules";
import AddModulePage from "../pages/Admin/Modules/Add";
import EditModulePage from "../pages/Admin/Modules/Edit";
import AdminLessonsPage from "../pages/Admin/Lessons";
import AddLessonPage from "../pages/Admin/Lessons/Add";
import EditLessonPage from "../pages/Admin/Lessons/Edit";
import CoursePage from "../pages/Course";
import LessonPage from "../pages/Lesson";
import { QuestionsPage } from "../pages/Questions";
import AdminUsersPage from "../pages/Admin/Users";
import EditUserPage from "../pages/Admin/Users/Edit";
import { ProfilePage } from "../pages/Profile";

export const RouterAdmin = createBrowserRouter([
  {
    path: Links.home,
    element: <HomePage />,
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
    path: Links.questions,
    element: <QuestionsPage />,
  },
  {
    path: Links.profile,
    element: <ProfilePage />,
  },
  {
    path: Links.courses.root,
    children: [
      {
        path: "",
        element: <CoursesPage />,
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
          },
        ],
      },
    ],
  },
  {
    path: Links.admin.root,
    children: [
      {
        path: Links.admin.courses,
        children: [
          {
            path: "",
            element: <AdminCoursesPage />,
          },
          {
            path: "add",
            element: <AddCoursePage />,
          },
          {
            path: ":courseID/edit",
            element: <EditCoursePage />,
          },
          {
            path: ":courseID/modulos",
            element: <AdminModulesPage />,
          },
          {
            path: ":courseID/modulos/add",
            element: <AddModulePage />,
          },
          {
            path: ":courseID/modulos/:moduleCode/edit",
            element: <EditModulePage />,
          },
          {
            path: ":courseID/modulos/:moduleCode",
            element: <AdminLessonsPage />,
          },
          {
            path: ":courseID/aulas/add",
            element: <AddLessonPage />,
          },
          {
            path: ":courseID/aulas/:lessonID/edit",
            element: <EditLessonPage />,
          },
        ],
      },
      {
        path: Links.admin.users,
        children: [
          {
            path: "",
            element: <AdminUsersPage />,
          },
          {
            path: ":userID/edit",
            element: <EditUserPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
