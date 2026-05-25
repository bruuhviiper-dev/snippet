import { Head, Link } from '@inertiajs/react';
import Editor from '@monaco-editor/react';
import { Code, Copy } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Embed({ snippet, appUrl }) {
    const [isDark, setIsDark] = useState(true); // Default dark for embed
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(snippet.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-screen w-full flex flex-col bg-[#0d1117] text-[#c9d1d9] font-sans overflow-hidden">
            <Head>
                <title>{snippet.title}</title>
            </Head>

            {/* Embed Header */}
            <div className="h-12 border-b border-[#30363d] flex items-center justify-between px-4 bg-[#161b22] shrink-0">
                <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{snippet.language}</span>
                    <a href={`${appUrl}/s/${snippet.id}`} target="_blank" rel="noopener noreferrer" className="font-medium text-sm truncate hover:text-[#58a6ff] transition">
                        {snippet.title}
                    </a>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <button onClick={copyToClipboard} className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1">
                        {copied ? 'Copiado!' : <><Copy size={14} /> Copiar</>}
                    </button>
                    <a href={appUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition bg-[#21262d] px-2 py-1 rounded">
                        <Code size={12} className="text-[#A8FF3E]" /> SnippetVault
                    </a>
                </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 w-full bg-[#0d1117]">
                <Editor
                    height="100%"
                    language={snippet.language.toLowerCase()}
                    theme="vs-dark"
                    value={snippet.code}
                    options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 13,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        scrollBeyondLastLine: false,
                        padding: { top: 16, bottom: 16 },
                        lineNumbersMinChars: 3,
                    }}
                />
            </div>
        </div>
    );
}
