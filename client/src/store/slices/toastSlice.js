import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action) => {
      const payload = action.payload || {};

      state.toasts.push({
        id:
          payload.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        message: payload.message || "",
        type: payload.type || "info",
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, clearToasts } = toastSlice.actions;
export default toastSlice.reducer;
