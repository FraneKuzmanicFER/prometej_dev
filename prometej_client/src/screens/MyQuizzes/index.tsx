import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
} from "@mui/material";
import QuizContainer from "../../components/QuizContainer";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store/store";
import {
  fetchAllUserQuizzes,
  deleteQuiz,
  updateQuiz,
} from "../../store/slices/quizSlice";
import { useSelector } from "react-redux";
import { QuizBaseModel } from "../../types/models/Quiz";
import "./styles.css";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

export default function MyQuizzes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const { quizzes } = useSelector((state: RootState) => state.quiz);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const generateRandomNumber = () => {
    return Math.floor(10000 + Math.random() * 90000);
  };

  const handleDelete = (quizId: number) => {
    dispatch(deleteQuiz(quizId)).then(() => {
      if (user) dispatch(fetchAllUserQuizzes(user.id));
    });
  };

  const handleVisibilityChange = (quiz: QuizBaseModel, isPrivate: boolean) => {
    if (!isPrivate && user) {
      const entryCode = generateRandomNumber();
      const updatedQuiz = {
        id: quiz.id,
        title: quiz.title,
        creatorId: user.id,
        isPrivate: true,
        entryCode: entryCode,
      };
      dispatch(updateQuiz({ quiz: updatedQuiz })).then(() => {
        dispatch(fetchAllUserQuizzes(user.id));
      });
    } else if (isPrivate && user) {
      const updatedQuiz = {
        id: quiz.id,
        title: quiz.title,
        creatorId: user.id,
        isPrivate: false,
        entryCode: undefined,
      };
      dispatch(updateQuiz({ quiz: updatedQuiz })).then(() => {
        dispatch(fetchAllUserQuizzes(user.id));
      });
    }
    handleClose();
  };

  useEffect(() => {
    if (user) dispatch(fetchAllUserQuizzes(user.id));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const myQuizzes: QuizBaseModel[] = quizzes
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
        {myQuizzes.map((quiz: QuizBaseModel) => (
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            key={quiz.id}
            sx={{ position: "relative" }}
            onClick={(event) => {
              const target = event.target as HTMLElement;
              if (
                !target.closest(".quiz-container-opt") &&
                !target.closest("#basic-menu")
              ) {
                navigate(`/edit-quiz/${quiz.id}`);
              }
            }}
          >
            <QuizContainer
              name={quiz.title}
              authorName={quiz.creatorName}
              entryCode={quiz.entryCode}
            />
            <Box className="quiz-container-opt">
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={(event) => {
                  event.stopPropagation();
                  handleClick(event);
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {quiz.isPrivate && (
                  <MenuItem
                    onClick={(event) => {
                      event.stopPropagation();
                      handleVisibilityChange(quiz, true);
                    }}
                  >
                    Učini javnim
                  </MenuItem>
                )}
                {!quiz.isPrivate && (
                  <MenuItem
                    onClick={(event) => {
                      event.stopPropagation();
                      handleVisibilityChange(quiz, false);
                    }}
                  >
                    Učini privatnim
                  </MenuItem>
                )}
                <MenuItem
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(quiz.id);
                  }}
                >
                  Izbriši
                </MenuItem>
              </Menu>
            </Box>
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
