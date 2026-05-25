import React from 'react';

const icons = {
    javascript: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 3h18v18H3V3zm11.71 13.91c-.48-.44-.8-.92-.8-1.55h-1.92c.04.9.44 1.62 1.12 2.15.68.53 1.55.77 2.5.77 1.15 0 2.05-.3 2.68-.86.6-.54.9-1.28.9-2.12 0-.82-.24-1.46-.73-1.93-.47-.44-1.27-.85-2.35-1.2l-.7-.22c-.65-.2-.98-.44-1.12-.66-.1-.17-.15-.4-.15-.65 0-.44.17-.8.5-1.07.33-.28.78-.42 1.34-.42.54 0 1 .15 1.32.44.33.28.53.68.58 1.18h1.83c-.05-.88-.4-1.6-1-2.13-.6-.54-1.43-.8-2.48-.8-1.1 0-1.98.28-2.62.82-.64.55-.97 1.3-.97 2.18 0 .8.25 1.44.75 1.9.48.45 1.3.87 2.45 1.25l.65.2c.75.25 1.14.53 1.3.8.12.2.18.46.18.77 0 .5-.2.92-.58 1.22-.4.32-.93.48-1.6.48-.7 0-1.28-.18-1.68-.53zm-5.74 1.32c-.52-.52-.82-1.25-.86-2.1h-1.9c.04 1.35.5 2.4 1.34 3.06.84.66 1.96 1 3.32 1 1.48 0 2.6-.33 3.34-1 .73-.66 1.1-1.6 1.1-2.8V9h-2v5.8c0 .65-.17 1.16-.5 1.5-.33.34-.84.5-1.5.5s-1.16-.16-1.5-.5z"/></svg>,
    typescript: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 3h18v18H3V3zm10 9h5v-1h-5v1zm0-3h5V8h-5v1zm0 6h5v-1h-5v1zM7 8H5v8h2v-3h1.5v3H10V8H7zm1.5 3.5H7v-2h1.5v2z"/></svg>,
    python: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-11c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-4 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/></svg>,
    php: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2H7v2H5v-6h6v6zm5 0h-2v-6h4c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2v2zm0-4h2v-2h-2v2z"/></svg>,
    react: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm0-5a3 3 0 110-6 3 3 0 010 6z"/></svg>,
    docker: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M4 11h2v2H4zm4 0h2v2H8zm4 0h2v2h-2zm4 0h2v2h-2zm-8-3h2v2H8zm4 0h2v2h-2zm4-3h2v2h-2zM4 14h16c1.1 0 2 .9 2 2 0 1.66-1.34 3-3 3H5c-1.66 0-3-1.34-3-3 0-1.1.9-2 2-2z"/></svg>,
    css: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M5 3l1.5 17L12 22l5.5-2L19 3H5zm11 5h-7.5l.3 3H15l-.5 5.5-2.5 1-2.5-1-.2-2.5h2l.1 1 1 .5 1-.5.2-2.5H8.5l-.6-6H16l-.2 2z"/></svg>,
    html: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M4 3l1.5 17L12 22l6.5-2L20 3H4zm11 5H9.5l-.3-3H16l-.5 5.5-3.5 1-3.5-1-.2-2.5h2l.1 1 1.5 .5 1.5-.5.2-2.5H8.5l.3-3H15l.2 2z"/></svg>,
    csharp: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 14H7v-4H5V8h4v8zm6 0h-2v-2h-2v-2h2v-2h-2V8h4v8zm-2-4h2v2h-2v-2z"/></svg>,
    go: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H9V8h4c1.1 0 2 .9 2 2v1h-2V9h-2v5h2v-1h2v3z"/></svg>,
    sql: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 14H7v-4H5V8h4v8zm6 0h-2V8h2v8zm4 0h-4V8h2v6h2v2z"/></svg>,
    java: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M11 20.3s1.5 1.7 4 1.7 4-1.7 4-1.7v-2s-1.5 1.7-4 1.7-4-1.7-4-1.7v2zm5-18.3c0 .5-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1zm-4 0c0 .5-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1zm8.3 12c.5 0 1-.4 1-1s-.4-1-1-1c-1 0-1.5-.5-2-1v-1.5c0-.8-.7-1.5-1.5-1.5h-5.5c-.8 0-1.5.7-1.5 1.5v1.5c-.5.5-1.5 1-2 1-1.4 0-2.5 1.1-2.5 2.5v1.5c0 1.4 1.1 2.5 2.5 2.5 1.5 0 2.5-.5 3-1h7.5c1.4 0 2.5-1.1 2.5-2.5zm-15.5 0c0-.8.7-1.5 1.5-1.5.3 0 .5 0 .7.1v2.8c-.2.1-.4.1-.7.1-.8 0-1.5-.7-1.5-1.5z"/></svg>,
    ruby: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2L2 9l10 13L22 9l-10-7zm0 3.5L17.5 9 12 18.5 6.5 9 12 5.5z"/></svg>,
    rust: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.8 14.8l-1.3-.8c.4-.7.6-1.5.6-2.4 0-1-.3-1.8-.7-2.5l1.3-.8a6.5 6.5 0 0 1 .9 3.2 6.5 6.5 0 0 1-.8 3.3zM12 17.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm-4.7-2.7l1.3-.8c-.4-.7-.6-1.5-.6-2.4 0-1 .3-1.8.7-2.5l-1.3-.8A6.5 6.5 0 0 0 6.5 12a6.5 6.5 0 0 0 .8 3.3z"/></svg>
};

const colors = {
    javascript: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/30',
    typescript: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10 border-blue-300 dark:border-blue-500/30',
    python: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30',
    php: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10 border-purple-300 dark:border-purple-500/30',
    react: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-300 dark:border-cyan-500/30',
    docker: 'text-blue-600 bg-blue-50 dark:bg-blue-600/10 border-blue-300 dark:border-blue-600/30',
    css: 'text-sky-500 bg-sky-50 dark:bg-sky-500/10 border-sky-300 dark:border-sky-500/30',
    html: 'text-orange-500 bg-orange-50 dark:bg-orange-500/10 border-orange-300 dark:border-orange-500/30',
    csharp: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-300 dark:border-indigo-500/30',
    go: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-600/10 border-cyan-300 dark:border-cyan-600/30',
    sql: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-300 dark:border-rose-500/30',
    bash: 'text-slate-700 bg-slate-100 dark:text-slate-300 dark:bg-slate-700/30 border-slate-300 dark:border-slate-600',
    java: 'text-orange-600 bg-orange-50 dark:bg-orange-600/10 border-orange-300 dark:border-orange-600/30',
    ruby: 'text-red-500 bg-red-50 dark:bg-red-500/10 border-red-300 dark:border-red-500/30',
    rust: 'text-amber-700 bg-amber-50 dark:bg-amber-700/10 border-amber-300 dark:border-amber-700/30',
    default: 'text-slate-600 bg-slate-50 dark:text-slate-300 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
};

const TagBadge = ({ name }) => {
    if (!name) return null;
    const safeName = String(name);
    // Generate a random-ish but consistent color based on string length and first char
    const colorOptions = [
        'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/50',
        'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-200 dark:border-fuchsia-800/50',
        'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800/50',
        'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800/50',
        'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50',
        'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/50'
    ];
    
    const index = (safeName.length + safeName.charCodeAt(0)) % colorOptions.length;
    const style = colorOptions[index];

    return (
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${style}`}>
            {name}
        </span>
    );
};

export default function LanguageBadge({ language, className = "" }) {
    if (!language) return null;
    const lang = language.toLowerCase();
    
    // Fallbacks
    let normalized = lang;
    if (lang === 'js') normalized = 'javascript';
    if (lang === 'ts') normalized = 'typescript';
    if (lang === 'py') normalized = 'python';
    if (lang === 'c#' || lang === 'c-sharp') normalized = 'csharp';
    
    const icon = icons[normalized] || <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>;
    const colorStyle = colors[normalized] || colors.default;

    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold tracking-wide uppercase ${colorStyle} ${className}`}>
            {icon}
            {language}
        </div>
    );
}

export const LanguageIcon = ({ language, className = "w-4 h-4" }) => {
    if (!language) return null;
    const lang = language.toLowerCase();
    
    let normalized = lang;
    if (lang === 'js') normalized = 'javascript';
    if (lang === 'ts') normalized = 'typescript';
    if (lang === 'py') normalized = 'python';
    if (lang === 'c#' || lang === 'c-sharp') normalized = 'csharp';
    
    const baseIcon = icons[normalized] || <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>;
    
    return React.cloneElement(baseIcon, { className });
};

export { TagBadge };
