import { useState, useEffect } from 'react';
import { Github, GitCommit, GitPullRequest, Star, GitBranch, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_ACTIVITY = [
    { id: 1, type: 'commit', repo: 'gourav-devos', message: 'Enhance DevOS Desktop with API Docs module', time: '2 hours ago', hash: 'a1b2c3d' },
    { id: 2, type: 'commit', repo: 'gourav-devos', message: 'Fix window drag constraints in Physics Lab', time: '5 hours ago', hash: 'e4f5g6h' },
    { id: 3, type: 'pr', repo: 'mern-ecommerce-core', message: 'Feature: Implement Redis caching layer for product queries', time: '1 day ago', status: 'Merged' },
    { id: 4, type: 'star', repo: 'socketio/socket.io', message: 'Starred socketio/socket.io', time: '2 days ago' },
    { id: 5, type: 'commit', repo: 'react-native-app', message: 'Update navigation types and authentication flow', time: '3 days ago', hash: 'i7j8k9l' },
];

const GitHubApp = () => {
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGitHubActivity = async () => {
            try {
                // Change 'gourav-gupta' to actual username if different
                const res = await fetch('https://api.github.com/users/gourav-gupta/events', {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });

                if (!res.ok) throw new Error('API Rate Limit Exceeded or error');

                const data = await res.json();

                const parsedActivity = data.slice(0, 10).map((event, index) => {
                    let type, message, hash, status;

                    if (event.type === 'PushEvent') {
                        type = 'commit';
                        message = event.payload.commits[0]?.message || 'Pushed commits';
                        hash = event.payload.commits[0]?.sha.substring(0, 7);
                    } else if (event.type === 'PullRequestEvent') {
                        type = 'pr';
                        message = event.payload.pull_request?.title || 'Pull Request opened/merged';
                        status = event.payload.action === 'closed' ? 'Merged' : 'Opened';
                    } else if (event.type === 'WatchEvent') {
                        type = 'star';
                        message = `Starred ${event.repo.name}`;
                    } else {
                        type = 'commit'; // Fallback icon
                        message = `Performed ${event.type.replace('Event', '')}`;
                    }

                    return {
                        id: event.id + index,
                        type,
                        repo: event.repo.name,
                        message,
                        time: new Date(event.created_at).toLocaleDateString(),
                        hash,
                        status
                    };
                });

                setActivities(parsedActivity.length > 0 ? parsedActivity : MOCK_ACTIVITY);
            } catch (error) {
                console.warn("Falling back to MOCK_ACTIVITY due to API error.", error);
                setActivities(MOCK_ACTIVITY);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGitHubActivity();
    }, []);

    return (
        <div className="w-full h-full bg-[#0d1117] text-[#c9d1d9] overflow-y-auto font-sans">
            {/* Header Profile Area */}
            <div className="border-b border-[#30363d] bg-[#161b22] p-5 md:p-6 lg:p-8 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-1 shrink-0 shadow-lg">
                    <div className="w-full h-full rounded-full bg-[#0d1117] flex items-center justify-center relative overflow-hidden">
                        <Github className="w-10 h-10 md:w-12 md:h-12 text-[#c9d1d9]" />
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-1.5 md:space-y-2">
                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">Gourav Gupta</h1>
                    <p className="text-[#8b949e] text-base md:text-lg">gourav-gupta • Full Stack Engineer</p>
                    <p className="text-[#c9d1d9] text-sm md:text-base max-w-xl mx-auto md:mx-0">Building scalable MERN ecosystems. Passionate about real-time protocols and interactive UI.</p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 pt-2 text-[10px] md:text-sm text-[#8b949e]">
                        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> 124 Stars</span>
                        <span className="flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" /> 42 Repos</span>
                    </div>
                </div>

                <a href="https://github.com/gourav-gupta" target="_blank" rel="noreferrer" className="w-full md:w-auto px-4 py-2 bg-[#21262d] border border-[#30363d] rounded-md text-xs md:text-sm font-medium hover:bg-[#30363d] transition-colors flex items-center justify-center gap-2">
                    <Github className="w-4 h-4" />
                    Follow
                </a>
            </div>

            <div className="p-5 md:p-6 lg:p-8 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                {/* Main Activity Feed */}
                <div className="lg:col-span-2 space-y-4 md:space-y-6">
                    <h2 className="text-lg md:text-xl font-semibold mb-4 text-white border-b border-[#30363d] pb-2 flex items-center justify-between">
                        Recent Activity
                        {isLoading && <Loader2 className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 animate-spin" />}
                    </h2>

                    <div className="relative border-l border-[#30363d] ml-3 space-y-6 md:space-y-8 pb-4">
                        {activities.map((activity, index) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={activity.id}
                                className="relative pl-6 md:pl-8 bg-transparent"
                            >
                                {/* Timeline Node Icon */}
                                <div className="absolute -left-3 top-0 md:-left-3.5 w-6 h-6 md:w-7 md:h-7 bg-[#161b22] border border-[#30363d] rounded-full flex items-center justify-center shadow-sm">
                                    {activity.type === 'commit' && <GitCommit className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#a371f7]" />}
                                    {activity.type === 'pr' && <GitPullRequest className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#3fb950]" />}
                                    {activity.type === 'star' && <Star className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#e3b341]" />}
                                </div>

                                <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 md:p-4 shadow-sm hover:border-[#8b949e]/50 transition-colors">
                                    <div className="flex justify-between items-start mb-2 gap-2">
                                        <span className="text-[#8b949e] text-[10px] md:text-xs font-medium">{activity.time}</span>
                                        <div className="flex gap-1.5 shrink-0">
                                            {activity.hash && <span className="text-[#a371f7] text-[10px] md:text-xs font-mono bg-[#a371f7]/10 px-1.5 py-0.5 rounded">{activity.hash}</span>}
                                            {activity.status && <span className="text-[#3fb950] text-[10px] md:text-xs font-medium bg-[#3fb950]/10 px-1.5 py-0.5 rounded border border-[#3fb950]/20">{activity.status}</span>}
                                        </div>
                                    </div>
                                    <p className="text-[#c9d1d9] text-xs md:text-sm font-medium leading-snug mb-1">{activity.message}</p>
                                    <a href="#" className="text-[#58a6ff] hover:underline text-xs md:text-sm font-semibold truncate block">{activity.repo}</a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Status & Contribution Grid */}
                <div className="space-y-6">
                    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5">
                        <h3 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wide mb-4">Contribution Graph (Mock)</h3>
                        <div className="grid grid-cols-7 gap-1">
                            {[...Array(35)].map((_, i) => {
                                // Generate random colors representing commit frequency
                                const rand = Math.random();
                                let colorClass = 'bg-[#161b22] border border-[#30363d]';
                                if (rand > 0.8) colorClass = 'bg-[#39d353]';
                                else if (rand > 0.6) colorClass = 'bg-[#26a641]';
                                else if (rand > 0.4) colorClass = 'bg-[#006d32]';
                                else if (rand > 0.2) colorClass = 'bg-[#0e4429]';

                                return <div key={i} className={`w-full aspect-square rounded-[2px] ${colorClass}`} />;
                            })}
                        </div>
                        <div className="flex justify-between items-center mt-3 text-xs text-[#8b949e]">
                            <span>Less</span>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 bg-[#161b22] border border-[#30363d] rounded-[2px]" />
                                <div className="w-3 h-3 bg-[#0e4429] rounded-[2px]" />
                                <div className="w-3 h-3 bg-[#006d32] rounded-[2px]" />
                                <div className="w-3 h-3 bg-[#26a641] rounded-[2px]" />
                                <div className="w-3 h-3 bg-[#39d353] rounded-[2px]" />
                            </div>
                            <span>More</span>
                        </div>
                        <p className="text-center text-[#c9d1d9] text-sm mt-4 font-medium">1,248 contributions in the last year</p>
                    </div>

                    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5">
                        <h3 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wide mb-4">Current Focus</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#f1e05a]" /> JavaScript / TypeScript core</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#3178c6]" /> Real-time System Architecture</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#563d7c]" /> Framer Motion & Interactive UI</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GitHubApp;
