import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import toastReducer from "./slices/toastSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
  },
});

export default store;
