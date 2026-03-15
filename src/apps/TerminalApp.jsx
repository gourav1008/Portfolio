import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import 'xterm/css/xterm.css';
import { useWindowManager } from '../context/useWindowManager';

const TerminalApp = () => {
    const terminalRef = useRef(null);
    const xtermRef = useRef(null);
    const { openApp } = useWindowManager();

    useEffect(() => {
        if (!terminalRef.current) return;

        const isMobile = window.innerWidth < 768;

        const term = new XTerm({
            cursorBlink: true,
            theme: {
                background: '#0F172A',
                foreground: '#F8FAFC',
                cursor: '#22C55E',
            },
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: isMobile ? 12 : 14,
            rows: isMobile ? 15 : 20,
        });

        xtermRef.current = term;
        term.open(terminalRef.current);
        term.writeln('\x1b[1;32mWelcome to Gourav OS v1.0 terminal.\x1b[0m');
        term.writeln('Type "help" for a list of available commands.');
        term.write('\r\n\x1b[1;34mvisitor@gourav\x1b[0m:\x1b[1;36m~\x1b[0m$ ');

        let currentInput = '';

        const processCommand = (cmd, t) => {
            if (!cmd) return;
            switch (cmd.toLowerCase()) {
                case 'help':
                    t.writeln('\x1b[1;33mAvailable commands:\x1b[0m');
                    t.writeln('  help      - Show this help message');
                    t.writeln('  about     - About Gourav');
                    t.writeln('  projects  - Open Projects App');
                    t.writeln('  devlab    - Open Developer Lab');
                    t.writeln('  github    - Open GitHub Profile');
                    t.writeln('  clear     - Clear terminal screen');
                    break;
                case 'about':
                    t.writeln('Hi, I am \x1b[1;32mGourav Gupta\x1b[0m, a MERN Stack Developer.');
                    t.writeln('I build professional, production-ready OS portfolios and applications.');
                    break;
                case 'projects':
                    t.writeln('Opening Projects App...');
                    openApp('projects');
                    break;
                case 'devlab':
                    t.writeln('Opening DevLab App...');
                    openApp('devlab');
                    break;
                case 'github':
                    t.writeln('Opening GitHub profile...');
                    window.open('https://github.com/gourav', '_blank');
                    break;
                case 'clear':
                    t.clear();
                    break;
                default:
                    t.writeln(`\x1b[31mCommand not found:\x1b[0m ${cmd}`);
                    break;
            }
        };

        const disposable = term.onData((data) => {
            const code = data.charCodeAt(0);
            if (code === 13) { // Enter
                term.write('\r\n');
                processCommand(currentInput.trim(), term);
                currentInput = '';
                term.write('\x1b[1;34mvisitor@gourav\x1b[0m:\x1b[1;36m~\x1b[0m$ ');
            } else if (code === 127 || data === '\b') { // Backspace
                if (currentInput.length > 0) {
                    term.write('\b \b');
                    currentInput = currentInput.slice(0, currentInput.length - 1);
                }
            } else {
                term.write(data);
                currentInput += data;
            }
        });

        return () => {
            disposable.dispose();
            term.dispose();
        };
    }, [openApp]);

    return (
        <div className="w-full h-full p-2 md:p-4 bg-[#0F172A] overflow-hidden">
            <div ref={terminalRef} className="w-full h-full custom-scrollbar" />
        </div>
    );
};

export default TerminalApp;
