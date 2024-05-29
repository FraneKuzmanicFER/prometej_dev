import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "./HomePage";
import Learning from "./Learning";
import Login from "./Login";
import MyQuizzes from "./MyQuizzes";
import Quizzes from "./Quizzes";
import Exam from "./Exam";
import MakeQuiz from "./MakeQuiz";
import Register from "./Register";
import Period from "./Period";
import { Navigate, createBrowserRouter } from "react-router-dom";
import EditQuiz from "./MakeQuiz/EditQuiz";

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
      { path: "quizzes", element: <Quizzes /> },
      { path: "my-quizzes", element: <MyQuizzes /> },
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
  {
    path: "/edit-quiz/:id",
    element: <EditQuiz />,
  },
]);

export default appRouter;
