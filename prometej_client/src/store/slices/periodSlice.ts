import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import periodService from "../../services/routes/period";
import { PeriodContentViewModel, PeriodContentEditRequest } from "../../types/models/Period";

interface PeriodState {
    periodContent: PeriodContentViewModel | undefined;
}

const initialState: PeriodState = {
    periodContent: undefined,
};

const fetchPeriodContent = createAsyncThunk(
    'period/fetchPeriodContent',
    async (id: string) => {
        const response = await periodService.get(id);
        return response.data;
    }
);
const editPeriodContent = createAsyncThunk(
    'period/editPeriodContent',
    async (data: PeriodContentEditRequest) => {
        const response = await periodService.edit(data);
        return response.data;
    }
);

const periodSlice = createSlice({
  name: "period",
  initialState,
  reducers: {
    clearPeriodContent: (state) => {
      state.periodContent = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPeriodContent.fulfilled, (state, action: PayloadAction<PeriodContentViewModel>) => {
      state.periodContent = action.payload;
    });
  }
});

export const {
    clearPeriodContent,
} = periodSlice.actions;


export {
    fetchPeriodContent,
    editPeriodContent,
};

export default periodSlice.reducer;
