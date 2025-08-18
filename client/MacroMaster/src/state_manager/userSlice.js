import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("jwt", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("jwt");
    },
    setUserFromStorage: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
