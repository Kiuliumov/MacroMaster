import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      document.cookie = "jwt=; Max-Age=0; path=/; SameSite=Lax";
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
