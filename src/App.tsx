import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState as useCustomNodesState,
  useEdgesState as useCustomEdgesState,
  Background,
  Controls,
  MiniMap,
  MarkerType,
} from 'reactflow';
import { ToastContainer, toast, type ToastPosition} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ReactFlowInstance, Connection,Edge,Node } from 'reactflow';
import { useState, useRef, useCallback, useMemo } from 'react';
import 'reactflow/dist/style.css';
import Sidebar from './components/Sidebar';
import UpdateNode from './components/UpdateNode';
import AddNode from './components/AddNode';
import './index.css';
import Navbar from './components/Navbar';

let id = 0;

const App = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [customNodes, setCustomNodes, onCustomNodesChange] = useCustomNodesState<Node[]>([]);
  const [customEdges, setCustomEdges, onCustomEdgesChange] = useCustomEdgesState<Edge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [nodeSelected, setNodeSelected] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [targetHandles, setTargetHandles] = useState<string[]>([]);

  let sourceHandles: string[] = [];
  let targetHandle: string[] = [];

  const updateNode = useCallback((_: any, node: Node) => {
    setSelectedNode(node);
    setNodeSelected(true);
  }, []);

  const onConnect = useCallback((params: Edge | Connection) => {
    if (sourceHandles.includes(params.source as string)) return;
    sourceHandles = [...sourceHandles, params.source as string];

    setCustomEdges((eds) =>
      addEdge({ ...params, animated: true, markerEnd: { type: MarkerType.ArrowClosed } }, eds)
    );

    if (targetHandle.includes(params.target as string)) return;
    targetHandle = [...targetHandle, params.target as string];
    setTargetHandles(targetHandle);
  }, [setCustomEdges]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    if (!reactFlowWrapper.current || !reactFlowInstance) return;

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');

    if (typeof type === 'undefined' || !type) return;

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode: Node = {
      id: `node_${id++}`,
      type: 'node',
      position,
      data: { heading: 'Send Message', label: `text message ${id}` },
    };

    setCustomNodes((nodes) => [...nodes, newNode]);
  }, [reactFlowInstance, setCustomNodes]);

  const proOptions = { hideAttribution: true };

  const nodeTypes = useMemo(() => ({
    node: AddNode,
  }), []);

  const handleInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  const saveFlow = () => {
    if (!reactFlowInstance) return;

    const nodes = reactFlowInstance.getNodes();
    const edges = reactFlowInstance.getEdges();

    const notification = {
      position:'top-left' as ToastPosition,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };

  const targetNodeIds = new Set(edges.map(edge => edge.target));

  // Filter nodes that are missing a target edge (i.e., no incoming connection)
  const nodesWithoutIncoming = nodes.filter(node => !targetNodeIds.has(node.id));

  // Validation:
   if (nodes.length > 1 && nodesWithoutIncoming.length > 1) {
     toast.error('Invalid Flow: Multiple nodes are disconnected!', notification);
   } else {
     toast.success('Saved Successfully!', notification);
   }
  };

  return (
    <div className="appflow" style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={customNodes}
            edges={customEdges}
            onNodesChange={onCustomNodesChange}
            onEdgesChange={onCustomEdgesChange}
            onConnect={onConnect}
            onInit={handleInit}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            proOptions={proOptions}
            onNodeClick={updateNode}
            nodeTypes={nodeTypes}
          >
            <Controls />
            <Background />
            <MiniMap />
          </ReactFlow>
        </div>

        <div className="rightbar">
          <Navbar saveFlow={saveFlow} />
          {nodeSelected && selectedNode ? (
            <UpdateNode
              selectedNode={selectedNode}
              setNodeSelected={setNodeSelected}
              setNodes={setCustomNodes}
            />
          ) : (
            <Sidebar />
          )}
        </div>
      </ReactFlowProvider>

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
