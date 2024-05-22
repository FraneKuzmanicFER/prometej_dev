import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "./HomePage";
import Learning from "./Learning";
import Login from "./Login";
import MyQuizes from "./MyQuizes";
import Quizes from "./Quizes";
import Exam from "./Exam";
import MakeQuiz from "./MakeQuiz";
import Register from "./Register";
import Period from "./Period";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/learning" replace />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    children: [
      { path: "learning", element: <Learning /> },
      { path: "learning/:id", element: <Period /> },
      { path: "quizes", element: <Quizes /> },
      { path: "my-quizes", element: <MyQuizes /> },
      // other routes...
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/exam",
    element: <Exam />,
  },
  {
    path: "/make-quiz",
    element: <MakeQuiz />,
  },
]);

export default appRouter;
