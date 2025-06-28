import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

const CustomCircleNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: '#4caf50',
        borderRadius: '50%',
        width: 60,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: 12,
        position: 'relative',
        cursor: 'default', // ensures black arrow cursor
      }}
    >
      {/* Input connection (left side) */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />
      {data.label}
      {/* Output connection (right side) */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default CustomCircleNode;
