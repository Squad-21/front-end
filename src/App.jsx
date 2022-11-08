import { RouterProvider } from "react-router-dom/dist";
import { router } from "./routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
