import { RouterProvider } from "react-router-dom/dist";
import { Navbar } from "./components/Navbar";
import { RouterNotAuth } from "./routes/NotAuth";
import useAuthStore from "./context/authStore";
import { RouterAdmin } from "./routes/Admin";
import { RouterAuth } from "./routes/Auth";

function App() {
  const { user } = useAuthStore((state) => ({ user: state.user }))
  return (
    <>
      <Navbar />
      {user?.admin && 
      <RouterProvider router={RouterAdmin} />}
      {!user && 
      <RouterProvider router={RouterNotAuth} />}
      {user && !user.admin &&  
      <RouterProvider router={RouterAuth} />}
    </>
  );
}

export default App;
