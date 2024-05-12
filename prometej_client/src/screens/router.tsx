import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "./HomePage";
import Login from "./Login";
import Register from "./Register";
import { createBrowserRouter } from "react-router-dom";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default appRouter;
