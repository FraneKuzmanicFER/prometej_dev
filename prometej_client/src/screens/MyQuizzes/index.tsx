import { Box, Grid, Pagination } from "@mui/material";
import QuizContainer from "../../components/QuizContainer";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store/store";
import { fetchAllUserQuizzes } from "../../store/slices/quizSlice";
import { useSelector } from "react-redux";
import { quizBaseModel } from "../../types/models/Quiz";
import "./styles.css";

export default function MyQuizzes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const { quizzes } = useSelector((state: RootState) => state.quiz);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) dispatch(fetchAllUserQuizzes(user.id));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts: quizBaseModel[] = quizzes
    ? quizzes.slice(indexOfFirstPost, indexOfLastPost)
    : [];

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "90%",
        position: "relative",
        overflowY: "hidden",
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {currentPosts.map((quiz) => (
          <Grid item xs={2} sm={4} md={4} key={quiz.id}>
            <QuizContainer name={quiz.title} authorName={quiz.creatorName} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        page={currentPage}
        count={quizzes ? Math.ceil(quizzes.length / postsPerPage) : 1}
        onChange={(_event, value: number) => handlePageChange(value)}
        className="pagination"
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
    </Box>
  );
}
