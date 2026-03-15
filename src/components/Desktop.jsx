import { motion } from 'framer-motion';
import { useWindowManager } from '../context/useWindowManager';
import Taskbar from './Taskbar';
import AppWindow from './AppWindow';
import DesktopWidget from './DesktopWidget';

import TerminalApp from '../apps/TerminalApp';
import ProjectsApp from '../apps/ProjectsApp';
import DevLabApp from '../apps/DevLabApp';
import ArchitectureApp from '../apps/ArchitectureApp';
import DashboardApp from '../apps/DashboardApp';
import TimelineApp from '../apps/TimelineApp';
import ResumeApp from '../apps/ResumeApp';
import ContactApp from '../apps/ContactApp';
import ApiDocsApp from '../apps/ApiDocsApp';
import GitHubApp from '../apps/GitHubApp';
import RecruiterApp from '../apps/RecruiterApp';

const AppsMap = {
    projects: ProjectsApp,
    terminal: TerminalApp,
    devlab: DevLabApp,
    architecture: ArchitectureApp,
    dashboard: DashboardApp,
    timeline: TimelineApp,
    resume: ResumeApp,
    contact: ContactApp,
    apidocs: ApiDocsApp,
    github: GitHubApp,
    recruiter: RecruiterApp,
};

const DOCK_APPS = [
    { id: 'projects', label: 'Projects', emoji: '📁' },
    { id: 'terminal', label: 'Terminal', emoji: '⌨️' },
    { id: 'dashboard', label: 'Metrics', emoji: '📊' },
    { id: 'github', label: 'GitHub', emoji: '🐙' },
    { id: 'apidocs', label: 'API Docs', emoji: '📖' },
    { id: 'devlab', label: 'DevLab', emoji: '🧪' },
    { id: 'architecture', label: 'Arch', emoji: '🗺️' },
    { id: 'contact', label: 'Contact', emoji: '✉️' },
];

const Desktop = () => {
    const { apps, openApp } = useWindowManager();
    const anyOpen = apps.some(a => a.isOpen);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#020617]">

            {/* ─── Background Layers ─── */}
            {/* Dot grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(rgba(99,102,241,0.18) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-transparent to-slate-950 pointer-events-none" />

            {/* Glowing orbs */}
            <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.4, 0.25] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)' }}
            />
            <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.35, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)' }}
            />
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.22, 0.1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)' }}
            />

            {/* ─── Hero Section (shown when no windows open) ─── */}
            {!anyOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
                    className="absolute inset-0 flex flex-col items-center justify-center pb-24 md:pb-20 pointer-events-none select-none px-6"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mb-4 md:mb-6 flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] md:text-xs font-semibold text-indigo-300 tracking-widest uppercase">Available for Work</span>
                    </motion.div>

                    {/* Name */}
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-none mb-4 text-center"
                        style={{ textShadow: '0 0 80px rgba(99,102,241,0.5)' }}>
                        Gourav Gupta
                    </h1>

                    {/* Role */}
                    <p className="text-lg sm:text-xl md:text-2xl font-medium mb-2 text-center"
                        style={{ background: 'linear-gradient(90deg, #818cf8, #c084fc, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Full-Stack Engineer &amp; Systems Thinker
                    </p>

                    {/* Tagline */}
                    <p className="text-slate-500 text-xs sm:text-sm md:text-base max-w-md text-center mt-2 leading-relaxed">
                        Building scalable MERN ecosystems, real-time systems, and beautiful developer experiences.
                    </p>

                    {/* Hint */}
                    <motion.p
                        animate={{ opacity: [0.4, 0.9, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="mt-8 md:mt-10 text-[10px] md:text-xs text-slate-600 tracking-widest uppercase"
                    >
                        ↓ Click an app below to explore
                    </motion.p>
                </motion.div>
            )}

            {/* ─── Desktop Dock (Left-center, vertical) ─── */}
            {!anyOpen && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="absolute left-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center space-y-3 z-10"
                >
                    {DOCK_APPS.map((item, i) => (
                        <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.07 + i * 0.05 }}
                            whileHover={{ scale: 1.2, x: 6 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openApp(item.id)}
                            className="group relative w-11 h-11 rounded-xl flex items-center justify-center text-xl
                                       bg-slate-800/60 border border-slate-700/60 backdrop-blur-md
                                       hover:bg-indigo-500/20 hover:border-indigo-500/50
                                       shadow-lg transition-colors duration-200"
                        >
                            {item.emoji}
                            <span className="absolute left-full ml-3 px-2.5 py-1 text-xs font-semibold text-white rounded-lg
                                opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap"
                                style={{
                                    background: 'linear-gradient(135deg,rgba(15,23,42,0.95),rgba(30,41,59,0.95))',
                                    border: '1px solid rgba(99,102,241,0.35)',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                                }}>
                                {item.label}
                            </span>
                        </motion.button>
                    ))}
                </motion.div>
            )}

            {/* ─── Mobile Dock (Bottom, just above Taskbar) ─── */}
            {!anyOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 flex md:hidden items-center space-x-3 px-4 py-2 bg-slate-900/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl z-10 overflow-x-auto no-scrollbar max-w-[90vw]"
                >
                    {DOCK_APPS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => openApp(item.id)}
                            className="flex-shrink-0 w-12 h-12 flex flex-col items-center justify-center space-y-1"
                        >
                            <span className="text-2xl">{item.emoji}</span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter truncate w-full text-center">{item.label}</span>
                        </button>
                    ))}
                </motion.div>
            )}

            {/* ─── Desktop Widgets (top-right) ─── */}
            <DesktopWidget />

            {/* ─── App Windows ─── */}
            {apps.map(app => {
                const AppContent = AppsMap[app.id] || (() => <div>Not Found</div>);
                return (
                    <AppWindow key={app.id} id={app.id} title={app.title}>
                        <AppContent />
                    </AppWindow>
                );
            })}

            {/* ─── Taskbar ─── */}
            <Taskbar />
        </div>
    );
};

export default Desktop;
