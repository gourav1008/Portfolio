import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

const ContactApp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
                setErrorMessage(data.error || 'Something went wrong. Please try again.');
            }
        } catch {
            setStatus('error');
            setErrorMessage('Failed to connect to the server.');
        }
    };

    return (
        <div className="w-full h-full p-4 md:p-8 bg-slate-900 overflow-y-auto flex items-center justify-center">
            <div className="w-full max-w-lg bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700/50 shadow-2xl relative overflow-hidden">

                {/* Success Overlay */}
                {status === 'success' && (
                    <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center animate-fade-in p-6">
                        <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-green-500 mb-4" />
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-slate-400 text-center text-sm md:text-base mb-6">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition text-sm font-medium"
                        >
                            Send Another
                        </button>
                    </div>
                )}

                <h2 className="text-2xl md:text-3xl font-bold title-gradient mb-2">Get In Touch</h2>
                <p className="text-slate-400 text-sm md:text-base mb-6 md:mb-8 leading-relaxed">Have an opportunity or just want to say hi? Drop a message below.</p>

                {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start space-x-3 text-red-500">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p className="text-sm">{errorMessage}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary resize-none"
                            placeholder="Your message here..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-medium py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center space-x-2">
                            <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
                            {status !== 'loading' && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactApp;
