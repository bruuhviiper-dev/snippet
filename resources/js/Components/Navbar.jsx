import { Link, usePage } from '@inertiajs/react';
import { Code, Moon, Sun, Compass, LogIn, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar({ transparent = false }) {
    const { auth } = usePage().props;
    
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
        return 'light';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className={`p-6 flex justify-between items-center z-50 ${transparent ? 'absolute top-0 left-0 right-0' : 'border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md sticky top-0'}`}>
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-[#A8FF3E] text-slate-900 p-1.5 rounded-md">
                        <Code size={20} strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block text-slate-900 dark:text-white">SnippetVault</span>
                </Link>
            </div>

            <nav className="flex gap-4 items-center">
                <Link href={route('explore')} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent transition">
                    <Compass size={16} /> Marketplace
                </Link>
                <Link href={route('pricing')} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                    Preços
                </Link>
            </nav>
            <div className="flex items-center gap-4">
                <button 
                    onClick={toggleTheme} 
                    className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                {auth?.user ? (
                    <Link href={route('dashboard')} className="flex items-center gap-2 text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 transition">
                        <LayoutDashboard size={16} /> Dashboard
                    </Link>
                ) : (
                    <>
                        <Link href={route('login')} className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">
                            <LogIn size={16} /> Login
                        </Link>
                        <Link href={route('register')} className="flex items-center gap-2 text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 transition">
                            Começar grátis
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
