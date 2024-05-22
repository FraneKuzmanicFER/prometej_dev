import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userSlice from './slices/userSlice';
import periodSlice from './slices/periodSlice';

export const store =  configureStore({
    reducer: {
        user: userSlice,
        period: periodSlice,
    },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;