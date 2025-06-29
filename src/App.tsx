import React, { useCallback, useEffect, useState } from 'react';
import DAGCanvas from './components/DAGCanvas';
import NodeEditor from './components/NodeEditor';
import DAGValidator from './components/DAGValidator';
import { ReactFlowProvider, useReactFlow } from 'reactflow';

import {
  Node as FlowNode,       // Rename to avoid conflict with DOM's built-in Node
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import MiniJsonPreview from './components/MiniJsonPreview';


function App() {
  

  
  // lets move in a flow 

// first task -->add node
// first step --> State to store the graph nodes and edges       
// as reactflow requires some nodes , edges --> for that i created array and for handling them using useState hook 
  
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // Function to add a new node with a unique ID and random position
// 2nd  step-->  i created add label button and  its onhandleclick logic 
// which create a newNode and add it to FlowNode array with all its prevNodes;

  const handleAddNode = (label: string) => {
    const newNode: FlowNode = {
      id: crypto.randomUUID(),
      type: 'circle', // Custom circle node
      data: { label },
      position: {
        x: Math.random() * 800,
        y: Math.random() * 400,
      },
    };
    setNodes((prev) => [...prev, newNode]);
  };

// 2nd task---> handle connection
//after that in order to select, drag and remove nodes and edges you need to implement an onNodesChange and an onEdgesChange handler 
  // Handle changes to node positions, dragging, selection, etc.
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  // Handle changes to edges (like selection)
  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  // Called when user connects one node to another
  const onConnect = useCallback((connection: Connection) => {
    if (connection.source === connection.target) {
      alert("❌ Self-loop is not allowed.");
      return;
    }
   
    setEdges((eds) =>
      addEdge(
        {
          ...connection,
          type: 'straight', // Straight line with arrow
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          style: { stroke: '#007bff', strokeWidth: 3 },
        },
        eds
      )
    );
  }, []);




// 3rd task --> delete key
    // State to manage right-click context menu
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    targetId: string;
    type: 'node' | 'edge';
  } | null>(null);

  
  // Right-click on a node to show context menu
  const handleNodeContextMenu = (event: React.MouseEvent, node: FlowNode) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      targetId: node.id,
      type: 'node',
    });
  };

  // Right-click on an edge to show context menu
  const handleEdgeContextMenu = (event: React.MouseEvent, edge: Edge) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      targetId: edge.id,
      type: 'edge',
    });
  };

  // Delete selected node/edge when Delete key is pressed
  useEffect(() => {
    const handleDelete = (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        setNodes((nds) => nds.filter((n) => !n.selected));
        setEdges((eds) => eds.filter((e) => !e.selected));
      }
    };
    window.addEventListener('keydown', handleDelete);
    return () => window.removeEventListener('keydown', handleDelete);
  }, []);

  // Keyboard & outside click events to close context menu
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContextMenu(null);
    };
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);


  return (
    <div style={{ padding: '1rem'}}>
      <h1 style={{ textAlign: 'center', color: 'skyblue-900' }}>DAG Pipeline Builder</h1>

      {/* Node input form */}
       <NodeEditor onAddNode={handleAddNode} />


      {/* DAG canvas with nodes, edges, and interaction handlers */}
      <ReactFlowProvider>
        <DAGCanvas
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeContextMenu={handleNodeContextMenu}
          onEdgeContextMenu={handleEdgeContextMenu}
        />
      </ReactFlowProvider>
     

      {/* Live DAG validity status for that we require node and edges array to Check DAG*/}
      <DAGValidator nodes={nodes} edges={edges} />

      <MiniJsonPreview nodes={nodes} edges={edges} />

      {/* Context menu on right-click */}
      {contextMenu && (
        <ul
          style={{
            position: 'absolute',
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            listStyle: 'none',
            padding: '5px 10px',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
          }}
          onClick={() => {
            if (contextMenu.type === 'node') {
              setNodes((nds) => nds.filter((n) => n.id !== contextMenu.targetId));
            } else {
              setEdges((eds) => eds.filter((e) => e.id !== contextMenu.targetId));
            }
            setContextMenu(null);
          }}
        >
          <li>🗑️ Delete</li>
        </ul>
      )}
    </div>
  );
}

export default App;
