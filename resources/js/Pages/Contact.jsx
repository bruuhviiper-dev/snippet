import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Mail, MessageSquare, Send, Github, Check, AlertCircle } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: null, message: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            setStatus({ type: 'error', message: 'Por favor, preencha todos os campos!' });
            return;
        }

        setSubmitting(true);
        setStatus({ type: null, message: '' });

        // Simulate sending
        setTimeout(() => {
            setSubmitting(false);
            setStatus({ type: 'success', message: 'Mensagem enviada com sucesso! Responderemos em breve.' });
            setForm({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0D0D0D] text-slate-900 dark:text-white flex flex-col font-sans relative overflow-hidden">
            <Head title="Contato - SnippetVault" />
            
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <Navbar />
            
            <main className="flex-1 flex flex-col items-center pt-20 pb-32 px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider mb-6">
                        <MessageSquare size={14} className="text-accent" /> Fale Conosco
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Entre em Contato
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
                        Tem alguma dúvida, sugestão ou encontrou algum problema? Envie uma mensagem e retornaremos em menos de 24 horas.
                    </p>
                </div>

                <div className="max-w-5xl w-full mx-auto grid md:grid-cols-5 gap-8 items-start relative z-10">
                    
                    {/* Contact Info (Col 2) */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-[#161616] p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[40px] pointer-events-none"></div>
                            
                            <h3 className="text-xl font-bold mb-6">Informações de Suporte</h3>
                            
                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="bg-slate-100 dark:bg-slate-800/80 p-3 rounded-2xl text-accent">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-400">E-mail Direto</h4>
                                        <a href="mailto:suporte@snippetvault.com" className="text-slate-800 dark:text-slate-200 font-semibold hover:text-accent transition">
                                            suporte@snippetvault.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="bg-slate-100 dark:bg-slate-800/80 p-3 rounded-2xl text-accent">
                                        <Github size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-400">Código Aberto</h4>
                                        <a href="https://github.com/bruuhviiper-dev/snippet" target="_blank" rel="noopener noreferrer" className="text-slate-800 dark:text-slate-200 font-semibold hover:text-accent transition">
                                            github.com/bruuhviiper-dev/snippet
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 dark:bg-[#121212] text-white p-8 rounded-[2rem] border border-slate-800 dark:border-slate-800 shadow-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] pointer-events-none"></div>
                            <h3 className="text-lg font-bold mb-2 text-white">Comunidade e Sugestões</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                Queremos construir o melhor cofre de snippets juntos. Envie sugestões de novas integrações de linguagem ou ferramentas de IA!
                            </p>
                        </div>
                    </div>

                    {/* Contact Form (Col 3) */}
                    <div className="md:col-span-3 bg-white dark:bg-[#161616] p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {status.message && (
                                <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${status.type === 'success' ? 'bg-accent/10 border border-accent/20 text-accent' : 'bg-red-500/10 border border-red-500/20 text-red-500'}`}>
                                    {status.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                                    <span>{status.message}</span>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Seu Nome</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 px-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-accent transition font-medium"
                                    placeholder="Ex: Bruno Diresta"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Endereço de E-mail</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 px-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-accent transition font-medium"
                                    placeholder="Ex: bruno@gmail.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sua Mensagem</label>
                                <textarea
                                    rows="5"
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 px-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-accent transition font-medium resize-none"
                                    placeholder="Como podemos te ajudar hoje?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-4 px-6 rounded-2xl font-bold bg-accent text-slate-900 hover:bg-[#9BEB39] hover:shadow-[0_0_20px_rgba(155,235,57,0.3)] transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {submitting ? 'Enviando...' : (
                                    <>
                                        Enviar Mensagem <Send size={16} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </main>
            
            <Footer />
        </div>
    );
}
