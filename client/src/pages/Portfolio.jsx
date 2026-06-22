import React, { useState, useEffect } from "react";
import Timeline from "../components/portfolio/Timeline.jsx";
import TelemetrySidebar from "../components/portfolio/TelemetrySidebar.jsx";
import ArchitectureMap from "../components/portfolio/ArchitectureMap.jsx";
import "../styles/Portfolio.css";

function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

const SECTIONS = [
  "Timeline",
  "Architecture",
  "Projects",
  "Live Telemetry",
  "Skills",
];

export default function Portfolio() {
  const [active, setActive] = useState("Timeline");

  const { data: bio, loading: bioLoading } = useApi("/api/bio/bio");
  const { data: jobs, loading: jobsLoading } = useApi("/api/bio/jobs");
  const { data: skills } = useApi("/api/bio/skills");
  const { data: projects, loading: projectsLoading } = useApi(
    "/api/projects/projects",
  );

  const handleDownloadPdf = () => {
    window.open("/api/bio/resume/pdf", "_blank");
  };

  return (
    <div className="portfolio-page">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="portfolio-hero">
        {bioLoading ? (
          <div className="loading-pulse" style={{ justifyContent: "center" }}>
            <span className="pulse-dot" />
            <span className="pulse-dot" />
            <span className="pulse-dot" />
          </div>
        ) : (
          <>
            <h1>{bio?.name || "Vinay Vallabhaneni"}</h1>
            <span className="title-badge">
              {bio?.title || "Full Stack Engineer"}
            </span>
            <p>{bio?.summary}</p>
            <button className="pdf-btn" onClick={handleDownloadPdf}>
              ⬇ Download Resume (PDF)
            </button>
          </>
        )}
      </div>

      {/* ── Section nav tabs ──────────────────────────────────────── */}
      <div
        style={{
          background: "#1e293b",
          borderBottom: "1px solid #334155",
          padding: "0 24px",
          display: "flex",
          gap: "4px",
          overflowX: "auto",
        }}
      >
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            style={{
              background: "none",
              border: "none",
              color: active === s ? "#3b82f6" : "#64748b",
              fontWeight: active === s ? "700" : "400",
              fontSize: "0.92rem",
              padding: "14px 20px",
              borderBottom:
                active === s ? "2px solid #3b82f6" : "2px solid transparent",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "color 0.15s",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ── Timeline ──────────────────────────────────────────────── */}
      {active === "Timeline" && (
        <div className="portfolio-section">
          <h2 className="section-heading">Work History</h2>
          <hr className="section-divider" />
          <Timeline jobs={jobs || []} loading={jobsLoading} />
        </div>
      )}

      {/* ── Architecture Map ──────────────────────────────────────── */}
      {active === "Architecture" && (
        <div className="portfolio-section">
          <h2 className="section-heading">System Architecture</h2>
          <hr className="section-divider" />
          <p
            style={{
              color: "#64748b",
              fontSize: "0.9rem",
              marginBottom: "24px",
            }}
          >
            Interactive diagram of the microservices powering this portfolio.
            Drag nodes to explore.
          </p>
          <ArchitectureMap />
        </div>
      )}

      {/* ── Projects ──────────────────────────────────────────────── */}
      {active === "Projects" && (
        <div className="portfolio-section">
          <h2 className="section-heading">Project Portfolio</h2>
          <hr className="section-divider" />
          {projectsLoading ? (
            <div className="loading-pulse">
              <span className="pulse-dot" />
              <span className="pulse-dot" />
              <span className="pulse-dot" />
              <span>Loading projects…</span>
            </div>
          ) : (
            <div className="projects-grid">
              {(projects || []).map((p) => (
                <div key={p.id} className="project-card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <div className="proj-name">{p.name}</div>
                    <span className={`status-badge ${p.status}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="proj-desc">{p.description}</div>
                  <div className="proj-tech">
                    {p.tech.map((t) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="proj-impact">✦ {p.impact}</div>
                  <div className="proj-links">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer">
                        GitHub →
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer">
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Live Telemetry ────────────────────────────────────────── */}
      {active === "Live Telemetry" && (
        <div className="portfolio-section">
          <h2 className="section-heading">Live Service Health</h2>
          <hr className="section-divider" />
          <p
            style={{
              color: "#64748b",
              fontSize: "0.9rem",
              marginBottom: "24px",
            }}
          >
            Real-time health checks against each backend service. Re-pings every
            15 seconds.
          </p>
          <TelemetrySidebar />
        </div>
      )}

      {/* ── Skills ────────────────────────────────────────────────── */}
      {active === "Skills" && (
        <div className="portfolio-section">
          <h2 className="section-heading">Skills</h2>
          <hr className="section-divider" />
          {skills ? (
            <div className="skills-grid">
              {skills.map((group) => (
                <div key={group.category} className="skill-group">
                  <h6>{group.category}</h6>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="loading-pulse">
              <span className="pulse-dot" />
              <span className="pulse-dot" />
              <span className="pulse-dot" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
