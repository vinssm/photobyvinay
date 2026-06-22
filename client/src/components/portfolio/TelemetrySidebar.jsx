import React, { useState, useEffect, useCallback } from "react";

const SERVICES = [
  {
    name: "GraphQL API",
    url: "/graphql",
    method: "POST",
    body: JSON.stringify({ query: "{ __typename }" }),
    headers: { "Content-Type": "application/json" },
    accent: "#8b5cf6",
  },
  {
    name: "Bio Service",
    url: "/api/bio/health",
    method: "GET",
    body: null,
    headers: {},
    accent: "#3b82f6",
  },
  {
    name: "Project Service",
    url: "/api/projects/health",
    method: "GET",
    body: null,
    headers: {},
    accent: "#06b6d4",
  },
];

function useServiceHealth(service) {
  const [state, setState] = useState({ status: "checking", latency: null });

  const check = useCallback(async () => {
    setState((s) => ({ ...s, status: "checking" }));
    const start = performance.now();
    try {
      const resp = await fetch(service.url, {
        method: service.method,
        headers: service.headers,
        body: service.body || undefined,
      });
      const latency = Math.round(performance.now() - start);
      setState({ status: resp.ok ? "up" : "down", latency });
    } catch {
      setState({ status: "down", latency: null });
    }
  }, [service.url, service.method, service.body]);

  useEffect(() => {
    check();
    const id = setInterval(check, 15000); // re-check every 15s
    return () => clearInterval(id);
  }, [check]);

  return state;
}

function ServiceCard({ service }) {
  const { status, latency } = useServiceHealth(service);

  return (
    <div className="telemetry-card" style={{ "--accent": service.accent }}>
      <div className="svc-name">{service.name}</div>
      <div className="svc-status">
        <span className={`status-dot ${status}`} />
        {status === "checking"
          ? "Checking…"
          : status === "up"
            ? "Healthy"
            : "Unreachable"}
      </div>
      {latency !== null && (
        <div className="svc-latency">
          Latency: <strong>{latency}ms</strong>
        </div>
      )}
    </div>
  );
}

export default function TelemetrySidebar() {
  return (
    <div className="telemetry-grid">
      {SERVICES.map((svc) => (
        <ServiceCard key={svc.name} service={svc} />
      ))}
    </div>
  );
}
