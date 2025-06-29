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
  MiniMap,
  BackgroundVariant
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
// its is about dagre
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
{/* this is basic button which handles auto layout logic */}
     
      {/* this is basically normal ReactFlow library which allows to draw a interactive node editor */}
    {/*all details what the props are go to app.tsx */}
      <div style={{ height: '500px', border: '4px solid', backgroundColor:"aliceblue" }}>
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
          {/* this handles how your ediotr backgorund looks like bydefault it contains dot u can use cross also */}
          <Background  variant={BackgroundVariant.Dots}/>
          {/* this enables some zoom in zoom out controls at bottom-left of editor */}
          <Controls />
          {/* this shows the small map on right-bottom of editor  */}
          <MiniMap style={{border:"2px solid", backgroundColor:"skyblue"}}/>
        </ReactFlow>

         <button onClick={handleAutoLayout} style={{ marginTop: '1rem', padding:"1rem",  borderRadius:"2rem", backgroundColor: "teal", fontSize:"15px",fontWeight:"bolder"}}>  Auto Layout </button>

      </div>
    </>
  );
};

export default DAGCanvas;
