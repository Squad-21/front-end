import { createBrowserRouter } from "react-router-dom/dist";
import { HomePage } from "../pages/Home";
import { DevPage } from "../pages/Dev";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dev",
    element: <DevPage />,
  },
]);
