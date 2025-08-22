import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      document.cookie = "access=; Max-Age=0; path=/; SameSite=Lax";
      document.cookie = "refresh=; Max-Age=0; path=/; SameSite=Lax";
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
