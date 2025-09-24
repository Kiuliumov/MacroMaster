import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  accessToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, access } = action.payload;

      state.user = user;
      state.isLoggedIn = true;
      state.accessToken = access;

      localStorage.setItem("user", JSON.stringify(user));
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload; 
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;

      document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("user");
      
    },
  },
});

export const { setUser, setAccessToken, logout } = userSlice.actions;
export default userSlice.reducer;
