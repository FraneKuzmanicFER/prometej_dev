import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import QuizService from "../../services/routes/quiz";
import { quizBaseModel } from "../../types/models/Quiz";

interface QuizState {
    quizzes: quizBaseModel[] | undefined;
}

const initialState: QuizState = {
    quizzes: undefined,
};

const fetchAllPublicQuizzes = createAsyncThunk(
    'quiz/getAllPublicQuizzes',
    async () => {
        const response = await QuizService.getAll();
        return response.data;
    }
);
const fetchAllUserQuizzes = createAsyncThunk(
    'quiz/getAllUserQuizzes',
    async (userId: number) => {
        const response = await QuizService.getAllUserQuizzes(userId);
        return response.data;
    }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPublicQuizzes.fulfilled, (state, action: PayloadAction<quizBaseModel[]>) => {
      state.quizzes = action.payload;
    });
    builder.addCase(fetchAllUserQuizzes.fulfilled, (state, action: PayloadAction<quizBaseModel[]>) => {
        state.quizzes = action.payload;
      });
  }
});

export {
    fetchAllPublicQuizzes,
    fetchAllUserQuizzes,
};

export default quizSlice.reducer;
