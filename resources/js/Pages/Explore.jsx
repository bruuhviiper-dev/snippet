import { Head, Link, router } from '@inertiajs/react';
import { Search, Code, Compass, Star, ChevronRight, User } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import LanguageBadge, { TagBadge, LanguageIcon } from '@/Components/LanguageBadge';

export default function Explore({ snippets, languageCounts, filters }) {
    const [search, setSearch] = useState(filters?.search || '');


    const filteredSnippets = snippets.data.filter(s => {
        if (!search) return true;
        const q = search.toLowerCase();
        return s.title?.toLowerCase().includes(q) || 
               s.language?.toLowerCase().includes(q) || 
               s.tags?.some(t => t.toLowerCase().includes(q));
    });

    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0D0D0D] text-slate-900 dark:text-white font-sans flex flex-col">
            <Head title="Marketplace - SnippetVault" />
            
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-20 pb-16 px-6 text-center border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161616] overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent/5 rounded-full blur-[100px] -z-10"></div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider mb-6">
                    <Compass size={14} className="text-accent" /> Marketplace da Comunidade
                </div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 max-w-2xl mx-auto">
                    Acelere seu fluxo com código pronto para uso.
                </h1>
                
                <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10">
                    Descubra algoritmos, hooks e configurações compartilhadas por milhares de desenvolvedores no SnippetVault.
                </p>

                {/* Big Search Bar */}
                <div className="max-w-2xl mx-auto relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-[#7AE600] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative flex items-center bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-2">
                        <Search className="text-slate-400 ml-4" size={24} />
                        <input 
                            type="text" 
                            placeholder="Buscar por react, docker, algoritmos..." 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-transparent border-none text-lg px-4 py-3 focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 outline-none"
                        />
                        <button className="bg-slate-900 dark:bg-accent text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-[#9BEB39] transition">
                            Buscar
                        </button>
                    </div>
                </div>

                {/* Language Pills */}
                {languageCounts && languageCounts.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-4xl mx-auto">
                        {languageCounts.map(lc => {
                            const isActive = filters?.search?.toLowerCase() === lc.language.toLowerCase() || search?.toLowerCase() === lc.language.toLowerCase();
                            return (
                            <Link href={route('explore', { search: lc.language })} key={lc.language} className={`flex items-center gap-2 border px-4 py-2 rounded-full transition text-sm font-medium shadow-sm backdrop-blur-sm group ${isActive ? 'bg-[#A8FF3E] border-[#A8FF3E] text-slate-900' : 'bg-white/60 dark:bg-[#1A1A1A]/60 hover:bg-white dark:hover:bg-[#222] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'}`}>
                                <LanguageIcon language={lc.language} className="w-4 h-4 opacity-70 group-hover:opacity-100 transition" />
                                <span className="capitalize">{lc.language}</span>
                                <span className={`text-xs font-bold px-1.5 rounded-full transition ${isActive ? 'bg-slate-900/10 text-slate-900' : 'opacity-50 bg-slate-100 dark:bg-slate-800 group-hover:opacity-100'}`}>{lc.total}</span>
                            </Link>
                        )})}
                    </div>
                )}
            </div>

            {/* Snippets Grid */}
            <main className="flex-1 max-w-6xl mx-auto w-full p-6 py-12">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2">Em Destaque</h2>
                    <span className="text-sm text-slate-500 font-medium">{snippets.total} resultados</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSnippets.map(snippet => (
                        <Link href={route('snippet.public', snippet.id)} key={snippet.id} className="group flex flex-col bg-white dark:bg-[#161616] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 hover:shadow-2xl hover:border-accent dark:hover:border-accent transition-all duration-300 relative overflow-hidden min-h-[260px]">
                            {/* Hover accent glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <LanguageBadge language={snippet.language} />
                                <div className="flex items-center gap-1 text-slate-400">
                                    <Star size={14} className="fill-current text-yellow-400" />
                                    <span className="text-xs font-bold">{snippet.views}</span>
                                </div>
                            </div>
                            
                            <h3 className="text-xl lg:text-2xl font-extrabold mb-3 group-hover:text-accent transition relative z-10 leading-tight">{snippet.title}</h3>
                            
                            <p className="text-sm lg:text-base text-slate-500 line-clamp-3 mb-6 flex-1 relative z-10">
                                {snippet.description || `Exemplo de código em ${snippet.language}.`}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                                {(snippet.tags?.length > 0 ? snippet.tags : [snippet.language, 'code']).map(tag => (
                                    <TagBadge key={tag} name={tag} />
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50 mt-auto relative z-10">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px]">
                                        {snippet.user?.name?.charAt(0)}
                                    </div>
                                    <span className="font-medium truncate max-w-[120px]">{snippet.user?.name || 'Dev'}</span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-accent group-hover:text-slate-900 transition">
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredSnippets.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-[#161616] rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-slate-800">
                            <Search className="text-slate-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Nenhum resultado</h3>
                        <p className="text-slate-500">Não encontramos nenhum snippet público para essa busca.</p>
                    </div>
                )}

                {/* Pagination Controls */}
                {snippets.links && snippets.links.length > 3 && (
                    <div className="flex justify-center mt-16 gap-3 flex-wrap items-center">
                        {snippets.links.map((link, idx) => {
                            let label = link.label;
                            if (label.includes('Previous')) label = '←';
                            if (label.includes('Next')) label = '→';

                            return (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`flex items-center justify-center min-w-[44px] h-11 px-4 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                                        link.active 
                                            ? 'bg-slate-900 dark:bg-[#A8FF3E] text-white dark:text-slate-900 scale-110' 
                                            : 'bg-white dark:bg-[#1A1A1A] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] hover:text-slate-900 dark:hover:text-white border border-slate-100 dark:border-slate-800'
                                    } ${!link.url ? 'opacity-30 cursor-not-allowed pointer-events-none' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: label }}
                                />
                            );
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
