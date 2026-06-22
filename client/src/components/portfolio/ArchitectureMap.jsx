import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const nodeStyle = (color) => ({
  background: "#1e293b",
  border: `2px solid ${color}`,
  borderRadius: "10px",
  padding: "10px 16px",
  color: "#f1f5f9",
  fontSize: "13px",
  fontWeight: "600",
  minWidth: "140px",
  textAlign: "center",
});

const initialNodes = [
  {
    id: "react",
    position: { x: 360, y: 20 },
    data: { label: "⚛️ React Frontend\nlocalhost:3000" },
    style: nodeStyle("#3b82f6"),
  },
  {
    id: "graphql",
    position: { x: 160, y: 180 },
    data: { label: "🔗 GraphQL API\nlocalhost:3001" },
    style: nodeStyle("#8b5cf6"),
  },
  {
    id: "bio",
    position: { x: 360, y: 180 },
    data: { label: "👤 Bio Service\nNode.js :3002" },
    style: nodeStyle("#06b6d4"),
  },
  {
    id: "projects",
    position: { x: 560, y: 180 },
    data: { label: "🐍 Project Service\nFastAPI :8000" },
    style: nodeStyle("#10b981"),
  },
  {
    id: "mongo",
    position: { x: 80, y: 340 },
    data: { label: "🍃 MongoDB Atlas" },
    style: nodeStyle("#22c55e"),
  },
  {
    id: "github",
    position: { x: 580, y: 340 },
    data: { label: "🐙 GitHub API" },
    style: nodeStyle("#94a3b8"),
  },
];

const initialEdges = [
  {
    id: "r-g",
    source: "react",
    target: "graphql",
    label: "GraphQL",
    animated: true,
    style: { stroke: "#8b5cf6" },
  },
  {
    id: "r-b",
    source: "react",
    target: "bio",
    label: "REST",
    animated: true,
    style: { stroke: "#06b6d4" },
  },
  {
    id: "r-p",
    source: "react",
    target: "projects",
    label: "REST",
    animated: true,
    style: { stroke: "#10b981" },
  },
  {
    id: "g-m",
    source: "graphql",
    target: "mongo",
    label: "Mongoose",
    style: { stroke: "#22c55e" },
  },
  {
    id: "p-gh",
    source: "projects",
    target: "github",
    label: "httpx",
    style: { stroke: "#94a3b8" },
  },
];

export default function ArchitectureMap() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="arch-map-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="#334155" gap={20} />
        <Controls
          style={{ background: "#1e293b", border: "1px solid #334155" }}
        />
        <MiniMap
          nodeColor="#334155"
          maskColor="#0f172a88"
          style={{ background: "#1e293b", border: "1px solid #334155" }}
        />
      </ReactFlow>
    </div>
  );
}
