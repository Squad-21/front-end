import { createBrowserRouter } from "react-router-dom/dist";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { ErrorPage } from "../pages/Error";
import RegisterPage from "../pages/Register";
import { Links } from "../constants/links";
import CoursesPage from "../pages/Courses";
import AdminPage from "../pages/Admin";

export const router = createBrowserRouter([
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
    path: Links.courses,
    element: <CoursesPage />,
  },
  {
    path: Links.admin,
    element: <AdminPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
]);
