import { Head } from '@inertiajs/react';
import { Lock, Eye, ShieldCheck, Database, Key } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Privacy() {
    const sections = [
        {
            icon: <Eye size={20} className="text-accent" />,
            title: '1. Coleta de Informações',
            content: 'Coletamos informações básicas de conta (nome, e-mail) necessárias para sua autenticação e para salvar seus snippets de forma segura em nosso banco de dados. Informações de pagamento são processadas integralmente pelo Stripe.'
        },
        {
            icon: <Database size={20} className="text-accent" />,
            title: '2. Armazenamento e Segurança dos Snippets',
            content: 'Seus snippets de código são armazenados de forma criptografada em servidores seguros. Snippets criados como "Privados" são acessíveis unicamente por você, enquanto os marcados como "Públicos" podem ser vistos por qualquer pessoa com o link.'
        },
        {
            icon: <Key size={20} className="text-accent" />,
            title: '3. Processamento de IA (API do Claude)',
            content: 'Quando você solicita explicações ou tags geradas por IA, partes selecionadas do seu snippet são enviadas de forma segura para os modelos da Anthropic (Claude). Esses dados não são utilizados para treinamento de modelos públicos deles.'
        },
        {
            icon: <Lock size={20} className="text-accent" />,
            title: '4. Compartilhamento de Dados com Terceiros',
            content: 'Não vendemos, alugamos ou compartilhamos suas informações pessoais ou códigos com terceiros para fins de marketing. Usamos apenas serviços confiáveis e essenciais, como Stripe para pagamentos e Claude para recursos de IA.'
        },
        {
            icon: <ShieldCheck size={20} className="text-accent" />,
            title: '5. Seus Direitos de Privacidade',
            content: 'Você tem controle total sobre seus dados. Você pode visualizar, editar ou excluir permanentemente qualquer snippet de seu painel a qualquer momento, bem como solicitar a exclusão total da sua conta nas configurações do perfil.'
        }
    ];

    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0D0D0D] text-slate-900 dark:text-white flex flex-col font-sans relative overflow-hidden">
            <Head title="Política de Privacidade - SnippetVault" />
            
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <Navbar />
            
            <main className="flex-1 flex flex-col items-center pt-20 pb-32 px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider mb-6">
                        <Lock size={14} className="text-accent" /> Privacidade & Segurança
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Política de Privacidade
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
                        Última atualização: 24 de Maio, 2026. Entenda com total transparência como cuidamos da sua segurança e dos seus dados.
                    </p>
                </div>

                <div className="max-w-3xl w-full mx-auto relative z-10 space-y-8">
                    {sections.map((section, index) => (
                        <div key={index} className="bg-white dark:bg-[#161616] p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-2xl">
                                    {section.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {section.title}
                                </h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium pl-1">
                                {section.content}
                            </p>
                        </div>
                    ))}

                    <div className="text-center pt-8 text-xs text-slate-400">
                        Nossas políticas estão alinhadas com as melhores práticas globais de segurança e com a LGPD.
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
