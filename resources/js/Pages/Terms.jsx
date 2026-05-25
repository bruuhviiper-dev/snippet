import { Head } from '@inertiajs/react';
import { ShieldCheck, Scale, FileText, Globe, AlertCircle } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Terms() {
    const sections = [
        {
            icon: <Globe size={20} className="text-accent" />,
            title: '1. Aceitação dos Termos',
            content: 'Ao acessar e usar o SnippetVault, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, você não deve usar nossa plataforma.'
        },
        {
            icon: <Scale size={20} className="text-accent" />,
            title: '2. Uso do Serviço e Licença',
            content: 'Concedemos a você uma licença limitada, não exclusiva e revogável para usar nossa plataforma para fins pessoais ou profissionais de desenvolvimento de software, em conformidade com as regras estabelecidas aqui.'
        },
        {
            icon: <FileText size={20} className="text-accent" />,
            title: '3. Contas de Usuário e Segurança',
            content: 'Você é responsável por manter a confidencialidade de suas credenciais de login e por todas as atividades que ocorrem em sua conta. Notifique-nos imediatamente sobre qualquer uso não autorizado suspeito.'
        },
        {
            icon: <ShieldCheck size={20} className="text-accent" />,
            title: '4. Planos, Assinaturas e Pagamentos',
            content: 'O upgrade para o plano Pro é cobrado mensalmente via Stripe. Cancelamentos podem ser feitos a qualquer momento pelo portal do cliente, mantendo o acesso aos recursos Pro até o final do período de faturamento vigente.'
        },
        {
            icon: <AlertCircle size={20} className="text-accent" />,
            title: '5. Limitação de Responsabilidade',
            content: 'O SnippetVault é fornecido "como está". Não garantimos que a plataforma estará livre de erros ou interrupções, e não somos responsáveis por perdas de dados ou códigos salvos na plataforma.'
        }
    ];

    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0D0D0D] text-slate-900 dark:text-white flex flex-col font-sans relative overflow-hidden">
            <Head title="Termos de Uso - SnippetVault" />
            
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <Navbar />
            
            <main className="flex-1 flex flex-col items-center pt-20 pb-32 px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider mb-6">
                        <Scale size={14} className="text-accent" /> Aspectos Legais
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Termos de Uso
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
                        Última atualização: 24 de Maio, 2026. Por favor, leia atentamente as diretrizes de funcionamento da nossa plataforma.
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
                        Se você tiver dúvidas sobre os nossos Termos de Uso, entre em contato através da nossa página de suporte.
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
