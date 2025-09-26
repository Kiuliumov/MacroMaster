import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, access } = action.payload;
      state.user = user;
      state.accessToken = access || null;
      state.isLoggedIn = !!user;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: () => initialState,
  },
});

export const { setUser, setAccessToken, logout } = userSlice.actions;
export default userSlice.reducer;
