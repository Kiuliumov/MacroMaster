import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import toastSlice from './toastSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    toasts: toastSlice,
  },
});
