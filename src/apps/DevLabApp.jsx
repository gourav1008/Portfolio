import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { Send, FlaskConical, Move } from 'lucide-react';

const DevLabApp = () => {
    const [activeTab, setActiveTab] = useState('websocket');

    return (
        <div className="flex flex-col md:flex-row h-full bg-slate-900 text-slate-200">
            {/* Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900/50 p-4 shrink-0 flex flex-col space-y-2">
                <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4 flex items-center space-x-2 title-gradient">
                    <FlaskConical className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    <span>DevLab</span>
                </h2>

                <div className="flex md:flex-col gap-2">
                    <button
                        onClick={() => setActiveTab('websocket')}
                        className={`flex-1 md:max-h-12 w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors flex items-center space-x-2 text-xs md:text-sm font-medium ${activeTab === 'websocket' ? 'bg-primary/20 text-primary border border-primary/20' : 'hover:bg-slate-800 text-slate-400'}`}
                    >
                        <span>Real-time Chat</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('physics')}
                        className={`flex-1 md:max-h-12 w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors flex items-center space-x-2 text-xs md:text-sm font-medium ${activeTab === 'physics' ? 'bg-primary/20 text-primary border border-primary/20' : 'hover:bg-slate-800 text-slate-400'}`}
                    >
                        <span>Physics & Drag</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto bg-[#020617] relative">
                {activeTab === 'websocket' && <WebSocketLab />}
                {activeTab === 'physics' && <PhysicsLab />}
            </div>
        </div>
    );
};

const WebSocketLab = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Attempt connection
        const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        socketRef.current = io(socketUrl, {
            transports: ['websocket', 'polling']
        });

        socketRef.current.on('connect', () => setIsConnected(true));
        socketRef.current.on('disconnect', () => setIsConnected(false));

        socketRef.current.on('devlab_message', (data) => {
            setMessages(prev => [...prev, data]);
            setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        });

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim() && isConnected) {
            socketRef.current.emit('devlab_message', {
                id: Date.now(),
                text: input.trim(),
                sender: 'Visitor'
            });
            setInput('');
        }
    };

    return (
        <div className="h-full flex flex-col p-4 md:p-6">
            <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">WebSocket Chat Demo</h3>
                <p className="text-xs md:text-sm text-slate-400">
                    Status: <span className={isConnected ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                        {isConnected ? 'Connected' : 'Disconnected (Start backend server)'}
                    </span>
                </p>
            </div>

            <div className="flex-1 border border-slate-700 rounded-xl bg-slate-800/30 overflow-y-auto p-3 md:p-4 mb-4 flex flex-col space-y-3">
                {messages.length === 0 && (
                    <div className="flex-1 flex items-center justify-center text-slate-500 h-full text-xs md:text-sm">
                        No messages yet. Say hello!
                    </div>
                )}
                {messages.map((msg, i) => (
                    <div key={i} className="bg-primary/20 border border-primary/30 self-end mr-2 px-3 md:px-4 py-1.5 md:py-2 rounded-2xl rounded-tr-sm max-w-[85%]">
                        <p className="text-[10px] md:text-sm font-semibold text-primary/80 mb-0.5 md:mb-1">{msg.sender}</p>
                        <p className="text-xs md:text-base">{msg.text}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="flex space-x-2 md:space-x-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    disabled={!isConnected}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={!isConnected || !input.trim()}
                    className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary text-white p-2.5 md:p-3 rounded-lg flex items-center justify-center transition-colors px-4 md:px-6"
                >
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                </button>
            </form>
        </div>
    );
};

const PhysicsLab = () => {
    const containerRef = useRef(null);

    return (
        <div className="h-full flex flex-col p-4 md:p-6 relative overflow-hidden">
            <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Advanced Framer Motion</h3>
                <p className="text-xs md:text-sm text-slate-400">Drag these geometric shapes around. You can throw them and they will bounce off walls.</p>
            </div>

            <div ref={containerRef} className="flex-1 border border-slate-700 rounded-xl bg-slate-800/30 relative overflow-hidden">
                <motion.div
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0.2}
                    whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                    className="absolute top-10 md:top-20 left-10 md:left-20 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-primary to-purple-500 rounded-2xl flex items-center justify-center cursor-grab shadow-xl border border-white/20"
                >
                    <Move className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </motion.div>

                <motion.div
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0.5}
                    whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                    className="absolute top-24 md:top-40 left-32 md:left-60 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-accent to-emerald-500 rounded-full flex items-center justify-center cursor-grab shadow-xl border border-white/20"
                >
                    <Move className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </motion.div>

                <motion.div
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0.1}
                    whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                    className="absolute top-48 md:top-60 left-10 md:left-20 w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center cursor-grab shadow-xl border border-white/20"
                    style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                >
                    <Move className="w-4 h-4 md:w-6 md:h-6 text-white mt-3 md:mt-4" />
                </motion.div>
            </div>
        </div>
    );
};

export default DevLabApp;
