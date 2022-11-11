import { createBrowserRouter } from "react-router-dom/dist";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/LoginPage";
import { ErrorPage } from "../pages/Error";
import RegisterPage from "../pages/Register";
import { Links } from "../constants/links";

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
    path: "*",
    element: <ErrorPage />,
  }
]);
