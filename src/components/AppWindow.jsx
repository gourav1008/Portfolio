import { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useWindowManager } from '../context/useWindowManager';

const AppWindow = ({ id, title, children, defaultSize = { width: 800, height: 500 } }) => {
    const { apps, closeApp, minimizeApp, maximizeApp, focusApp } = useWindowManager();
    const app = apps.find(a => a.id === id);
    const dragControls = useDragControls();
    const windowRef = useRef(null);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const shouldMaximize = app.isMaximized || isMobile;

    if (!app || !app.isOpen || app.isMinimized) return null;

    const handlePointerDown = (e) => {
        if (isMobile) return;
        focusApp(id);
        dragControls.start(e);
    };

    return (
        <motion.div
            ref={windowRef}
            onPointerDown={() => focusApp(id)}
            drag={!shouldMaximize}
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                ...(shouldMaximize ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 56px)', x: 0, y: 0 } : { width: defaultSize.width, height: defaultSize.height })
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`absolute flex flex-col glass-panel overflow-hidden shadow-2xl border border-slate-700/50 ${shouldMaximize ? 'rounded-none border-0' : 'rounded-xl'}`}
            style={{ zIndex: app.zIndex }}
            onDoubleClick={() => !isMobile && maximizeApp(id)}
        >
            {/* Title Bar */}
            <div
                className={`flex items-center justify-between px-4 py-2 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 select-none ${isMobile ? '' : 'cursor-grab active:cursor-grabbing'}`}
                onPointerDown={handlePointerDown}
            >
                <div className="flex space-x-2">
                    <button onClick={(e) => { e.stopPropagation(); closeApp(id); }} className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20" />
                    {!isMobile && (
                        <>
                            <button onClick={(e) => { e.stopPropagation(); minimizeApp(id); }} className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors shadow-lg shadow-yellow-500/20" />
                            <button onClick={(e) => { e.stopPropagation(); maximizeApp(id); }} className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20" />
                        </>
                    )}
                </div>
                <div className={`text-slate-300 text-xs md:text-sm font-semibold tracking-wide flex-1 text-center pointer-events-none ${isMobile ? 'pr-4' : 'pr-12'}`}>
                    {title}
                </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-auto bg-slate-900/50 backdrop-blur-sm relative custom-scrollbar">
                {children}
            </div>
        </motion.div>
    );
};

export default AppWindow;
