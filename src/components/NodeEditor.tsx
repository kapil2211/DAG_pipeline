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
    <div style={{ marginBottom: '2rem' }}>
      <input
        type="number"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Enter node label"
        style={{padding:"1rem" , borderColor:"blue", borderRadius:"2rem" ,marginRight:"1rem" }}
      />
      <button onClick={handleSubmit} style={{padding:"1rem" , textDecoration:"white",borderColor:"black", backgroundColor:"aliceblue", borderRadius:"2rem" ,marginRight:"1rem", }} >Add Node</button>
      
    </div>
  );
};

export default NodeEditor;
