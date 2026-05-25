import { Head, Link } from '@inertiajs/react';
import { Code, Zap, Shield, Sparkles, ChevronRight, Check } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0D0D0D] text-slate-900 dark:text-white font-sans selection:bg-accent selection:text-slate-900">
            <Head title="SnippetVault - O Cofre Inteligente do seu Código" />
            
            <Navbar transparent={true} />

            {/* Hero Section */}
            <main className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 flex flex-col items-center text-center overflow-hidden">
                
                {/* Background glow effects */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] -z-10"></div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-medium mb-8">
                    <Sparkles size={14} className="text-accent" />
                    <span>Agora com Claude 3.5 Sonnet IA Integrada</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 leading-tight">
                    O cofre <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#7AE600]">inteligente</span> para os seus snippets.
                </h1>
                
                <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10">
                    Pare de perder tempo procurando aquele código que você já escreveu. Salve, organize com IA e recupere em segundos.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
                    {auth.user ? (
                        <Link href={route('dashboard')} className="flex items-center justify-center gap-2 bg-accent text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-[#9BEB39] transition w-full">
                            Ir para Dashboard <ChevronRight size={18} />
                        </Link>
                    ) : (
                        <>
                            <Link href={route('register')} className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-slate-800 transition w-full">
                                Começar Agora <ChevronRight size={18} />
                            </Link>
                            <Link href={route('pricing')} className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition w-full">
                                Ver Planos
                            </Link>
                        </>
                    )}
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mt-32 text-left">
                    <div className="p-6 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="bg-slate-100 dark:bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                            <Zap className="text-accent" size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Auto-Tags com IA</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Apenas cole seu código. Nossa IA analisa a linguagem, o padrão e o propósito para gerar as tags corretas automaticamente.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="bg-slate-100 dark:bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                            <Sparkles className="text-accent" size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Explicação Dinâmica</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Esqueceu o que uma regex faz? O Claude explica linha por linha de forma didática diretamente no painel.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="bg-slate-100 dark:bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                            <Shield className="text-accent" size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Seguro & Público</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Mantenha snippets privados com segurança ou compartilhe publicamente com um link único para a comunidade.
                        </p>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
