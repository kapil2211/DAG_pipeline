import React, { useState } from 'react';

type NodeEditorProps = {
  onAddNode: (label: string) => void;
};

const NodeEditor: React.FC<NodeEditorProps> = ({ onAddNode }) => {
  const [label, setLabel] = useState("");

  const handleSubmit = () => {
    const trimmed = label.trim();
    if (trimmed) {
      onAddNode(trimmed);
      setLabel('');
    }
  };

  return (
    <div style={{ marginBottom: '5rem' }}>
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Enter node label"
      />
      <button onClick={handleSubmit}>Add Node</button>
      
    </div>
  );
};

export default NodeEditor;
