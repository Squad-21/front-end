import { createBrowserRouter } from "react-router-dom/dist";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { ErrorPage } from "../pages/Error";
import RegisterPage from "../pages/Register";
import { Links } from "../constants/links";
import { QuestionsPage } from "../pages/Questions";

export const RouterNotAuth = createBrowserRouter([
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
    path: Links.courses.root,
    element: <LoginPage />,
  },
  {
    path: Links.questions,
    element: <QuestionsPage />,
  },
  {
    path: "*",
    element: <LoginPage />,
  },
]);
