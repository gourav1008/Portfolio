import { useState } from 'react';
import WindowManagerContext from './WindowManagerContext';

export const WindowManagerProvider = ({ children }) => {
    const [apps, setApps] = useState([
        { id: 'projects', title: 'Projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
        { id: 'terminal', title: 'Terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
        { id: 'devlab', title: 'DevLab', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
        { id: 'architecture', title: 'Architecture', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
        { id: 'dashboard', title: 'Dashboard', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
        { id: 'timeline', title: 'Engineering Process', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
        { id: 'resume', title: 'Resume', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
        { id: 'contact', title: 'Contact', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
        { id: 'apidocs', title: 'API Docs', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
        { id: 'github', title: 'GitHub', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
        { id: 'recruiter', title: 'Recruiter Quick View', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    ]);

    const [activeZIndex, setActiveZIndex] = useState(1);

    const openApp = (id) => {
        setApps((prev) => prev.map(app => {
            if (app.id === id) {
                return { ...app, isOpen: true, isMinimized: false, isMaximized: true, zIndex: activeZIndex + 1 };
            }
            return app;
        }));
        setActiveZIndex(prev => prev + 1);
    };

    const closeApp = (id) => {
        setApps((prev) => prev.map(app => app.id === id ? { ...app, isOpen: false } : app));
    };

    const minimizeApp = (id) => {
        setApps((prev) => prev.map(app => app.id === id ? { ...app, isMinimized: true } : app));
    };

    const maximizeApp = (id) => {
        setApps((prev) => prev.map(app => app.id === id ? { ...app, isMaximized: !app.isMaximized, isMinimized: false } : app));
        setActiveZIndex(prev => prev + 1); // Bring to front when maximizing
    };

    const focusApp = (id) => {
        setApps((prev) => prev.map(app => {
            if (app.id === id) {
                return { ...app, zIndex: activeZIndex + 1, isMinimized: false };
            }
            return app;
        }));
        setActiveZIndex(prev => prev + 1);
    };

    return (
        <WindowManagerContext.Provider value={{ apps, openApp, closeApp, minimizeApp, maximizeApp, focusApp }}>
            {children}
        </WindowManagerContext.Provider>
    );
};
