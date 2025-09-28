import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, access } = action.payload;
      state.user = user;
      state.accessToken = access || null;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: () => initialState,
  },
});

export const { setUser, setAccessToken, logout } = userSlice.actions;
export default userSlice.reducer;
