import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Check, Crown } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#fcfcfc] dark:bg-[#0D0D0D] font-sans">
            
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col px-6 py-8 md:px-12 relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition w-max">
                    <ArrowLeft size={16} /> Voltar para o Início
                </Link>

                <div className="flex-1 flex flex-col justify-center items-center w-full">
                    <div className="w-full max-w-sm">
                        <Link href="/" className="mb-10 block">
                            <ApplicationLogo className="justify-center" />
                        </Link>

                        <div className="bg-white dark:bg-surface-dark px-8 py-10 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                            {children}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Upsell Card / Banner */}
            <div className="hidden lg:flex w-1/2 bg-slate-50 dark:bg-[#121212] flex-col justify-center items-center p-12 border-l border-slate-200 dark:border-slate-800 relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] -z-10"></div>
                
                <div className="max-w-md w-full bg-slate-900 dark:bg-accent text-white dark:text-slate-900 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-slate-800 dark:border-accent">
                    <div className="absolute -right-10 -top-10 text-white/5 dark:text-slate-900/10">
                        <Crown size={200} />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-slate-900/10 text-xs font-bold uppercase tracking-wider mb-8">
                            <Crown size={14} className="text-accent dark:text-slate-900" />
                            SnippetVault Pro
                        </div>
                        
                        <h2 className="text-3xl font-extrabold mb-4 leading-tight">Codifique na velocidade da luz.</h2>
                        <p className="text-slate-400 dark:text-slate-800 mb-8 font-medium">Eleve sua produtividade com a Inteligência Artificial do Claude 3.5 sem limites.</p>
                        
                        <ul className="space-y-4 mb-8 font-medium">
                            <li className="flex items-center gap-3">
                                <div className="bg-accent/20 dark:bg-slate-900/20 p-1 rounded-full"><Check size={16} className="text-accent dark:text-slate-900" /></div>
                                Exclusivo: IA Geradora de Código
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="bg-accent/20 dark:bg-slate-900/20 p-1 rounded-full"><Check size={16} className="text-accent dark:text-slate-900" /></div>
                                Tags e Explicações Ilimitadas
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="bg-accent/20 dark:bg-slate-900/20 p-1 rounded-full"><Check size={16} className="text-accent dark:text-slate-900" /></div>
                                Zero Anúncios no Painel
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="bg-accent/20 dark:bg-slate-900/20 p-1 rounded-full"><Check size={16} className="text-accent dark:text-slate-900" /></div>
                                Histórico de Versões
                            </li>
                        </ul>

                        <div className="pt-8 border-t border-white/10 dark:border-slate-900/10">
                            <p className="text-sm text-slate-400 dark:text-slate-700">Por apenas <span className="font-bold text-white dark:text-slate-900 text-lg">R$29/mês</span>. Faça upgrade a qualquer momento pelo Dashboard usando o Stripe.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
