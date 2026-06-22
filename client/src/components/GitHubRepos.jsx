import React, { useState, useEffect } from "react";
import "../styles/GitHubRepos.css";

const GITHUB_USERNAME = "vinssm";

function StarIcon() {
  return (
    <svg
      height="14"
      viewBox="0 0 16 16"
      width="14"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg
      height="14"
      viewBox="0 0 16 16"
      width="14"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
  );
}

const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C#": "#178600",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Shell: "#89e051",
};

export default function GitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`,
      { headers: { Accept: "application/vnd.github+json" } },
    )
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setRepos(data.filter((r) => !r.fork));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="gh-repos-section">
        <h3 className="gh-repos-title">GitHub Repositories</h3>
        <p className="gh-repos-loading">Loading repositories…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gh-repos-section">
        <h3 className="gh-repos-title">GitHub Repositories</h3>
        <p className="gh-repos-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="gh-repos-section">
      <h3 className="gh-repos-title">GitHub Repositories</h3>
      <p className="gh-repos-subtitle">
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="gh-profile-link"
        >
          @{GITHUB_USERNAME}
        </a>{" "}
        · {repos.length} public repos
      </p>

      <div className="gh-repos-grid">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="gh-repo-card"
          >
            <div className="gh-repo-header">
              <svg
                height="16"
                viewBox="0 0 16 16"
                width="16"
                aria-hidden="true"
                fill="currentColor"
                className="gh-repo-icon"
              >
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z" />
              </svg>
              <span className="gh-repo-name">{repo.name}</span>
              {repo.private ? (
                <span className="gh-repo-badge">Private</span>
              ) : (
                <span className="gh-repo-badge gh-repo-badge--public">
                  Public
                </span>
              )}
            </div>

            {repo.description && (
              <p className="gh-repo-description">{repo.description}</p>
            )}

            <div className="gh-repo-footer">
              {repo.language && (
                <span className="gh-repo-lang">
                  <span
                    className="gh-lang-dot"
                    style={{
                      background: LANGUAGE_COLORS[repo.language] || "#8b949e",
                    }}
                  />
                  {repo.language}
                </span>
              )}
              {repo.stargazers_count > 0 && (
                <span className="gh-repo-stat">
                  <StarIcon />
                  {repo.stargazers_count}
                </span>
              )}
              {repo.forks_count > 0 && (
                <span className="gh-repo-stat">
                  <ForkIcon />
                  {repo.forks_count}
                </span>
              )}
              {repo.updated_at && (
                <span className="gh-repo-updated">
                  Updated{" "}
                  {new Date(repo.updated_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
