import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../store/slices/toastSlice";

const ToastContainer = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toast.toasts);

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, 3500),
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [dispatch, toasts]);

  if (!toasts.length) {
    return null;
  }

  return (
    <div style={containerStyle} aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} style={{ ...toastStyle, ...typeStyle[toast.type] }}>
          <span>{toast.message}</span>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => dispatch(removeToast(toast.id))}
            style={dismissButtonStyle}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};

const containerStyle = {
  position: "fixed",
  top: "76px",
  right: "20px",
  zIndex: 1050,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  maxWidth: "360px",
};

const toastStyle = {
  borderRadius: "10px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.16)",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  padding: "12px 14px",
  fontSize: "0.95rem",
};

const dismissButtonStyle = {
  background: "transparent",
  border: "none",
  color: "inherit",
  cursor: "pointer",
  fontSize: "1rem",
  lineHeight: 1,
};

const typeStyle = {
  success: { backgroundColor: "#2e7d32" },
  error: { backgroundColor: "#c62828" },
  info: { backgroundColor: "#1565c0" },
  warning: { backgroundColor: "#ed6c02" },
};

export default ToastContainer;
