import { Code } from 'lucide-react';

export default function ApplicationLogo(props) {
    return (
        <div {...props} className={`flex items-center gap-2 ${props.className}`}>
            <div className="bg-accent text-slate-900 p-1.5 rounded-md flex-shrink-0">
                <Code size={24} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">SnippetVault</span>
        </div>
    );
}
