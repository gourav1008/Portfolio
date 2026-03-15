import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, Settings, PenTool, LayoutTemplate, Bug, Code2, Rocket } from 'lucide-react';

// Reusable SVG Server Icon
const Server = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><rect width="20" height="8" x="2" y="14" rx="2" ry="2" /><line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" /></svg>;

const JOURNEY_DATA = [
    { year: '2022', title: 'The Beginning', desc: 'Started journey with HTML, CSS, & Vanilla JS. Built first static sites.' },
    { year: '2023', title: 'React Mastery', desc: 'Dived deep into React ecosystem, Hooks, and State Management using Redux.' },
    { year: '2024', title: 'MERN & Full-Stack', desc: 'Mastered Node.js, Express, and MongoDB. Built authentication and APIs.' },
    { year: '2025+', title: 'System Design & OS', desc: 'Designing distributed systems, microservices, and interactive Web OS ecosystems.' }
];

const WORKFLOW_STEPS = [
    { id: 1, title: 'Requirements & Architecture', desc: 'I start by defining database schemas (MongoDB), API routes, and planning the React component tree.', icon: LayoutTemplate, color: 'text-blue-400' },
    { id: 2, title: 'Backend Foundation', desc: 'Setting up Node.js/Express, creating Mongoose models, and writing JWT authentication middleware.', icon: Server, color: 'text-emerald-400' },
    { id: 3, title: 'Frontend UI/UX', desc: 'Scaffolding Vite React apps, configuring Tailwind plugins, and building responsive mobile-first layouts.', icon: PenTool, color: 'text-purple-400' },
    { id: 4, title: 'State & Real-time Integration', desc: 'Wiring up React Context, integrating REST APIs, and establishing Socket.io duplex connections.', icon: Settings, color: 'text-orange-400' },
    { id: 5, title: 'Testing & Optimization', desc: 'Running Jest unit tests, profiling React renders, and optimizing Lighthouse performance scores.', icon: Bug, color: 'text-red-400' },
    { id: 6, title: 'CI/CD Deployment', desc: 'Dockerizing applications, setting up GitHub Actions, and deploying to AWS/Vercel with SSL.', icon: Rocket, color: 'text-indigo-400' }
];

const CHANGELOG = [
    { version: 'v2.1.0', date: 'March 2026', type: 'feature', changes: ['Launched DevOS 2.0 with GitHub API integration.', 'Added Postman-style API Docs and live performance metrics.', 'Upgraded Tailwind configuration to v4 paradigms.'] },
    { version: 'v1.4.2', date: 'February 2026', type: 'patch', changes: ['Fixed recursive @apply CSS compilation errors.', 'Resolved Node.js server EADDRINUSE port conflicts.'] },
    { version: 'v1.0.0', date: 'January 2026', type: 'release', changes: ['Initial release of DevOS.', 'Built draggable WindowManager context and taskbar.', 'Integrated xterm.js for authentic terminal emulation.'] }
];

const TimelineApp = () => {
    const [activeTab, setActiveTab] = useState('workflow'); // 'journey', 'workflow', 'changelog'

    return (
        <div className="w-full h-full p-5 md:p-8 bg-[#0a0f1c] text-slate-200 overflow-y-auto font-sans flex flex-col">

            {/* Header & Tabs */}
            <div className="mb-6 md:mb-8 border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-3 mb-4 md:mb-6">
                    <Code2 className="w-6 h-6 md:w-8 md:h-8 text-indigo-500" />
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Engineering Process</h1>
                </div>

                <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-lg w-full md:w-fit overflow-x-auto no-scrollbar">
                    <button onClick={() => setActiveTab('workflow')} className={`flex-1 md:flex-none px-3 md:px-4 py-2 text-[10px] md:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'workflow' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}>How I Build</button>
                    <button onClick={() => setActiveTab('journey')} className={`flex-1 md:flex-none px-3 md:px-4 py-2 text-[10px] md:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'journey' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}>Journey</button>
                    <button onClick={() => setActiveTab('changelog')} className={`flex-1 md:flex-none px-3 md:px-4 py-2 text-[10px] md:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'changelog' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}>Changelog</button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 relative">
                <AnimatePresence mode="wait">

                    {/* WORKFLOW TAB */}
                    {activeTab === 'workflow' && (
                        <motion.div key="workflow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="max-w-4xl">
                            <h2 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6">Development Workflow</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {WORKFLOW_STEPS.map((step) => {
                                    const Icon = step.icon;
                                    return (
                                        <div key={step.id} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 md:p-6 flex flex-col h-full hover:border-indigo-500/30 transition-colors">
                                            <div className="flex items-center space-x-3 mb-3 md:mb-4">
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-700 shrink-0">
                                                    <Icon className={`w-4 h-4 md:w-5 md:h-5 ${step.color}`} />
                                                </div>
                                                <h3 className="text-base md:text-lg font-bold text-slate-200">Phase {step.id}: {step.title}</h3>
                                            </div>
                                            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* JOURNEY TAB */}
                    {activeTab === 'journey' && (
                        <motion.div key="journey" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="max-w-3xl ml-3 md:ml-8">
                            <h2 className="text-lg md:text-xl font-semibold text-white mb-6 md:mb-8">Professional Journey</h2>
                            <div className="relative border-l-2 border-slate-700 space-y-8 md:space-y-12">
                                {JOURNEY_DATA.map((item) => (
                                    <div key={item.year} className="relative pl-6 md:pl-8">
                                        <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-indigo-500 border-4 border-[#0a0f1c]" />
                                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 md:p-6 shadow-lg">
                                            <span className="px-2 py-0.5 md:px-3 md:py-1 bg-indigo-500/20 text-indigo-400 rounded-md text-[10px] md:text-xs font-bold mb-3 md:mb-4 inline-block tracking-wider">
                                                {item.year}
                                            </span>
                                            <h4 className="text-lg md:text-xl font-bold text-white mb-1.5 md:mb-2">{item.title}</h4>
                                            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* CHANGELOG TAB */}
                    {activeTab === 'changelog' && (
                        <motion.div key="changelog" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="max-w-4xl">
                            <h2 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6">Release History</h2>
                            <div className="space-y-4 md:space-y-6">
                                {CHANGELOG.map((log, idx) => (
                                    <div key={idx} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 md:p-6 relative overflow-hidden">
                                        {/* Version Badge */}
                                        <div className="flex items-center justify-between mb-4 border-b border-slate-700/50 pb-4">
                                            <div className="flex items-center space-x-2 md:space-x-3">
                                                <span className="text-xl md:text-2xl font-bold text-white tracking-tight">{log.version}</span>
                                                <span className={`px-1.5 py-0.5 text-[8px] md:text-[10px] uppercase font-bold rounded border ${log.type === 'feature' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                                                    log.type === 'patch' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                                                        'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                                                    }`}>
                                                    {log.type}
                                                </span>
                                            </div>
                                            <span className="text-[10px] md:text-sm text-slate-500 font-medium">{log.date}</span>
                                        </div>

                                        {/* Change List */}
                                        <ul className="space-y-2 md:space-y-3">
                                            {log.changes.map((change, i) => (
                                                <li key={i} className="flex items-start text-xs md:text-sm text-slate-300">
                                                    <GitCommit className="w-4 h-4 md:w-5 md:h-5 mr-3 text-slate-500 shrink-0 mt-0.5" />
                                                    <span className="leading-relaxed">{change}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

export default TimelineApp;
