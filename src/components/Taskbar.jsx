import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '../context/useWindowManager';
import { Terminal, FolderGit2, FlaskConical, Network, LayoutDashboard, CalendarClock, FileType2, Mail, Github, Database } from 'lucide-react';

const ICONS = {
    projects: FolderGit2,
    terminal: Terminal,
    devlab: FlaskConical,
    architecture: Network,
    dashboard: LayoutDashboard,
    timeline: CalendarClock,
    resume: FileType2,
    contact: Mail,
    apidocs: Database,
    github: Github
};

const AppButton = ({ app, openApp, focusApp, minimizeApp }) => {
    const [hovered, setHovered] = useState(false);
    const Icon = ICONS[app.id] || Terminal;
    const isActive = app.isOpen && !app.isMinimized;

    return (
        <div
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Tooltip */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.92 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute bottom-full mb-3 px-3 py-1.5 rounded-lg text-xs font-semibold text-white whitespace-nowrap pointer-events-none z-[100]"
                        style={{
                            background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.95) 100%)',
                            border: '1px solid rgba(99,102,241,0.35)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        {app.title}
                        {/* Arrow */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 -bottom-[5px] w-2.5 h-2.5 rotate-45"
                            style={{
                                background: 'rgba(30,41,59,0.95)',
                                border: '1px solid rgba(99,102,241,0.35)',
                                borderTop: 'none',
                                borderLeft: 'none',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Icon Button */}
            <motion.button
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                onClick={() => {
                    if (app.isOpen) {
                        if (app.isMinimized) focusApp(app.id);
                        else minimizeApp(app.id);
                    } else {
                        openApp(app.id);
                    }
                }}
                className={`p-2 rounded-lg transition-colors duration-200 relative
                    ${app.isOpen ? 'bg-slate-800/80 hover:bg-slate-700' : 'hover:bg-slate-800/50'}`}
            >
                <Icon className={`w-5 h-5 ${app.isOpen ? 'text-indigo-400' : 'text-slate-400'}`} />

                {/* Active dot indicator */}
                {app.isOpen && (
                    <motion.div
                        layoutId={`dot-${app.id}`}
                        className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isActive ? 'bg-indigo-400' : 'bg-slate-500'}`}
                    />
                )}
            </motion.button>
        </div>
    );
};

const Taskbar = () => {
    const { apps, openApp, focusApp, minimizeApp } = useWindowManager();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute bottom-0 left-0 right-0 h-14 md:h-12 bg-slate-900/80 backdrop-blur-md border-t border-slate-700/50 flex items-center justify-between px-2 md:px-4 z-50">
            <div className="flex items-center space-x-0.5 md:space-x-1 overflow-x-auto no-scrollbar py-1">
                {apps.map(app => (
                    <AppButton
                        key={app.id}
                        app={app}
                        openApp={openApp}
                        focusApp={focusApp}
                        minimizeApp={minimizeApp}
                    />
                ))}
            </div>

            <div className="text-[10px] md:text-sm font-medium text-slate-300 flex items-center space-x-2 md:space-x-4 ml-2 flex-shrink-0">
                <span className="hidden sm:inline">Gourav OS v2.0</span>
                <span className="bg-slate-800/50 px-2 py-0.5 rounded md:bg-transparent md:p-0">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
};

export default Taskbar;
