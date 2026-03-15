import { useCallback } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    { id: '1', position: { x: 250, y: 5 }, data: { label: 'Client (Vite + React)' }, style: { background: '#6366F1', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: 'bold' } },
    { id: '2', position: { x: 100, y: 100 }, data: { label: 'REST API' }, style: { background: '#334155', color: '#fff', border: '1px solid #475569', borderRadius: '8px' } },
    { id: '3', position: { x: 400, y: 100 }, data: { label: 'WebSocket (Socket.io)' }, style: { background: '#334155', color: '#fff', border: '1px solid #475569', borderRadius: '8px' } },
    { id: '4', position: { x: 250, y: 200 }, data: { label: 'Node.js Express Server' }, style: { background: '#22C55E', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: 'bold' } },
    { id: '5', position: { x: 250, y: 350 }, data: { label: 'MongoDB Database' }, style: { background: '#10B981', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: 'bold' } },
    { id: '6', position: { x: 50, y: 250 }, data: { label: 'Authentication / Auth' }, style: { background: '#334155', color: '#fff', border: '1px solid #475569', borderRadius: '8px' } },
    { id: '7', position: { x: 450, y: 250 }, data: { label: 'File Storage' }, style: { background: '#334155', color: '#fff', border: '1px solid #475569', borderRadius: '8px' } },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#94a3b8' } },
    { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#94a3b8' } },
    { id: 'e2-4', source: '2', target: '4', style: { stroke: '#94a3b8' } },
    { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#94a3b8' } },
    { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e4-6', source: '4', target: '6', style: { stroke: '#94a3b8' } },
    { id: 'e4-7', source: '4', target: '7', style: { stroke: '#94a3b8' } },
];

const ArchitectureApp = () => {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <div className="w-full h-full p-4 md:p-6 bg-slate-900 flex flex-col">
            <div className="mb-4 md:mb-6">
                <h3 className="text-2xl md:text-3xl font-bold title-gradient">System Architecture</h3>
                <p className="text-slate-400 text-xs md:text-sm mt-1">Interactive MERN Stack Architecture flow.</p>
            </div>
            <div className="flex-1 border border-slate-700/50 rounded-xl overflow-hidden bg-slate-950 shadow-inner min-h-[400px]">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    colorMode="dark"
                >
                    <Controls className="bg-slate-800 border-slate-700 fill-slate-200" />
                    <MiniMap
                        maskColor="rgba(15, 23, 42, 0.7)"
                        style={{ backgroundColor: '#020617' }}
                    />
                    <Background variant="dots" gap={12} size={1} color="#475569" />
                </ReactFlow>
            </div>
        </div>
    );
};

export default ArchitectureApp;
