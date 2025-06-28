import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  useReactFlow,
  Node as FlowNode,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  Position,
} from 'reactflow';
import dagre from 'dagre';
import CustomCircleNode from './CustomCircleNode';

const nodeTypes = {
  circle: CustomCircleNode,
};
const nodeWidth = 120;
const nodeHeight = 60;

type Props = {
  nodes: FlowNode[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  onNodeContextMenu: (event: React.MouseEvent, node: FlowNode) => void;
  onEdgeContextMenu: (event: React.MouseEvent, edge: Edge) => void;
  setNodes: React.Dispatch<React.SetStateAction<FlowNode[]>>; // <== add this
};

const DAGCanvas: React.FC<Props> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeContextMenu,
  onEdgeContextMenu,
  setNodes,
}) => {
  const { fitView } = useReactFlow();

  const handleAutoLayout = () => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: 'LR' });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layouted = nodes.map((node) => {
      const { x, y } = dagreGraph.node(node.id);
      return {
        ...node,
        position: { x, y },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
    });

    setNodes(layouted);
    setTimeout(() => fitView(), 0);
  };

  return (
    <>
      <button onClick={handleAutoLayout} style={{ marginBottom: '10px' }}>
        🔀 Auto Layout
      </button>
      <div style={{ height: '600px', border: '1px solid #ccc' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeContextMenu={onNodeContextMenu}
          onEdgeContextMenu={onEdgeContextMenu}
          fitView
          nodeTypes={nodeTypes}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};

export default DAGCanvas;
