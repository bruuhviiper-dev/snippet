import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Check, Zap, Shield, Sparkles } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Pricing() {
    const { auth } = usePage().props;
    const { post, processing } = useForm({});

    const handleSubscribe = () => {
        post(route('checkout.pro', { price_id: 'monthly' }));
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0D0D0D] text-slate-900 dark:text-white flex flex-col font-sans relative overflow-hidden">
            <Head title="Preços - SnippetVault" />
            
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <Navbar />
            
            <main className="flex-1 flex flex-col items-center pt-20 pb-32 px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider mb-6">
                        <Sparkles size={14} className="text-accent" /> Escolha seu Plano
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Planos simples.<br/>Sem surpresas.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
                        Comece de graça e faça o upgrade quando precisar do poder total da IA para alavancar sua produtividade.
                    </p>
                </div>

                <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-8 items-start relative z-10">
                    
                    {/* Free Plan */}
                    <div className="bg-white dark:bg-[#161616] p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-700 transition">
                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800"></div>
                        
                        <h3 className="text-3xl font-bold mb-2">Plano Free</h3>
                        <p className="text-slate-500 mb-8">Para desenvolvedores iniciantes</p>
                        
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-5xl font-extrabold">R$0</span>
                            <span className="text-lg text-slate-400 font-medium">/mês</span>
                        </div>
                        
                        <ul className="space-y-5 mb-10 text-slate-700 dark:text-slate-300 font-medium">
                            <li className="flex gap-4 items-center"><div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full text-slate-500"><Check size={16} /></div> Snippets ilimitados</li>
                            <li className="flex gap-4 items-center"><div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full text-slate-500"><Check size={16} /></div> Busca textual e organização</li>
                            <li className="flex gap-4 items-center text-slate-500"><div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full opacity-50"><Check size={16} /></div> IA Tags (20 chamadas/dia)</li>
                            <li className="flex gap-4 items-center text-slate-500"><div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full opacity-50"><Check size={16} /></div> IA Explicação (10 chamadas/dia)</li>
                            <li className="flex gap-4 items-center text-slate-500"><div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full opacity-50"><Check size={16} /></div> Exibição de Anúncios AdSense</li>
                        </ul>

                        {auth.user?.plan === 'free' ? (
                            <button disabled className="w-full py-4 px-6 rounded-2xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-transparent">
                                Seu Plano Atual
                            </button>
                        ) : (
                            <Link href={route('register')} className="block text-center w-full py-4 px-6 rounded-2xl font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition">
                                Começar Grátis
                            </Link>
                        )}
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-slate-900 dark:bg-[#121212] text-white p-8 md:p-12 rounded-[2.5rem] border border-slate-800 dark:border-slate-800 shadow-2xl relative overflow-hidden group">
                        {/* Glow and decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -z-10 group-hover:bg-accent/30 transition duration-500 pointer-events-none"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-[#7AE600]"></div>
                        
                        <div className="absolute top-8 right-8 bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-md">Recomendado</div>
                        
                        <div className="flex items-center gap-3 mb-2">
                            <Zap className="text-accent" size={28} />
                            <h3 className="text-3xl font-bold">Plano Pro</h3>
                        </div>
                        <p className="text-slate-400 mb-8">Poder total da IA sem interrupções</p>
                        
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-5xl font-extrabold text-white">R$29</span>
                            <span className="text-lg text-slate-400 font-medium">/mês</span>
                        </div>
                        
                        <ul className="space-y-5 mb-10 text-slate-200 font-medium relative z-10">
                            <li className="flex gap-4 items-center"><div className="bg-accent/20 p-1.5 rounded-full text-accent"><Check size={16} /></div> Tudo do plano Free</li>
                            <li className="flex gap-4 items-center"><div className="bg-accent/20 p-1.5 rounded-full text-accent"><Check size={16} /></div> Sem Anúncios no Painel</li>
                            <li className="flex gap-4 items-center font-bold text-white"><div className="bg-accent text-slate-900 p-1.5 rounded-full shadow-[0_0_10px_rgba(155,235,57,0.5)]"><Check size={16} /></div> IA Ilimitada (Tags e Explicações)</li>
                            <li className="flex gap-4 items-center font-bold text-white"><div className="bg-accent text-slate-900 p-1.5 rounded-full shadow-[0_0_10px_rgba(155,235,57,0.5)]"><Check size={16} /></div> Geração de código via Prompt</li>
                            <li className="flex gap-4 items-center"><div className="bg-accent/20 p-1.5 rounded-full text-accent"><Check size={16} /></div> Histórico de Versões</li>
                        </ul>

                        {auth.user?.plan === 'pro' ? (
                            <a href={route('billing.portal')} className="block text-center w-full py-4 px-6 rounded-2xl font-bold bg-white text-slate-900 hover:bg-slate-100 transition relative z-10">
                                Gerenciar Assinatura
                            </a>
                        ) : (
                            <button 
                                onClick={handleSubscribe} 
                                disabled={processing}
                                className="w-full py-4 px-6 rounded-2xl font-bold bg-accent text-slate-900 hover:bg-[#9BEB39] hover:shadow-[0_0_20px_rgba(155,235,57,0.4)] transition duration-300 relative z-10 flex items-center justify-center gap-2"
                            >
                                {processing ? 'Redirecionando Stripe...' : 'Fazer Upgrade para Pro'}
                            </button>
                        )}
                    </div>

                </div>
            </main>
            
            <Footer />
        </div>
    );
}
