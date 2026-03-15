import { useWindowManager } from '../context/useWindowManager';
import { Code, Terminal, Server, Globe, CheckCircle2, ExternalLink, Mail, Zap } from 'lucide-react';


const RecruiterApp = () => {
    const { openApp } = useWindowManager();

    return (
        <div className="w-full h-full bg-[#0a0f1c] text-slate-200 overflow-y-auto p-5 md:p-8 font-sans">
            <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 md:p-8 gap-6 md:gap-0">
                    <div className="flex flex-col md:flex-row items-center text-center md:text-left space-y-4 md:space-y-0 md:space-x-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-500/20 border border-indigo-500/40 rounded-full flex items-center justify-center shadow-lg shrink-0">
                            <span className="text-2xl md:text-3xl font-bold title-gradient">GG</span>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1 md:mb-2">Gourav Gupta</h1>
                            <p className="text-indigo-400 text-base md:text-lg font-medium flex items-center justify-center md:justify-start">
                                <Code className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Full-Stack Engineer
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-auto space-y-3">
                        <button onClick={() => openApp('resume')} className="flex items-center justify-center px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-indigo-500/25">
                            <ExternalLink className="w-4 h-4 mr-2" /> Resume
                        </button>
                        <button onClick={() => openApp('contact')} className="flex items-center justify-center px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600/50 text-white text-sm font-semibold rounded-lg transition-colors">
                            <Mail className="w-4 h-4 mr-2" /> Contact Me
                        </button>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {[
                        { label: 'Experience', value: '1+ Years', icon: Zap, color: 'text-yellow-400' },
                        { label: 'Arch Focus', value: 'MERN Stack', icon: Server, color: 'text-green-400' },
                        { label: 'Commits', value: '1.2k+', icon: Terminal, color: 'text-purple-400' },
                        { label: 'Relocate', value: 'Yes', icon: Globe, color: 'text-blue-400' },
                    ].map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center">
                                <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color} mb-2`} />
                                <span className="text-xl md:text-2xl font-bold text-white mb-0.5 md:mb-1">{stat.value}</span>
                                <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest">{stat.label}</span>
                            </div>
                        )
                    })}
                </div>

                {/* Value Proposition */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-2">Why Hire Me? (30 Second Pitch)</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                            <p className="text-slate-300 text-sm leading-relaxed"><strong>System Architecture Mindset.</strong> I don&apos;t just write React components. I build scalable backend endpoints, design efficient MongoDB schemas, and architect real-time WebSocket communication flows.</p>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                            <p className="text-slate-300 text-sm leading-relaxed"><strong>UI / UX Obsessed.</strong> I combine logic with aesthetics. As seen in this DevOS portfolio, I prioritize fluid animations, micro-interactions, and pixel-perfect design systems using TailwindCSS and Framer Motion.</p>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                            <p className="text-slate-300 text-sm leading-relaxed"><strong>Rapid Learner & Shipper.</strong> I thrive in fast-paced environments, continuously adapting to modern tooling (Vite, Next.js, Docker) and deploying optimized, production-ready code.</p>
                        </li>
                    </ul>
                </div>

                {/* Top Projects Quick Links */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Top Engineering Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div onClick={() => openApp('projects')} className="bg-slate-800/80 hover:bg-slate-700/80 transition-colors cursor-pointer border border-slate-700 p-5 rounded-xl group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150" />
                            <div className="flex justify-between items-start mb-2 relative z-10">
                                <h3 className="font-bold text-white">E-Commerce Architecture</h3>
                                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
                            </div>
                            <p className="text-xs text-slate-400 mb-4 relative z-10">Microservices based e-commerce backend handling auth, carts, and Redis caching.</p>
                            <div className="flex space-x-2 relative z-10">
                                <span className="px-2 py-0.5 bg-[#020617] text-xs rounded border border-slate-700">Node.js</span>
                                <span className="px-2 py-0.5 bg-[#020617] text-xs rounded border border-slate-700">MongoDB</span>
                            </div>
                        </div>

                        <div onClick={() => openApp('projects')} className="bg-slate-800/80 hover:bg-slate-700/80 transition-colors cursor-pointer border border-slate-700 p-5 rounded-xl group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -ml-10 -mt-10 transition-transform group-hover:scale-150" />
                            <div className="flex justify-between items-start mb-2 relative z-10">
                                <h3 className="font-bold text-white">DevOS 2.0 (This site)</h3>
                                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
                            </div>
                            <p className="text-xs text-slate-400 mb-4 relative z-10">A fully functional developer operating system simulating a production environment.</p>
                            <div className="flex space-x-2 relative z-10">
                                <span className="px-2 py-0.5 bg-[#020617] text-xs rounded border border-slate-700">React</span>
                                <span className="px-2 py-0.5 bg-[#020617] text-xs rounded border border-slate-700">Framer</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RecruiterApp;
