import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../store/slices/toastSlice";
import "../styles/Toast.css";

const ICONS = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

function Toast({ toast }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => dispatch(removeToast(toast.id)), 3500);
    return () => clearTimeout(timer);
  }, [dispatch, toast.id]);

  return (
    <div className={`toast-item toast-item--${toast.type}`} role="alert">
      <span className="toast-icon">{ICONS[toast.type]}</span>
      <span className="toast-message">{toast.message}</span>
      <button
        className="toast-close"
        onClick={() => dispatch(removeToast(toast.id))}
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const toasts = useSelector((state) => state.toast.toasts);
  if (!toasts.length) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} />
      ))}
    </div>
  );
}
