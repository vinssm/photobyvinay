import React, { useEffect, useRef } from "react";

export default function Timeline({ jobs = [], loading }) {
  const itemRefs = useRef([]);

  useEffect(() => {
    const observers = itemRefs.current.map((el) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("visible");
            obs.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, [jobs]);

  if (loading) {
    return (
      <div className="loading-pulse">
        <span className="pulse-dot" />
        <span className="pulse-dot" />
        <span className="pulse-dot" />
        <span>Loading work history…</span>
      </div>
    );
  }

  return (
    <div className="timeline">
      {jobs.map((job, i) => (
        <div
          key={job.id}
          className="timeline-item"
          ref={(el) => (itemRefs.current[i] = el)}
        >
          <span className="timeline-dot" />
          <div className="timeline-card">
            <div className="job-header">
              <div>
                <div className="job-title">{job.title}</div>
                <div className="job-company">{job.company}</div>
              </div>
              <div className="job-meta">
                {job.start} – {job.end} &nbsp;|&nbsp; {job.location}
              </div>
            </div>
            <ul>
              {job.highlights.map((h, j) => (
                <li key={j}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
