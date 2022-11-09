import { createBrowserRouter } from "react-router-dom/dist";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/LoginPage";
import { ErrorPage } from "../pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
