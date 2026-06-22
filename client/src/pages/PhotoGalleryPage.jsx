import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PhotoGallery from "./PhotoGallery.jsx";

export default function PhotoGalleryPage() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="photo-gallery-page">
      <PhotoGallery />
    </div>
  );
}
