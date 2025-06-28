import React from 'react';
import { Node as FlowNode, Edge } from 'reactflow';

type Props = {
  nodes: FlowNode[];
  edges: Edge[];
};

function validateDAG(nodes: FlowNode[], edges: Edge[]): boolean {
  if (nodes.length < 2) return false;

  const adjacency: Record<string, string[]> = {};
  nodes.forEach((node) => (adjacency[node.id] = []));

  const inDegree: Record<string, number> = {};
  nodes.forEach((node) => (inDegree[node.id] = 0));

  for (const edge of edges) {
    if (edge.source === edge.target) return false; // Self-loop check
    adjacency[edge.source].push(edge.target);
    inDegree[edge.target]++;
  }

  // All nodes should be connected
  const connected = new Set(edges.flatMap(e => [e.source, e.target]));
  if (nodes.some(n => !connected.has(n.id))) return false;

  // Topological sort (Kahn's Algorithm) to check for cycles
  const queue = Object.keys(inDegree).filter((id) => inDegree[id] === 0);
  let visited = 0;

  while (queue.length) {
    const current = queue.shift()!;
    visited++;
    for (const neighbor of adjacency[current]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return visited === nodes.length;
}

const DAGValidator: React.FC<Props> = ({ nodes, edges }) => {
  const isValid = validateDAG(nodes, edges);

  return (
    <div style={{ padding: '10px', color: isValid ? 'green' : 'red' }}>
      DAG Status: {isValid ? '✅ Valid DAG' : '❌ Invalid DAG'}
    </div>
  );
};

export default DAGValidator;
