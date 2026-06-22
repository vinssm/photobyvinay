import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";
import {
  TOGGLE_LIKE,
  ADD_PHOTO_COMMENT,
  DELETE_PHOTO_COMMENT,
} from "../utils/mutations";
import { QUERY_PHOTOS as QUERY_PHOTOS_QUERY } from "../utils/queries";
import Auth from "../utils/auth";
import { addToast } from "../store/slices/toastSlice";
import "../styles/PhotoModal.css";

const PhotoModal = ({ photo, currentUser, onClose }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    refetchQueries: [{ query: QUERY_PHOTOS_QUERY }],
  });
  const [addComment] = useMutation(ADD_PHOTO_COMMENT, {
    refetchQueries: [{ query: QUERY_PHOTOS_QUERY }],
  });
  const [deleteComment] = useMutation(DELETE_PHOTO_COMMENT, {
    refetchQueries: [{ query: QUERY_PHOTOS_QUERY }],
  });

  const isLiked = currentUser && photo.userLikes?.includes(currentUser._id);

  const handleLike = async () => {
    if (!Auth.loggedIn()) {
      dispatch(
        addToast({ message: "Please log in to like photos", type: "info" }),
      );
      return;
    }

    try {
      await toggleLike({ variables: { photoId: photo._id } });
      dispatch(
        addToast({
          message: isLiked ? "Like removed" : "Photo liked! ♥",
          type: "success",
        }),
      );
    } catch (err) {
      console.error("Error toggling like:", err);
      dispatch(addToast({ message: "Could not update like", type: "error" }));
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!Auth.loggedIn()) {
      dispatch(addToast({ message: "Please log in to comment", type: "info" }));
      return;
    }

    if (!commentText.trim()) {
      dispatch(addToast({ message: "Please enter a comment", type: "error" }));
      return;
    }

    try {
      await addComment({
        variables: { photoId: photo._id, text: commentText },
      });
      dispatch(addToast({ message: "Comment posted!", type: "success" }));
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
      dispatch(addToast({ message: "Could not post comment", type: "error" }));
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment({
        variables: { photoCommentId: commentId },
      });
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const canDeleteComment = (comment) => {
    return currentUser && currentUser._id === comment.authorId;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="modal-body">
          <div className="photo-section">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="modal-image"
            />
          </div>

          <div className="comments-section">
            <h2>{photo.title}</h2>
            {photo.description && (
              <p className="description">{photo.description}</p>
            )}

            <div className="photo-actions-bar">
              <button
                className={`action-btn like-btn ${isLiked ? "liked" : ""}`}
                onClick={handleLike}
              >
                <span className="icon">♥</span>
                <span>{photo.likeCount} Likes</span>
              </button>
            </div>

            <div className="comments-list">
              <h3>Comments ({photo.comments?.length || 0})</h3>

              {photo.comments && photo.comments.length > 0 ? (
                <div className="comments">
                  {photo.comments.map((comment) => (
                    <div key={comment._id} className="comment-item">
                      <div className="comment-header">
                        <strong>{comment.author}</strong>
                        <span className="comment-time">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                      {canDeleteComment(comment) && (
                        <button
                          className="delete-comment-btn"
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-comments">
                  No comments yet. Be the first to comment!
                </p>
              )}

              {Auth.loggedIn() ? (
                <form className="comment-form" onSubmit={handleAddComment}>
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="comment-input"
                    rows="3"
                  />
                  <button type="submit" className="submit-comment-btn">
                    Post Comment
                  </button>
                </form>
              ) : (
                <p className="login-prompt">Please log in to comment</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
