import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isLoggedIn: !!savedUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
      document.cookie = "access=; Max-Age=0; path=/; SameSite=Lax";
      document.cookie = "refresh=; Max-Age=0; path=/; SameSite=Lax";
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
