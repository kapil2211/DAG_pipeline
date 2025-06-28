// src/components/MiniJsonPreview.tsx
import React from 'react';
import { Node as FlowNode, Edge } from 'reactflow';

type Props = {
  nodes: FlowNode[];
  edges: Edge[];
};

const MiniJsonPreview: React.FC<Props> = ({ nodes, edges }) => {
  const json = {
    nodes: nodes.map(({ id, data, position }) => ({ id, data, position })),
    edges: edges.map(({ id, source, target }) => ({ id, source, target })),
  };

  return (
    <div
      style={{
        backgroundColor: '#f6f6f6',
        padding: '10px',
        marginTop: '10px',
        border: '1px solid #ccc',
        maxHeight: '300px',
        overflowY: 'auto',
        fontSize: '0.85rem',
        whiteSpace: 'pre-wrap',
      }}
    >
      <h3 style={{ marginTop: 0 }}>🧾 DAG JSON Preview</h3>
      <pre>{JSON.stringify(json, null, 2)}</pre>
    </div>
  );
};

export default MiniJsonPreview;
