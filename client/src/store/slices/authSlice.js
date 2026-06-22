import { createSlice } from "@reduxjs/toolkit";
import Auth from "../../utils/auth";

// Hydrate from localStorage on startup so a page-refresh doesn't log the user out
const hydrateUser = () => {
  if (Auth.loggedIn()) {
    const profile = Auth.getProfile();
    return profile?.data ?? null;
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: hydrateUser(),
    isLoggedIn: Auth.loggedIn(),
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logoutUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;
