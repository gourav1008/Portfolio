import { useState } from 'react';
import {
    Download, ExternalLink, Mail, Phone, MapPin, Briefcase,
    GraduationCap, Code2, Award, Globe, Sparkles, ChevronDown, ChevronUp,
    Star, Zap, Database, Server, Layout, GitBranch
} from 'lucide-react';

// ── Data ────────────────────────────────────────────────────────────────────

const personal = {
    name: 'Gourav Gupta',
    title: 'MERN Stack Developer',
    location: 'Kolkata, West Bengal – 700067',
    phone: '906-464-8318',
    email: 'gourav8318@gmail.com',
    summary:
        'MERN Stack Developer with practical experience in crafting responsive, user-friendly web applications using MongoDB, Express.js, React.js, and Node.js. Skilled in problem-solving, teamwork, and writing clean, maintainable code. Enthusiastic about contributing to innovative projects and growing in a collaborative development environment.',
};

const experiences = [
    {
        role: 'Trainee Software Developer',
        company: 'Vais Engineering Pvt. Ltd.',
        period: 'Nov 2025 – Present',
        type: 'current',
        bullets: [
            'Assisted in developing and maintaining web application features using modern technologies.',
            'Improved application performance by optimizing code and debugging existing modules.',
            'Collaborated with senior developers to implement scalable and maintainable software solutions.',
            'Participated in testing and debugging processes to ensure application stability and reliability.',
        ],
    },
    {
        role: 'Web Developer',
        company: 'TalenIq Technologies Pvt. Ltd.',
        period: 'Apr 2025 – Oct 2024',
        type: 'past',
        bullets: [
            'Developed multiple web development projects, improving problem-solving skills.',
            'Assisted in debugging and optimizing application performance for better scalability.',
            'Integrated APIs and managed database operations.',
        ],
    },
    {
        role: 'MERN Stack Developer Intern',
        company: 'TalenIq Technologies Pvt. Ltd.',
        period: 'Oct 2024 – Mar 2025',
        type: 'past',
        bullets: [
            'Built and maintained full-stack web applications using the MERN stack.',
            'Created responsive user interfaces and reusable components.',
            'Developed reusable React components and responsive UI elements.',
            'Worked with MongoDB, Express.js, React.js, and Node.js for application development.',
        ],
    },
];

const education = [
    {
        degree: 'Bachelor of Computer Applications (BCA)',
        institution: 'Banwarilal Bhalotiya College',
        affiliation: 'Kazi Nazrul University',
        period: 'Aug 2021 – Aug 2024',
        detail: 'Built a strong foundation in web development, programming, and database systems through academic learning.',
    },
    {
        degree: 'Higher Secondary Education (WBCHSE)',
        institution: "Burnpur Boys' High School (H.S.)",
        period: 'Jul 2020 – Jul 2021',
        detail: 'Studied core subjects including Computer Applications and Mathematics, developing analytical and logical problem-solving skills.',
    },
];

const skillCategories = [
    {
        label: 'Frontend',
        icon: Layout,
        color: 'from-violet-500 to-indigo-500',
        tech: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    },
    {
        label: 'Backend',
        icon: Server,
        color: 'from-emerald-500 to-teal-500',
        tech: ['Node.js', 'Express.js', 'REST APIs', 'Authentication'],
    },
    {
        label: 'Database',
        icon: Database,
        color: 'from-amber-500 to-orange-500',
        tech: ['MongoDB', 'Mongoose', 'Database Design'],
    },
    {
        label: 'Tools & Others',
        icon: GitBranch,
        color: 'from-pink-500 to-rose-500',
        tech: ['Git', 'GitHub', 'VS Code', 'Postman', 'npm'],
    },
];

const certifications = [
    'MERN Stack Web Development Certification',
    'JavaScript Programming Certification',
];

const languages = [
    { lang: 'English', level: 'Professional' },
    { lang: 'Hindi', level: 'Fluent' },
    { lang: 'Bangla', level: 'Native' },
];

const interests = [
    'Learning Modern JavaScript Frameworks',
    'Exploring New Technologies',
    'Open Source Contributions',
    'System Architecture & Design',
];

// ── Sub-components ─────────────────────────────────────────────────────────

const SectionHeader = ({ icon: Icon, label, accent }) => (
    <div className="flex items-center gap-3 mb-5">
        <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br ${accent} shadow-lg`}
        >
            <Icon className="w-4.5 h-4.5 text-white" />
        </div>
        <h2 className="text-base font-bold text-white tracking-wide uppercase">{label}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-600 to-transparent" />
    </div>
);

const Badge = ({ text, color = 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' }) => (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${color}`}>{text}</span>
);

const TimelineDot = ({ type }) => (
    <div className="flex flex-col items-center">
        <div
            className={`w-3.5 h-3.5 rounded-full border-2 ${
                type === 'current'
                    ? 'bg-emerald-400 border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]'
                    : 'bg-indigo-500 border-indigo-400'
            }`}
        />
        <div className="w-px flex-1 bg-slate-700 mt-1" />
    </div>
);

// ── Main Component ─────────────────────────────────────────────────────────

const ResumeApp = () => {
    const [expandedExp, setExpandedExp] = useState(null);

    return (
        <div className="w-full h-full bg-slate-900/50 overflow-y-auto">
            {/* Ambient glow blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-3xl mx-auto px-4 py-8 space-y-5">

                {/* ── HERO HEADER ── */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl">
                    {/* gradient banner */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-slate-900/80 to-emerald-600/20 backdrop-blur-sm" />
                    
                    <div className="relative p-5 md:p-7 flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-5">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl">
                                <span className="text-2xl md:text-3xl font-black text-white select-none">GG</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-emerald-400 rounded-full border-2 border-slate-900 shadow-lg shadow-emerald-400/50" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                                <h1 className="text-xl md:text-2xl font-extrabold text-white">{personal.name}</h1>
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                            </div>
                            <p className="text-sm font-semibold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent mb-3">
                                {personal.title}
                            </p>

                            {/* Contact chips */}
                            <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-[10px] md:text-xs">
                                {[
                                    { icon: MapPin, text: personal.location },
                                    { icon: Mail, text: personal.email },
                                    { icon: Phone, text: personal.phone },
                                ].map(({ icon: Icon, text }) => (
                                    <span key={text} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 text-slate-300">
                                        <Icon className="w-3.5 h-3.5 text-indigo-400" />
                                        {text}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA buttons */}
                        <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0 w-full sm:w-auto">
                            <a
                                href="/src/assets/Gourav Gupta.pdf"
                                download="Gourav_Gupta_Resume.pdf"
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] md:text-xs font-semibold shadow-lg shadow-indigo-500/30 hover:opacity-90 transition-opacity"
                            >
                                <Download className="w-3.5 h-3.5" />
                                Download CV
                            </a>
                            <a
                                href="https://www.linkedin.com/in/gourav-gupta108/"
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2]/80 text-white text-[10px] md:text-xs font-semibold border border-[#0A66C2]/50 hover:bg-[#0A66C2] transition-colors"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    {/* Summary bar */}
                    <div className="relative mx-5 md:mx-7 mb-5 md:mb-7 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{personal.summary}</p>
                    </div>
                </div>

                {/* Grid for skills + other info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {/* ── SKILLS  (2/3 width) ── */}
                    <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
                        <SectionHeader icon={Code2} label="Technical Skills" accent="from-indigo-500 to-violet-500" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {skillCategories.map(({ label, icon: Icon, color, tech }) => (
                                <div key={label} className="rounded-xl bg-slate-800/50 border border-slate-700/40 p-4 hover:border-indigo-500/40 transition-colors">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${color} flex items-center justify-center`}>
                                            <Icon className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">{label}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {tech.map(t => (
                                            <span key={t} className="px-2 py-0.5 rounded-md bg-slate-700/60 border border-slate-600/40 text-slate-300 text-xs">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── SIDEBAR: Languages + Certs + Interests ── */}
                    <div className="space-y-4">
                        {/* Languages */}
                        <div className="glass-panel rounded-2xl p-5">
                            <SectionHeader icon={Globe} label="Languages" accent="from-sky-500 to-cyan-500" />
                            <div className="space-y-2.5">
                                {languages.map(({ lang, level }) => (
                                    <div key={lang} className="flex items-center justify-between">
                                        <span className="text-sm text-slate-200 font-medium">{lang}</span>
                                        <Badge text={level} color="bg-sky-500/10 text-sky-300 border-sky-500/30" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="glass-panel rounded-2xl p-5">
                            <SectionHeader icon={Award} label="Certifications" accent="from-amber-500 to-yellow-500" />
                            <ul className="space-y-2.5">
                                {certifications.map(c => (
                                    <li key={c} className="flex items-start gap-2 text-sm text-slate-300">
                                        <Star className="w-3.5 h-3.5 mt-0.5 text-amber-400 flex-shrink-0" />
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Interests */}
                        <div className="glass-panel rounded-2xl p-5">
                            <SectionHeader icon={Zap} label="Interests" accent="from-pink-500 to-rose-500" />
                            <div className="flex flex-wrap gap-2">
                                {interests.map(i => (
                                    <Badge key={i} text={i} color="bg-pink-500/10 text-pink-300 border-pink-500/30" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── WORK EXPERIENCE ── */}
                <div className="glass-panel rounded-2xl p-6">
                    <SectionHeader icon={Briefcase} label="Work Experience" accent="from-emerald-500 to-teal-500" />
                    <div className="space-y-0">
                        {experiences.map((exp, idx) => {
                            const isOpen = expandedExp === idx;
                            return (
                                <div key={idx} className="flex gap-4">
                                    <TimelineDot type={exp.type} />
                                    <div className="flex-1 pb-6 last:pb-0">
                                        <button
                                            onClick={() => setExpandedExp(isOpen ? null : idx)}
                                            className="w-full text-left group"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                                                            {exp.role}
                                                        </h3>
                                                        {exp.type === 'current' && (
                                                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/30 animate-pulse">
                                                                Current
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-indigo-400 font-medium mt-0.5">{exp.company}</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">{exp.period}</p>
                                                </div>
                                                <div className="flex-shrink-0 mt-1">
                                                    {isOpen
                                                        ? <ChevronUp className="w-4 h-4 text-slate-400" />
                                                        : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                                </div>
                                            </div>
                                        </button>

                                        {/* collapsible bullets */}
                                        {isOpen && (
                                            <ul className="mt-3 space-y-1.5 pl-1">
                                                {exp.bullets.map((b, bi) => (
                                                    <li key={bi} className="flex items-start gap-2 text-[13px] text-slate-400 leading-relaxed">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />
                                                        {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── EDUCATION ── */}
                <div className="glass-panel rounded-2xl p-6">
                    <SectionHeader icon={GraduationCap} label="Education" accent="from-violet-500 to-purple-600" />
                    <div className="space-y-4">
                        {education.map((edu, idx) => (
                            <div key={idx} className="flex gap-4 group">
                                <div className="flex flex-col items-center">
                                    <div className="w-3.5 h-3.5 rounded-full bg-violet-500 border-2 border-violet-400 flex-shrink-0 mt-1" />
                                    {idx < education.length - 1 && <div className="w-px flex-1 bg-slate-700 mt-1" />}
                                </div>
                                <div className="flex-1 pb-4 last:pb-0">
                                    <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                                    <p className="text-xs text-violet-400 font-medium mt-0.5">{edu.institution}</p>
                                    {edu.affiliation && (
                                        <p className="text-xs text-slate-500">{edu.affiliation}</p>
                                    )}
                                    <p className="text-xs text-slate-500 mt-0.5">{edu.period}</p>
                                    <p className="text-[12px] text-slate-400 mt-2 leading-relaxed">{edu.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* footer */}
                <div className="text-center pb-4">
                    <p className="text-xs text-slate-600">
                        Built with ❤️ · Last updated March 2026
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResumeApp;
