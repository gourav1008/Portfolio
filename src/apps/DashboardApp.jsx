import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, CartesianGrid } from 'recharts';
import { Activity, Code2, Zap, Timer, Server, Database, Globe } from 'lucide-react';

const apiResponseData = [
    { time: '00:00', ms: 120 }, { time: '04:00', ms: 135 }, { time: '08:00', ms: 210 },
    { time: '12:00', ms: 380 }, { time: '16:00', ms: 240 }, { time: '20:00', ms: 160 },
    { time: '24:00', ms: 115 }
];

const commitActivity = [
    { name: 'Mon', commits: 12 }, { name: 'Tue', commits: 19 }, { name: 'Wed', commits: 3 },
    { name: 'Thu', commits: 25 }, { name: 'Fri', commits: 32 }, { name: 'Sat', commits: 8 },
    { name: 'Sun', commits: 14 }
];

const techData = [
    { name: 'React', usage: 92 }, { name: 'Node.js', usage: 85 }, { name: 'MongoDB', usage: 78 },
    { name: 'AWS/Docker', usage: 65 }, { name: 'TypeScript', usage: 80 }
];

const StatCard = ({ title, value, subtext, icon: Icon, colorClass }) => (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600/50 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-white">{value}</h3>
            </div>
            <div className={`p-2 rounded-lg bg-slate-900/50 border border-slate-700/30 ${colorClass}`}>
                <Icon className="w-5 h-5" />
            </div>
        </div>
        <p className="text-xs text-slate-500 font-medium">{subtext}</p>
    </div>
);

const LighthouseScore = ({ metric, score, color }) => (
    <div className="flex flex-col items-center p-4 bg-slate-900/50 rounded-lg border border-slate-800">
        <div className="relative mb-2">
            <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="175.9" strokeDashoffset={175.9 - (175.9 * score) / 100} className={color} strokeLinecap="round" />
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${color}`}>
                {score}
            </div>
        </div>
        <span className="text-xs font-semibold text-slate-400 text-center uppercase tracking-wider">{metric}</span>
    </div>
);

const DashboardApp = () => {
    return (
        <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-[#0a0f1c] overflow-y-auto font-sans text-slate-200">
            <div className="mb-6 md:mb-8 border-b border-slate-800 pb-4 md:pb-6 flex items-center space-x-3">
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" />
                <div>
                    <h1 className="text-xl md:text-3xl font-bold text-white">Engineering Metrics</h1>
                    <p className="text-slate-400 mt-1 text-xs md:text-sm">Real-time performance stats, architectural health, and activity.</p>
                </div>
            </div>

            {/* Core Codebase Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                <StatCard title="Total Lines of Code" value="142k+" subtext="Across 14 microservices & SPAs" icon={Code2} colorClass="text-indigo-400" />
                <StatCard title="Active Endpoints" value="128" subtext="REST & GraphQL combined" icon={Server} colorClass="text-emerald-400" />
                <StatCard title="Uptime (90 Days)" value="99.98%" subtext="Automated multi-region failover" icon={Zap} colorClass="text-amber-400" />
                <StatCard title="Avg Bundle Size" value="142kb" subtext="Gzipped, dynamically chunked" icon={Database} colorClass="text-purple-400" />
            </div>

            {/* Lighthouse & Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
                <div className="lg:col-span-1 bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6 flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-blue-400" />
                        Lighthouse Audit
                    </h3>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <LighthouseScore metric="Performance" score={96} color="text-emerald-500" />
                        <LighthouseScore metric="Accessibility" score={100} color="text-emerald-500" />
                        <LighthouseScore metric="Practices" score={95} color="text-emerald-500" />
                        <LighthouseScore metric="SEO" score={100} color="text-emerald-500" />
                    </div>
                </div>

                <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                        <h3 className="text-base md:text-lg font-semibold text-white flex items-center">
                            <Timer className="w-5 h-5 mr-2 text-orange-400" />
                            API Response Latency (24h)
                        </h3>
                        <span className="text-[10px] md:text-xs font-semibold bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/30">
                            P95: 240ms
                        </span>
                    </div>
                    <div className="h-40 md:h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={apiResponseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorMs" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                                    itemStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="ms" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorMs)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Commit Activity & Language Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold text-white mb-6">Weekly Commit Frequency</h3>
                    <div className="h-48 md:h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={commitActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#1e293b' }}
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                                />
                                <Bar dataKey="commits" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold text-white mb-6">Language Utilization</h3>
                    <div className="h-48 md:h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={techData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} width={70} />
                                <Tooltip
                                    cursor={{ fill: '#1e293b' }}
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                                />
                                <Bar dataKey="usage" fill="#10b981" radius={[0, 4, 4, 0]} barSize={15} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardApp;
