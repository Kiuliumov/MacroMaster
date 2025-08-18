import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const toastSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    addToast: (state, action) => {
      const id = Date.now();
      state.push({ id, ...action.payload });
    },
    removeToast: (state, action) => state.filter((t) => t.id !== action.payload),
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;