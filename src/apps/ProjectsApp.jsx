import { useState } from 'react';
import { FolderGit2, ExternalLink, Github, ChevronLeft, Layout, Database, Network, Cpu, AlertTriangle, Lightbulb, TrendingUp, Settings, Server } from 'lucide-react';

const MOCK_PROJECTS = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'A full-stack scalable e-commerce microservices platform built with MERN.',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Docker'],
        liveUrl: 'https://github.com/gourav',
        githubUrl: 'https://github.com/gourav',
        caseStudy: {
            overview: 'A complete end-to-end e-commerce solution designed to handle high traffic spikes, managing inventory, orders, and user authentication seamlessly.',
            userStory: 'As a customer, I want to browse products, add them to a real-time cart, and securely checkout so that my orders are processed instantly.',
            problem: 'The legacy system struggled with concurrent database writes during flash sales, resulting in overselling and extreme database load.',
            architecture: 'Migrated from a monolithic Node.js app to a microservices architecture. Auth, Inventory, and Order services run independently. Frontend communicates via an API Gateway.',
            database: `Schema Design:
- Users (Index: email, role)
- Products (Index: category, price, textSearch)
- Orders (References: User ID, Array of Product refs, total, status)`,
            api: `API Structure:
POST /api/orders (Creates atomic transaction for inventory lock)
GET /api/products?cache=true (Hits Redis first, falls back to Mongo)`,
            solution: 'Implemented a Redis caching layer for product catalogs (95% cache hit rate). Used MongoDB transactions for atomic inventory decrementing during checkout.',
            performance: 'Reduced average API response time from 800ms to 45ms. Lighthouse score improved to 96 (Performance), 100 (SEO).',
            challenges: 'Managing distributed transactions across Microservices without locking the system completely.',
            learned: 'Deep understanding of CAP theorem trade-offs and when to favor eventual consistency.',
            future: 'Implementing Kafka for robust horizontal event-driven event sourcing between services.'
        }
    },
    {
        id: 2,
        title: 'Real-time Chat App',
        description: 'WebSocket based messaging app with typing indicators and read receipts.',
        techStack: ['React', 'Socket.io', 'Node.js', 'Tailwind CSS', 'JWT'],
        liveUrl: 'https://github.com/gourav',
        githubUrl: 'https://github.com/gourav',
        caseStudy: {
            overview: 'A real-time messaging clone utilizing bi-directional WebSockets to deliver sub-100ms message latency.',
            userStory: 'As a user, I want to instantly message friends, see when they are typing, and know when they have read my message.',
            problem: 'HTTP polling for messages was causing massive server CPU load and artificial message delays.',
            architecture: 'Express backend serving REST for auth, and a dedicated Socket.io server utilizing Namespaces and Rooms for segregated chat channels.',
            database: `Schema Design:
- Users
- Conversations (Array of Participant User IDs)
- Messages (Content, Sender ID, Conversation ID, timestamp, isRead)`,
            api: `API & WS Structure:
REST: POST /api/auth/login -> Returns JWT
WS: emit('join_room', convId)
WS: emit('send_message', payload) -> broadcasts to room`,
            solution: 'Replaced long-polling with persistent WebSockets. Validated JWT tokens natively during the Socket handshake to ensure secure transmission.',
            performance: 'Dropped server CPU usage by 70%. Reduced latency from 1.5s (polling) to ~80ms (WebSockets).',
            challenges: 'Handling client disconnects gracefully and syncing offline messages upon reconnection.',
            learned: 'Managing complex real-time react context state and scaling WebSockets using Redis Adapters.',
            future: 'Implementing end-to-end encryption (E2EE) using the Web Crypto API.'
        }
    },
    {
        id: 3,
        title: 'DevOS Portfolio',
        description: 'An interactive professional OS-style developer ecosystem.',
        techStack: ['React', 'Framer Motion', 'Tailwind CSS', 'Vite'],
        liveUrl: 'https://github.com/gourav',
        githubUrl: 'https://github.com/gourav',
        caseStudy: {
            overview: 'A premium, highly interactive portfolio designed to mimic a professional developer platform rather than a static resume.',
            userStory: 'As a recruiter, I want to explore Gourav\'s technical depth through an engaging, interactive UI that proves his engineering skills instantly.',
            problem: 'Standard scrolling portfolios fail to demonstrate deep system architecture knowledge or complex UI state management.',
            architecture: 'Client-side React SPA leveraging a robust WindowManager Context to handle infinite layering (z-index), dragging bounds, and app lifecycle.',
            database: `Schema Design (Mocked locally):
- AppState (id, isOpen, isMinimized, zIndex)
- WidgetConfig (Weather, Time, System Metrics)`,
            api: `API Structure:
Frontend strictly parses local state, utilizing a unified Map object to dynamically render components on the Desktop surface.`,
            solution: 'Engineered a custom Window Manager hook. Passed application states down via standard Context. Used Framer Motion for hardware-accelerated drag physics.',
            performance: 'Achieved 60fps animations by offloading drag transforms to the GPU and avoiding deep React tree re-renders.',
            challenges: 'Ensuring absolute positioned windows did not break mobile responsive views or cause overflow issues.',
            learned: 'Complex DOM layering, generic component mappings, and optimizing React Context for high-frequency updates.',
            future: 'Connecting the terminal app to a real remote SSH backend or integrating an overarching WebAssembly (WASM) compiler.'
        }
    }
];

const CaseStudySection = ({ title, icon: Icon, children, colorClass }) => (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm hover:border-slate-600/50 transition-colors">
        <h3 className={`text-xl font-bold mb-4 flex items-center space-x-2 ${colorClass}`}>
            <Icon className="w-5 h-5" />
            <span>{title}</span>
        </h3>
        <div className="text-slate-300 leading-relaxed space-y-3">
            {children}
        </div>
    </div>
);

const ProjectsApp = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    if (selectedProject) {
        return (
            <div className="w-full h-full bg-[#0a0f1c] text-slate-200 overflow-y-auto font-sans relative">

                {/* Header Back Button & Banner */}
                <div className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-3 md:p-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-3">
                    <button
                        onClick={() => setSelectedProject(null)}
                        className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium text-sm md:text-base mr-auto md:mr-0"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span>Back to Projects</span>
                    </button>
                    <div className="flex space-x-3 w-full md:w-auto">
                        <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-1.5 md:py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-md hover:bg-indigo-600/30 transition-colors text-xs md:text-sm font-semibold">
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                        </a>
                        <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-1.5 md:py-2 bg-slate-800 text-white border border-slate-700 rounded-md hover:bg-slate-700 transition-colors text-xs md:text-sm font-semibold">
                            <Github className="w-4 h-4" />
                            <span>Source Code</span>
                        </a>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto p-5 md:p-8 py-8 md:py-12">
                    {/* Project Title Block */}
                    <div className="mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 md:mb-4 tracking-tight">{selectedProject.title}</h1>
                        <p className="text-lg md:text-xl text-slate-400 mb-4 md:mb-6 max-w-3xl leading-relaxed">{selectedProject.caseStudy.overview}</p>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {selectedProject.techStack.map(tech => (
                                <span key={tech} className="px-2.5 py-0.5 md:px-3 md:py-1 bg-slate-800 text-slate-300 text-xs md:text-sm font-medium rounded-full border border-slate-700">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Engineering Deep Dive */}
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 border-b border-slate-800 pb-2">Engineering Case Study</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                        <CaseStudySection title="Problem Statement" icon={AlertTriangle} colorClass="text-red-400">
                            <p className="text-sm md:text-base">{selectedProject.caseStudy.problem}</p>
                        </CaseStudySection>

                        <CaseStudySection title="Solution & Implementation" icon={Lightbulb} colorClass="text-emerald-400">
                            <p className="text-sm md:text-base">{selectedProject.caseStudy.solution}</p>
                        </CaseStudySection>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
                        <CaseStudySection title="System Architecture" icon={Network} colorClass="text-purple-400">
                            <p className="text-sm md:text-base">{selectedProject.caseStudy.architecture}</p>
                        </CaseStudySection>

                        <CaseStudySection title="Database Design" icon={Database} colorClass="text-blue-400">
                            <pre className="text-[10px] md:text-xs font-mono text-slate-400 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
                                {selectedProject.caseStudy.database}
                            </pre>
                        </CaseStudySection>

                        <CaseStudySection title="API Structure" icon={Server} colorClass="text-orange-400">
                            <pre className="text-[10px] md:text-xs font-mono text-slate-400 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
                                {selectedProject.caseStudy.api}
                            </pre>
                        </CaseStudySection>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                        <CaseStudySection title="Performance Metrics" icon={TrendingUp} colorClass="text-green-400">
                            <p className="text-sm md:text-base">{selectedProject.caseStudy.performance}</p>
                        </CaseStudySection>

                        <CaseStudySection title="Challenges Faced" icon={Cpu} colorClass="text-yellow-400">
                            <p className="text-sm md:text-base">{selectedProject.caseStudy.challenges}</p>
                        </CaseStudySection>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <CaseStudySection title="Lessons Learned" icon={Layout} colorClass="text-indigo-400">
                            <p className="text-sm md:text-base">{selectedProject.caseStudy.learned}</p>
                        </CaseStudySection>

                        <CaseStudySection title="Future Improvements" icon={Settings} colorClass="text-slate-400">
                            <p className="text-sm md:text-base">{selectedProject.caseStudy.future}</p>
                        </CaseStudySection>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-5 md:p-8 bg-[#0a0f1c] text-slate-200 overflow-y-auto font-sans">
            <div className="flex flex-col mb-8 md:mb-10 border-b border-slate-800 pb-6">
                <div className="flex items-center space-x-3 mb-2">
                    <FolderGit2 className="w-6 h-6 md:w-8 md:h-8 text-indigo-500" />
                    <h1 className="text-2xl md:text-3xl font-bold title-gradient">Engineering Projects</h1>
                </div>
                <p className="text-slate-400 text-xs md:text-sm max-w-2xl">A collection of full-stack ecosystems, highlighting system architecture, database design, and real-time performance optimization.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-8">
                {MOCK_PROJECTS.map(project => (
                    <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="group flex flex-col bg-slate-800/30 border border-slate-700/50 hover:border-indigo-500/50 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/10 backdrop-blur-sm"
                    >
                        {/* Mock Image Header */}
                        <div className="h-28 md:h-32 bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700/50 relative overflow-hidden group-hover:from-indigo-900/40 group-hover:to-slate-900 transition-colors">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                            <div className="absolute top-4 left-4 p-2 bg-slate-900/80 rounded border border-slate-700">
                                <CodeIcon className="w-5 h-5 md:w-6 md:h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                            </div>
                        </div>

                        <div className="p-5 md:p-6 flex flex-col flex-1">
                            <h2 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-indigo-400 transition-colors">{project.title}</h2>
                            <p className="text-slate-400 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed flex-1">{project.description}</p>

                            <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
                                {project.techStack.slice(0, 4).map(tech => (
                                    <span key={tech} className="text-[10px] md:text-xs px-2 py-0.5 md:px-2.5 md:py-1 bg-slate-900/80 text-slate-300 font-medium rounded border border-slate-700/50">
                                        {tech}
                                    </span>
                                ))}
                                {project.techStack.length > 4 && (
                                    <span className="text-[10px] md:text-xs px-2 py-0.5 md:px-2.5 md:py-1 bg-slate-900/80 text-slate-300 font-medium rounded border border-slate-700/50">
                                        +{project.techStack.length - 4}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// SVG helper
const CodeIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;

export default ProjectsApp;
