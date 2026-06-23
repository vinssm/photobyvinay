import { createSlice } from "@reduxjs/toolkit";
import Auth from "../../utils/auth";

const getInitialUser = () => {
  if (!Auth.loggedIn()) {
    return null;
  }

  try {
    return Auth.getProfile().data;
  } catch {
    return null;
  }
};

const initialState = {
  isLoggedIn: Auth.loggedIn(),
  user: getInitialUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload?.user || null;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;
