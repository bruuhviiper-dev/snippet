import { Head } from '@inertiajs/react';
import { Sparkles, Calendar, Zap, Star, Flame, Trophy } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Changelog() {
    const logs = [
        {
            version: 'v1.2.0',
            date: '24 de Maio, 2026',
            title: 'Pastas Personalizadas e Organização Avançada',
            description: 'Agora você pode organizar seus snippets em pastas coloridas e classificá-los com mais facilidade.',
            badge: 'Recente',
            type: 'major',
            changes: [
                'Criação de pastas customizadas com cores vibrantes para agrupar códigos.',
                'Sistema de classificação por estrelas e avaliações nos snippets.',
                'Interface de compartilhamento pública refinada e responsiva.',
                'Melhoria drástica na velocidade de busca inteligente.'
            ]
        },
        {
            version: 'v1.1.0',
            date: '10 de Abril, 2026',
            title: 'Integração de IA com Claude & Auto-Tags',
            description: 'Adicionamos inteligência artificial para ler seu código, sugerir tags e gerar explicações detalhadas automaticamente.',
            badge: 'IA',
            type: 'feature',
            changes: [
                'Explicação de código inteligente alimentada por modelos Claude.',
                'Geração automática de tags relevantes baseadas no contexto e linguagem do snippet.',
                'Histórico de versões para recuperar códigos antigos.',
                'Atalhos de teclado globais para navegação rápida.'
            ]
        },
        {
            version: 'v1.0.0',
            date: '14 de Março, 2026',
            title: 'Lançamento Oficial do SnippetVault',
            description: 'O cofre inteligente de snippets de código definitivo está oficialmente online para todos.',
            badge: 'Lançamento',
            type: 'release',
            changes: [
                'Painel completo para criação e edição de snippets com realce de sintaxe premium.',
                'Busca textual rápida em tempo real por linguagem ou termo.',
                'Assinaturas Pro integradas de forma segura com Stripe.',
                'Suporte nativo a Tema Escuro e Tema Claro automático.'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0D0D0D] text-slate-900 dark:text-white flex flex-col font-sans relative overflow-hidden">
            <Head title="Changelog - SnippetVault" />
            
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <Navbar />
            
            <main className="flex-1 flex flex-col items-center pt-20 pb-32 px-6">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider mb-6">
                        <Flame size={14} className="text-accent" /> Atualizações de Produto
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        O que há de novo no<br/>SnippetVault
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
                        Acompanhe nossa jornada de desenvolvimento, novos recursos e melhorias constantes que adicionamos à plataforma.
                    </p>
                </div>

                <div className="max-w-3xl w-full mx-auto relative z-10">
                    <div className="absolute left-4 md:left-8 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

                    <div className="space-y-16">
                        {logs.map((log, index) => (
                            <div key={index} className="relative pl-12 md:pl-20 group">
                                {/* Timeline Dot */}
                                <div className="absolute left-[9px] md:left-[25px] top-1.5 w-[16px] h-[16px] rounded-full border-4 border-slate-100 dark:border-[#0D0D0D] bg-accent group-hover:scale-125 transition duration-300 shadow-[0_0_10px_rgba(168,255,62,0.6)]"></div>

                                <div className="bg-white dark:bg-[#161616] p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span className="text-xs font-bold text-accent px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                                            {log.version}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                            <Calendar size={12} />
                                            {log.date}
                                        </div>
                                        {log.badge && (
                                            <span className="ml-auto text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                                {log.badge}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-accent transition duration-300">
                                        {log.title}
                                    </h3>
                                    
                                    <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                                        {log.description}
                                    </p>

                                    <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Alterações detalhadas</h4>
                                        <ul className="space-y-3">
                                            {log.changes.map((change, idx) => (
                                                <li key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
                                                    <span className="text-accent mt-1 flex-shrink-0">•</span>
                                                    <span>{change}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
