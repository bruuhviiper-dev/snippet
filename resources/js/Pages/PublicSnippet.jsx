import { Head, Link, usePage, router } from '@inertiajs/react';
import { Code, Copy, Eye, Clock, ArrowLeft, Star, ChevronRight, Download, Share2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { Toaster, toast } from 'sonner';
import { useState, useEffect } from 'react';
import AdBanner from '@/Components/AdBanner';
import Footer from '@/Components/Footer';
import LanguageBadge, { TagBadge } from '@/Components/LanguageBadge';

export default function PublicSnippet({ snippet, relatedSnippets, languageCounts, appUrl }) {
    const { auth } = usePage().props;

    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
        const observer = new MutationObserver(() => setIsDark(document.documentElement.classList.contains('dark')));
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(snippet.code);
        toast.success('Código copiado!');
    };

    const downloadSnippet = () => {
        const element = document.createElement("a");
        const file = new Blob([snippet.code], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        
        const extMap = { 'javascript': 'js', 'react': 'jsx', 'python': 'py', 'php': 'php', 'csharp': 'cs', 'go': 'go', 'java': 'java', 'ruby': 'rb', 'typescript': 'ts', 'sql': 'sql', 'bash': 'sh' };
        const ext = extMap[snippet.language.toLowerCase()] || 'txt';
        
        element.download = `snippet_${snippet.id}.${ext}`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        toast.success('Download iniciado!');
    };

    const shareTwitter = () => {
        const url = `${appUrl}/s/${snippet.id}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Confira este snippet de ' + snippet.language + ': ' + snippet.title)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const shareWhatsApp = () => {
        const url = `${appUrl}/s/${snippet.id}`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Confira este snippet de ' + snippet.language + ': ' + snippet.title + ' \n' + url)}`, '_blank');
    };

    const copyEmbedCode = () => {
        const embedCode = `<iframe src="${appUrl}/embed/${snippet.id}" width="100%" height="600" frameborder="0" style="border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);"></iframe>`;
        navigator.clipboard.writeText(embedCode);
        toast.success('Código Iframe copiado!');
    };

    const handleRate = (val) => {
        router.post(route('snippets.rate', snippet.id), { rating: val }, { preserveScroll: true });
    };

    const ratingAvg = snippet.rating_count > 0 ? (snippet.rating_sum / snippet.rating_count).toFixed(1) : '5.0';

    const snippetUrl = `${appUrl}/s/${snippet.id}`;
    const ogImageUrl = `${appUrl}/s/${snippet.id}/og.svg`;
    
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": snippet.title,
        "description": snippet.description || `Exemplo de código em ${snippet.language} para o seu projeto.`,
        "keywords": Array.isArray(snippet.tags) ? snippet.tags.join(", ") : (snippet.tags || snippet.language),
        "programmingLanguage": snippet.language,
        "datePublished": snippet.created_at,
        "dateModified": snippet.updated_at,
        "author": {
            "@type": "Person",
            "name": snippet.user?.name || "Comunidade"
        },
        "publisher": {
            "@type": "Organization",
            "name": "SnippetVault",
            "url": appUrl
        },
        "mainEntityOfPage": snippetUrl
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-background-dark text-slate-900 dark:text-white font-sans">
            <Head>
                <title>{`${snippet.title} - SnippetVault`}</title>
                <meta name="description" content={snippet.description || `Explore este snippet de ${snippet.language} pronto para usar no SnippetVault.`} />
                <meta name="keywords" content={(Array.isArray(snippet.tags) ? snippet.tags.join(', ') : (snippet.tags || '')) + `, ${snippet.language}, código, snippet`} />
                <link rel="canonical" href={snippetUrl} />
                
                <meta property="og:title" content={snippet.title} />
                <meta property="og:description" content={snippet.description || `Snippet de código ${snippet.language}`} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={snippetUrl} />
                <meta property="og:image" content={ogImageUrl} />
                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={snippet.title} />
                <meta name="twitter:description" content={snippet.description || `Snippet de código ${snippet.language}`} />
                <meta name="twitter:image" content={ogImageUrl} />
                
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </Head>
            <Toaster position="top-right" />
            
            <header className="p-6 flex justify-between items-center border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark sticky top-0 z-50">
                <Link href={route('explore')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition">
                    <ArrowLeft size={18} /> Voltar para Explorar
                </Link>
                <div className="flex gap-4 items-center">
                    {auth.user ? (
                        <Link href={route('dashboard')} className="text-sm font-medium hover:text-accent transition">Dashboard</Link>
                    ) : (
                        <Link href={route('register')} className="text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 transition">Criar SnippetVault</Link>
                    )}
                </div>
            </header>

            <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Main Content */}
                <div className="lg:col-span-3 flex flex-col min-h-[calc(100vh-140px)] bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold mb-3 leading-snug">{snippet.title}</h1>
                            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-500">
                                <LanguageBadge language={snippet.language} className="text-xs" />
                                <div className="flex items-center gap-1 group cursor-pointer hover:text-yellow-500 transition" onClick={() => handleRate(5)} title="Dar 5 estrelas">
                                    <Star size={14} className="text-yellow-400 fill-current group-hover:scale-125 transition-transform" />
                                    <span className="font-bold">{ratingAvg}</span>
                                    <span className="text-xs">({snippet.rating_count})</span>
                                </div>
                                <span className="flex items-center gap-1"><Eye size={14}/> {snippet.views} views</span>
                                <span className="flex items-center gap-1"><Clock size={14}/> Há {new Date(snippet.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="flex w-full lg:w-auto items-center gap-3 shrink-0">
                            <button onClick={downloadSnippet} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-sm font-medium transition shadow-sm">
                                <Download size={16} /> Baixar
                            </button>
                            <button onClick={copyToClipboard} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#A8FF3E] hover:bg-[#9BEB39] text-slate-900 rounded-xl text-sm font-bold transition shadow-sm">
                                <Copy size={16} /> Copiar
                            </button>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 text-sm">
                        {snippet.description || 'Nenhuma descrição fornecida pelo autor.'}
                    </div>

                    <div className="flex-1 min-h-[400px] relative bg-[#FAFAFA] dark:bg-[#0D0D0D]">
                        <Editor
                            height="100%"
                            language={(snippet.language || 'javascript').toLowerCase()}
                            theme={isDark ? "vs-dark" : "light"}
                            value={snippet.code}
                            options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                fontSize: 16,
                                fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                                padding: { top: 32, bottom: 32 },
                                scrollBeyondLastLine: false,
                                lineHeight: 1.8,
                                renderLineHighlight: "none"
                            }}
                        />
                    </div>

                    {/* Related Snippets */}
                    {relatedSnippets && relatedSnippets.length > 0 && (
                        <div className="p-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0a0a]">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">Veja também</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedSnippets.map(rel => (
                                    <Link href={route('snippet.public', rel.id)} key={rel.id} className="group flex flex-col bg-white dark:bg-[#161616] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:border-accent dark:hover:border-accent transition-all duration-300 relative overflow-hidden">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-[#7AE600] rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                                        <div className="relative z-10 flex-1">
                                            <LanguageBadge language={rel.language} className="mb-4" />
                                            <h4 className="font-bold text-base leading-snug text-slate-900 dark:text-white group-hover:text-slate-900 dark:group-hover:text-accent transition-colors line-clamp-2 mb-2">{rel.title}</h4>
                                        </div>
                                        <div className="relative z-10 flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px] uppercase text-slate-700 dark:text-slate-300">
                                                    {rel.user?.name?.charAt(0) || 'D'}
                                                </div>
                                                <span className="font-medium truncate max-w-[100px]">{rel.user?.name || 'Dev'}</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#A8FF3E] group-hover:text-slate-900 transition-colors">
                                                <ChevronRight size={16} />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar com Tags e Ads */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="font-bold mb-4">Sobre o Autor</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-[#7AE600] flex items-center justify-center font-extrabold text-slate-900 shadow-lg shadow-accent/20 text-lg uppercase">
                                {snippet.user?.name?.charAt(0)}
                            </div>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">{snippet.user?.name}</p>
                                <p className="text-xs text-slate-500">Dev Community</p>
                            </div>
                        </div>
                    </div>

                    {/* Compartilhar */}
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="font-bold mb-5 flex items-center gap-2"><Share2 size={16}/> Compartilhar</h3>
                        
                        <div className="flex items-center justify-center gap-4 mb-5">
                            <button onClick={shareTwitter} className="w-12 h-12 flex items-center justify-center bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-full shadow-md hover:shadow-lg transition-all group" title="Postar no X">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </button>
                            <button onClick={shareWhatsApp} className="w-12 h-12 flex items-center justify-center bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-md hover:shadow-lg transition-all group" title="Enviar no WhatsApp">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                            </button>
                            <button onClick={() => { navigator.clipboard.writeText(snippetUrl); toast.success('Link copiado!'); }} className="w-12 h-12 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-md hover:shadow-lg transition-all group" title="Copiar Link">
                                <Copy size={18} className="group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        <button onClick={copyEmbedCode} className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition text-sm border border-slate-200 dark:border-slate-700 shadow-sm group">
                            <Code size={18} className="group-hover:text-accent transition-colors" /> Copiar Iframe (Embed)
                        </button>
                    </div>

                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="font-bold mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                            {(Array.isArray(snippet.tags) && snippet.tags.length > 0 
                                ? snippet.tags 
                                : (typeof snippet.tags === 'string' ? snippet.tags.split(',') : [snippet.language, 'code'])
                            ).filter(Boolean).map(tag => (
                                <TagBadge key={tag} name={tag} />
                            ))}
                        </div>
                    </div>

                    {/* Menu de Linguagens */}
                    {languageCounts && languageCounts.length > 0 && (
                        <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="font-bold mb-4 flex items-center gap-2"><Code size={16}/> Explorar Linguagens</h3>
                            <div className="flex flex-col gap-2">
                                {languageCounts.map(lc => (
                                    <Link href={route('explore', { search: lc.language })} key={lc.language} className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400 hover:text-accent dark:hover:text-accent transition group">
                                        <span className="capitalize flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-accent transition"></span>
                                            {lc.language}
                                        </span>
                                        <span className="bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded text-xs font-bold">{lc.total}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <AdBanner slotId="SIDEBAR_PUBLIC" />
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
