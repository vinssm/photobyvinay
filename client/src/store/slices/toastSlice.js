import { createSlice } from "@reduxjs/toolkit";

let nextId = 1;

const toastSlice = createSlice({
  name: "toast",
  initialState: { toasts: [] },
  reducers: {
    addToast(state, action) {
      state.toasts.push({
        id: nextId++,
        message: action.payload.message,
        type: action.payload.type ?? "success", // "success" | "error" | "info"
      });
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
