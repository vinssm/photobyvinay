import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_PHOTOS } from "../utils/queries";
import PhotoModal from "../components/PhotoModal.jsx";
import Auth from "../utils/auth";
import "../styles/PhotoGallery.css";

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { loading, error, data } = useQuery(QUERY_PHOTOS);

  const currentUser = Auth.loggedIn() ? Auth.getProfile().data : null;

  if (loading) {
    return (
      <section className="photo-gallery-section">
        <h2 className="photo-gallery-title">Portfolio</h2>
        <p style={{ textAlign: "center", color: "#666", padding: "40px 0" }}>
          Loading photos...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="photo-gallery-section">
        <h2 className="photo-gallery-title">Portfolio</h2>
        <p style={{ textAlign: "center", color: "#cc0000", padding: "40px 0" }}>
          Unable to load photos. Please try again later.
        </p>
      </section>
    );
  }

  const photos = data?.photos || [];

  return (
    <>
      <section className="photo-gallery-section">
        <h2 className="photo-gallery-title">Portfolio</h2>
        {photos.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666", padding: "40px 0" }}>
            No photos available yet.
          </p>
        ) : (
          <div className="gallery-grid">
            {photos.map((photo) => (
              <div key={photo._id} className="gallery-item">
                <div
                  className="photo-container"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    className="gallery-image"
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                  />
                  <div className="photo-overlay">
                    <p className="view-text">View Photo</p>
                  </div>
                </div>
                <div className="photo-info">
                  <h3>{photo.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          currentUser={currentUser}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </>
  );
};

export default PhotoGallery;
