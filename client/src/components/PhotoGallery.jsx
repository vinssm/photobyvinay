import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_PHOTOS, QUERY_ME } from "../utils/queries";
import PhotoModal from "./PhotoModal";
import "../styles/PhotoGallery.css";

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { loading, data } = useQuery(QUERY_PHOTOS);
  const { data: userData } = useQuery(QUERY_ME, {
    errorPolicy: "ignore",
  });

  const photos = data?.photos || [];
  const currentUser = userData?.me;

  if (loading) return <div className="loading">Loading photos...</div>;

  return (
    <div className="photo-gallery">
      <div className="gallery-grid">
        {photos.map((photo) => {
          const isLiked =
            currentUser && photo.userLikes?.includes(currentUser._id);

          return (
            <div key={photo._id} className="gallery-item">
              <div
                className="photo-container"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="gallery-image"
                />
                <div className="photo-overlay">
                  <p className="view-text">Click to view</p>
                </div>
              </div>
              <div className="photo-info">
                <h3>{photo.title}</h3>
                <div className="photo-actions">
                  <span className="action-item">
                    <i className={`icon like-icon ${isLiked ? "liked" : ""}`}>
                      ♥
                    </i>
                    {photo.likeCount}
                  </span>
                  <span className="action-item">
                    <i className="icon comment-icon">💬</i>
                    {photo.commentCount}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          currentUser={currentUser}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
};

export default PhotoGallery;
