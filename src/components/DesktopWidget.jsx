import { useState, useEffect } from 'react';
import { Terminal, Cpu, Cloud, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWindowManager } from '../context/useWindowManager';

const DesktopWidget = () => {
    const { openApp } = useWindowManager();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-6 right-6 w-80 hidden md:flex flex-col space-y-4 z-0 pointer-events-none"
        >
            {/* Clock Widget */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5 shadow-2xl pointer-events-auto">
                <div className="text-4xl font-bold text-white tracking-tight font-mono">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-sm text-slate-400 font-medium mt-1">
                    {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Developer Status Widget */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5 shadow-2xl pointer-events-auto">
                <div className="flex items-center space-x-2 mb-4 border-b border-slate-700/50 pb-3">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">System Status</h3>
                    <span className="ml-auto flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex items-center text-xs text-slate-400 mb-1">
                            <Cpu className="w-3.5 h-3.5 mr-1.5" />
                            <span>Current Focus</span>
                        </div>
                        <p className="text-sm font-medium text-white truncate">MERN Ecosystems & scaling</p>
                    </div>

                    <div>
                        <div className="flex items-center text-xs text-slate-400 mb-1">
                            <Zap className="w-3.5 h-3.5 mr-1.5" />
                            <span>Learning</span>
                        </div>
                        <p className="text-sm font-medium text-white truncate">System Architecture & WebSockets</p>
                    </div>

                    <div>
                        <div className="flex items-center text-xs text-slate-400 mb-1">
                            <Cloud className="w-3.5 h-3.5 mr-1.5" />
                            <span>Last Deployment</span>
                        </div>
                        <p className="text-sm font-medium text-white truncate flex items-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                            Production (2 hrs ago)
                        </p>
                    </div>
                </div>
            </div>

            {/* Recruiter Quick View Button */}
            <div className="pointer-events-auto mt-4">
                <button
                    onClick={() => openApp('recruiter')}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center space-x-2 border border-indigo-400/30"
                >
                    <Zap className="w-5 h-5 text-yellow-300" />
                    <span>Recruiter Quick View</span>
                </button>
            </div>
        </motion.div>
    );
};

export default DesktopWidget;
