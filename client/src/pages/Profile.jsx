import React from "react";
import { Navigate, Link } from "react-router-dom";
import { Alert, Button, Spinner } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import Auth from "../utils/auth";
import { QUERY_ME, QUERY_MY_PHOTO_COMMENTS } from "../utils/queries";
import { REMOVE_Comment } from "../utils/mutations";
import MemberContent from "../components/MemberContent.jsx";

export default function Profile() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { loading, error, data, refetch } = useQuery(QUERY_ME, {
    skip: !isLoggedIn,
  });
  const { data: photoCommentsData } = useQuery(QUERY_MY_PHOTO_COMMENTS, {
    skip: !isLoggedIn,
  });
  const [removeComment, { loading: removing }] = useMutation(REMOVE_Comment);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    Auth.logout();
  };

  const handleRemoveComment = async (commentId) => {
    try {
      await removeComment({ variables: { commentId } });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <Spinner animation="border" variant="primary" />
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <Alert variant="danger">
            Unable to load profile. Please log in again.
          </Alert>
          <Button className="profile-btn" onClick={handleLogout}>
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  const user = data?.me;
  const savedComments = user?.savedComments || [];
  const avatarUrl = `https://robohash.org/${encodeURIComponent(
    user?.username || "user",
  )}.png?size=200x200`;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <img
            className="profile-avatar"
            src={avatarUrl}
            alt={`${user?.username}'s avatar`}
          />
          <div className="profile-info">
            <h2 className="profile-name">{user?.username}</h2>
            <p className="profile-email">{user?.email}</p>
            <span className="profile-badge">Member</span>
            <MemberContent />
          </div>
        </div>

        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-value">
              {user?.commentCount ?? savedComments.length}
            </span>
            <span className="profile-stat-label">Saved Comments</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">Active</span>
            <span className="profile-stat-label">Account Status</span>
          </div>
        </div>

        <div className="profile-actions">
          <Button
            as={Link}
            to="/photo-gallery"
            className="profile-btn profile-btn-secondary"
          >
            View Photo Gallery
          </Button>
          <Button
            className="profile-btn profile-btn-danger"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>

        <section className="profile-comments">
          <div className="profile-comments-header">
            <h3>My Photo Comments</h3>
            <span className="profile-comments-count">
              {(photoCommentsData?.myPhotoComments || []).length} item
              {(photoCommentsData?.myPhotoComments || []).length !== 1
                ? "s"
                : ""}
            </span>
          </div>

          {!photoCommentsData?.myPhotoComments?.length ? (
            <div className="profile-empty">
              <p>You have not commented on any photos yet.</p>
            </div>
          ) : (
            <div className="profile-comment-list">
              {photoCommentsData.myPhotoComments.map((pc) => (
                <article key={pc._id} className="profile-comment-card">
                  <div
                    className="profile-comment-content"
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    {pc.photo?.imageUrl && (
                      <img
                        src={pc.photo.imageUrl}
                        alt={pc.photo.title}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <div>
                      {pc.photo?.title && (
                        <h4 style={{ margin: "0 0 4px" }}>{pc.photo.title}</h4>
                      )}
                      <p style={{ margin: "0 0 4px", color: "#555" }}>
                        {pc.text}
                      </p>
                      <span className="profile-comment-meta">
                        {new Date(pc.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="profile-comments">
          <div className="profile-comments-header">
            <h3>My Saved Comments</h3>
            <span className="profile-comments-count">
              {savedComments.length} item{savedComments.length !== 1 ? "s" : ""}
            </span>
          </div>

          {savedComments.length === 0 ? (
            <div className="profile-empty">
              <p>You have not saved any comments yet.</p>
              <Link to="/photo-gallery" className="profile-empty-link">
                Browse photo gallery →
              </Link>
            </div>
          ) : (
            <div className="profile-comment-list">
              {savedComments.map((comment) => (
                <article
                  key={comment.commentId}
                  className="profile-comment-card"
                >
                  <div className="profile-comment-content">
                    <h4>{comment.title}</h4>
                    {comment.description && <p>{comment.description}</p>}
                    {comment.authors?.length > 0 && (
                      <p className="profile-comment-meta">
                        By {comment.authors.join(", ")}
                      </p>
                    )}
                    {comment.link && (
                      <a
                        href={comment.link}
                        target="_blank"
                        rel="noreferrer"
                        className="profile-comment-link"
                      >
                        View source
                      </a>
                    )}
                  </div>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="profile-remove-btn"
                    disabled={removing}
                    onClick={() => handleRemoveComment(comment.commentId)}
                  >
                    Remove
                  </Button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
