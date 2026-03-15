import { useState } from 'react';
import { Lock, Globe, Server } from 'lucide-react';

const ApiDocsApp = () => {
    const [activeEndpoint, setActiveEndpoint] = useState('login');

    const endpoints = {
        login: {
            method: 'POST',
            url: '/api/auth/login',
            tag: 'Authentication',
            desc: 'Authenticate user and receive a JWT token.',
            body: `{\n  "email": "gourav@example.com",\n  "password": "your_password"\n}`,
            response: `{\n  "success": true,\n  "token": "eyJhbGciOiJIUzI1NiIsInR..."\n}`
        },
        contact: {
            method: 'POST',
            url: '/api/contact',
            tag: 'Communication',
            desc: 'Submit a message through the contact form.',
            body: `{\n  "name": "Jane Doe",\n  "email": "jane@example.com",\n  "message": "Hi Gourav!"\n}`,
            response: `{\n  "success": true,\n  "message": "Message sent successfully!"\n}`
        },
        projects: {
            method: 'GET',
            url: '/api/projects',
            tag: 'Portfolio',
            desc: 'Retrieve the active list of portfolio case studies and metrics.',
            body: `// No body required for GET`,
            response: `{\n  "success": true,\n  "data": [\n    {\n      "id": 1,\n      "title": "E-Commerce",\n      ...\n    }\n  ]\n}`
        }
    };

    const getMethodColor = (method) => {
        switch (method) {
            case 'GET': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'POST': return 'bg-green-500/20 text-green-400 border-green-500/30';
            default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    const activeData = endpoints[activeEndpoint];

    return (
        <div className="flex flex-col md:flex-row h-full bg-[#0a0f1c] text-slate-200 font-sans">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-[#0f172a]/50 p-4 shrink-0 flex flex-col space-y-4 md:space-y-6 overflow-y-auto max-h-[30vh] md:max-h-full">
                <div>
                    <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4 flex items-center space-x-2 text-white">
                        <Server className="w-5 h-5 text-indigo-500" />
                        <span>API Reference</span>
                    </h2>
                    <p className="hidden md:block text-xs text-slate-400 leading-relaxed mb-6">
                        Explore the RESTful endpoints powering the DevOS portfolio and admin dashboards.
                    </p>
                </div>

                <div>
                    <h3 className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 md:mb-3 px-2">Endpoints</h3>
                    <div className="flex md:flex-col gap-1 overflow-x-auto no-scrollbar md:space-y-1">
                        {Object.entries(endpoints).map(([key, data]) => (
                            <button
                                key={key}
                                onClick={() => setActiveEndpoint(key)}
                                className={`whitespace-nowrap md:w-full text-left px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors flex items-center space-x-3 shrink-0
                  ${activeEndpoint === key ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'}`}
                            >
                                <span className={`text-[8px] md:text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${getMethodColor(data.method)} border`}>
                                    {data.method}
                                </span>
                                <span className="truncate">{data.url}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Documentation Area */}
            <div className="flex-1 overflow-y-auto p-5 md:p-8 relative scroll-smooth">
                <div className="max-w-4xl mx-auto">

                    <div className="mb-6 md:mb-8 flex items-center space-x-3">
                        <span className="px-2.5 py-0.5 md:px-3 md:py-1 bg-slate-800 text-slate-300 rounded-full text-[10px] md:text-xs font-medium border border-slate-700">
                            {activeData.tag}
                        </span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 flex items-center space-x-3 break-all md:break-normal">
                        <span>{activeData.url}</span>
                    </h1>

                    <p className="text-base md:text-lg text-slate-400 mb-8 md:mb-10 leading-relaxed">
                        {activeData.desc}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        {/* Request Specification */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 border-b border-slate-700/50 pb-2">Request Overview</h3>
                                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 md:p-4 font-mono text-xs md:text-sm overflow-x-auto text-slate-300">
                                    <span className={`font-bold mr-2 ${getMethodColor(activeData.method).split(' ')[1]}`}>{activeData.method}</span>
                                    {activeData.url}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 border-b border-slate-700/50 pb-2">Authentication</h3>
                                <div className="flex items-center space-x-2 text-xs md:text-sm text-slate-400 bg-slate-800/30 p-2.5 md:p-3 rounded-lg border border-slate-700/50">
                                    {activeData.url.includes('auth') || activeData.url.includes('contact') ? (
                                        <>
                                            <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
                                            <span>Public Endpoint.</span>
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-4 h-4 text-amber-500 shrink-0" />
                                            <span>Protected - Requires <code className="text-amber-400 bg-slate-900 px-1 rounded">JWT</code></span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Code Samples (Stripe Style) */}
                        <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
                            <div className="bg-[#1e293b] px-4 py-2 border-b border-slate-700/50 flex space-x-4 text-[10px] md:text-xs font-mono text-slate-400 shrink-0">
                                <button className="text-indigo-400 border-b-2 border-indigo-500 pb-2 -mb-2">cURL Example</button>
                                <button className="hover:text-slate-200 transition-colors">Node.js</button>
                            </div>
                            <div className="p-4 overflow-y-auto flex-1 text-xs md:text-sm font-mono leading-relaxed">
                                <div className="mb-4">
                                    <p className="text-slate-500 mb-2 font-semibold uppercase text-[10px]">Body</p>
                                    <pre className="text-emerald-400 bg-[#020617] p-3 rounded-md border border-slate-800 overflow-x-auto selection:bg-indigo-500/30">
                                        {activeData.body}
                                    </pre>
                                </div>
                                <div>
                                    <p className="text-slate-500 mb-2 flex justify-between font-semibold uppercase text-[10px]">
                                        <span>Response</span>
                                        <span className="text-green-500 shrink-0">200 OK</span>
                                    </p>
                                    <pre className="text-indigo-300 bg-[#020617] p-3 rounded-md border border-slate-800 overflow-x-auto selection:bg-indigo-500/30">
                                        {activeData.response}
                                    </pre>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiDocsApp;
