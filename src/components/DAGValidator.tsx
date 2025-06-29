import React from 'react';
import { Node as FlowNode, Edge } from 'reactflow';

type Props = {
  nodes: FlowNode[];
  edges: Edge[];
};

// to check DAG we are using Kahn's algorithm (BFS approach)

function validateDAG(nodes: FlowNode[], edges: Edge[]): boolean {
  // if there are less than 2 nodes then Invalid
  if (nodes.length < 2) return false;

  // creating adjacency list for nodes and its neighbour --> map with node-> array
  const adjacency: Record<string, string[]> = {};
  nodes.forEach((node) => (adjacency[node.id] = []));

  // creating a array for storing how many nodes ended on particular node(node->single number)
  const inDegree: Record<string, number> = {};
  nodes.forEach((node) => (inDegree[node.id] = 0));

  // traversing a edges array
  for (const edge of edges) {
    // if edge contain {id , source ,target}

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
    <div style={{ display: 'flex', justifyContent: "center", backgroundColor: "aliceblue", padding: '10px', marginTop: "5rem", width: "50vw", border: "2px solid skyblue", fontWeight: "bolder", color: isValid ? 'green' : 'red' }}>
      DAG Status: {isValid ? '✅ Valid DAG' : '❌ Invalid DAG'}
    </div>
  );
};

export default DAGValidator;
