import { Head, usePage, router, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Search, Plus, Code, Star, Compass, Clock, Folder, Heart, MoreHorizontal, Copy, Edit2, Share2, Sparkles, Save, Trash2, Zap, ArrowLeft, Tag, Crown, LogOut, User, ChevronDown, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import AdBanner from '@/Components/AdBanner';
import LanguageBadge, { TagBadge } from '@/Components/LanguageBadge';

export default function Dashboard() {
    const { auth } = usePage().props;
    const { snippets: initialSnippets, folders } = usePage().props;
    const [snippets, setSnippets] = useState(initialSnippets || []);
    
    // Sincroniza o estado local quando os props do Inertia mudam (ex: após salvar/favoritar)
    useEffect(() => {
        setSnippets(initialSnippets || []);
    }, [initialSnippets]);

    const [selectedSnippet, setSelectedSnippet] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
    // Filtros e Busca
    const [searchQuery, setSearchQuery] = useState('');
    const [currentFilter, setCurrentFilter] = useState('Todos'); 
    const [menuActive, setMenuActive] = useState('meus'); // meus, favs, explore, recentes
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [showAiModal, setShowAiModal] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [isUpgrading, setIsUpgrading] = useState(false);
    const [isGeneratingAi, setIsGeneratingAi] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        language: 'javascript',
        desc: '',
        code: '// Digite seu código aqui...',
        tags: [],
        folder_id: '',
        is_public: false,
        is_favorite: false
    });

    const [explanation, setExplanation] = useState('');
    const [loadingAI, setLoadingAI] = useState(false);

    // Modal de Nova Pasta
    const [showFolderModal, setShowFolderModal] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [newFolderColor, setNewFolderColor] = useState('#A8FF3E');

    const FOLDER_COLORS = ['#A8FF3E', '#60A5FA', '#F472B6', '#A78BFA', '#FBBF24', '#34D399', '#94A3B8'];

    // Read global theme to sync Monaco Editor
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        setIsDark(document.documentElement.classList.contains('dark'));
        return () => observer.disconnect();
    }, []);

    // Selecionar o primeiro snippet ao carregar se não houver seleção
    useEffect(() => {
        if (snippets.length > 0 && !selectedSnippet && !isEditing) {
            setSelectedSnippet(snippets[0]);
        }
    }, [snippets]);

    const handleSelectSnippet = (snippet) => {
        setSelectedSnippet(snippet);
        setIsEditing(false);
        setExplanation('');
    };

    const handleNewSnippet = () => {
        let defaultFolderId = null;
        if (menuActive && menuActive.startsWith('folder_')) {
            defaultFolderId = parseInt(menuActive.replace('folder_', ''));
        }
        
        setFormData({
            id: null,
            title: 'Novo Snippet',
            language: 'javascript',
            description: '',
            code: '// Digite seu código aqui...',
            tags: [],
            folder_id: defaultFolderId,
            is_public: false,
            is_favorite: false
        });
        setSelectedSnippet(null);
        setIsEditing(true);
        setExplanation('');
    };

    const handleEdit = () => {
        if (!selectedSnippet) return;
        setFormData({
            id: selectedSnippet.id,
            title: selectedSnippet.title,
            language: selectedSnippet.language,
            desc: selectedSnippet.description || '',
            code: selectedSnippet.code,
            tags: selectedSnippet.tags || [],
            folder_id: selectedSnippet.folder_id || '',
            is_public: !!selectedSnippet.is_public,
            is_favorite: !!selectedSnippet.is_favorite
        });
        setIsEditing(true);
    };

    const handleSave = () => {
        let tagsArray = [];
        if (typeof formData.tags === 'string') {
            tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
        } else if (Array.isArray(formData.tags)) {
            tagsArray = formData.tags;
        }

        const dataToSend = {
            title: formData.title,
            code: formData.code,
            language: formData.language,
            description: formData.desc,
            tags: tagsArray,
            folder_id: formData.folder_id || null,
            is_public: formData.is_public,
            is_favorite: formData.is_favorite
        };

        if (formData.id) {
            router.put(`/snippets/${formData.id}`, dataToSend, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Snippet atualizado com sucesso!');
                    setIsEditing(false);
                }
            });
        } else {
            router.post('/snippets', dataToSend, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Snippet criado com sucesso!');
                    setIsEditing(false);
                }
            });
        }
    };

    const handleToggleFavorite = (e, snippet) => {
        if(e) e.stopPropagation();
        router.put(`/snippets/${snippet.id}`, {
            title: snippet.title,
            code: snippet.code,
            language: snippet.language,
            is_favorite: !snippet.is_favorite
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(snippet.is_favorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
                if (selectedSnippet?.id === snippet.id) {
                    setSelectedSnippet({...snippet, is_favorite: !snippet.is_favorite});
                }
            }
        });
    };

    const handleDelete = () => {
        if(!selectedSnippet) return;
        if(confirm('Certeza que deseja excluir permanentemente este snippet?')) {
            router.delete(`/snippets/${selectedSnippet.id}`, {
                onSuccess: () => {
                    setSelectedSnippet(null);
                    toast.success('Snippet excluído!');
                }
            });
        }
    };

    const handleGenerateTags = async () => {
        if (!formData.code || formData.code === '// Digite seu código aqui...') return;
        setLoadingAI(true);
        try {
            const res = await axios.post('/ai/tags', { code: formData.code });
            setFormData(prev => ({
                ...prev, 
                tags: res.data.tags,
                language: res.data.language && res.data.language !== 'plaintext' ? res.data.language : prev.language
            }));
            toast.success('Análise IA concluída!');
        } catch (e) {
            toast.error(e.response?.data?.error || 'Erro na IA.');
        } finally {
            setLoadingAI(false);
        }
    };

    const simulateUpgrade = () => {
        setIsUpgrading(true);
        router.post(route('user.upgrade'), {}, {
            preserveScroll: true,
            onSuccess: () => {
                setIsUpgrading(false);
                setShowUpgradeModal(false);
                toast.success('Parabéns! Sua conta agora é PRO 🚀');
            }
        });
    };

    const simulateAiGeneration = () => {
        if(!aiPrompt) return;
        setIsGeneratingAi(true);
        setTimeout(() => {
            setFormData({
                title: 'Algoritmo Otimizado (Gerado por IA)',
                language: 'python',
                code: 'def execute_task(data):\n    """ Implementação otimizada por IA """\n    try:\n        result = [x * 2 for x in data if x % 2 == 0]\n        return result\n    except Exception as e:\n        return str(e)',
                desc: `Snippet gerado a partir do prompt: "${aiPrompt}"`,
                tags: 'ia, otimizado',
                is_public: false,
                is_favorite: true,
                folder_id: null
            });
            setIsEditing(true);
            setSelectedSnippet(null);
            setIsGeneratingAi(false);
            setShowAiModal(false);
            setAiPrompt('');
            toast.success('Mágica feita! Código gerado com sucesso.');
        }, 2000);
    };

    const handleExplain = async () => {
        const codeToExplain = isEditing ? formData.code : selectedSnippet?.code;
        if (!codeToExplain) return;
        setLoadingAI(true);
        try {
            const res = await axios.post('/ai/explain', { code: codeToExplain });
            setExplanation(res.data.explanation);
        } catch (e) {
            toast.error(e.response?.data?.error || 'Erro na IA.');
        } finally {
            setLoadingAI(false);
        }
    };

    const handleCreateFolder = () => {
        setShowFolderModal(true);
        setNewFolderName('');
        setNewFolderColor('#A8FF3E');
    };

    const submitCreateFolder = (e) => {
        e.preventDefault();
        if (newFolderName.trim()) {
            router.post('/folders', { name: newFolderName, color: newFolderColor }, {
                onSuccess: () => {
                    toast.success('Pasta criada com sucesso!');
                    setShowFolderModal(false);
                }
            });
        }
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    // Filter Logic
    const filteredSnippets = snippets.filter(snippet => {
        if (menuActive === 'favs' && !snippet.is_favorite) return false;
        if (menuActive.startsWith('folder_')) {
            const fId = menuActive.replace('folder_', '');
            if (snippet.folder_id != fId) return false;
        }
        if (currentFilter !== 'Todos' && snippet.language?.toLowerCase() !== currentFilter.toLowerCase()) return false;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return snippet.title?.toLowerCase().includes(q) || 
                   snippet.tags?.some(t => t.toLowerCase().includes(q));
        }
        return true;
    });

    return (
        <div className="flex flex-col md:flex-row h-screen bg-white dark:bg-[#0f172a] overflow-hidden text-slate-800 dark:text-slate-200">
            <Head title="Dashboard - SnippetVault" />
            <Toaster position="bottom-right" />

            {/* Mobile Header */}
            <div className="md:hidden h-14 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 bg-[#fafafa] dark:bg-[#0A0A0B] shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => setShowMobileMenu(true)} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                        <Menu size={22} />
                    </button>
                    <div className="bg-[#A8FF3E] text-slate-900 p-1 rounded">
                        <Code size={14} strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-[14px] tracking-tight">SnippetVault</span>
                </div>
            </div>

            {/* Overlay Mobile Sidebar */}
            {showMobileMenu && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowMobileMenu(false)} />
            )}

            {/* COLUNA 1 — Sidebar esquerda */}
            <aside className={`fixed md:relative inset-y-0 left-0 z-50 ${isSidebarCollapsed ? 'w-[70px]' : 'w-[260px] md:w-[200px] lg:w-[240px]'} flex-shrink-0 bg-[#fafafa] dark:bg-[#0A0A0B] border-r border-slate-200 dark:border-slate-800/60 flex flex-col h-full transform transition-all duration-300 ease-in-out ${showMobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                {/* Topo / Logo */}
                <div className={`h-14 flex items-center ${isSidebarCollapsed ? 'justify-center flex-col relative py-2 h-auto' : 'justify-between px-4'} border-b border-slate-200 dark:border-slate-800/60 shrink-0`}>
                    <Link href="/" className={`flex items-center gap-2 ${isSidebarCollapsed ? 'mb-2' : ''}`} onClick={() => setShowMobileMenu(false)}>
                        <div className="bg-[#A8FF3E] text-slate-900 p-1 rounded">
                            <Code size={16} strokeWidth={2.5} />
                        </div>
                        {!isSidebarCollapsed && <span className="font-bold text-[15px] tracking-tight dark:text-white">SnippetVault</span>}
                    </Link>
                    {!isSidebarCollapsed && (
                        <button onClick={() => setShowMobileMenu(false)} className="md:hidden text-slate-400 hover:text-slate-600">
                            <X size={20} />
                        </button>
                    )}
                    <button 
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
                        className={`hidden md:flex text-slate-400 hover:text-slate-600 transition`}
                    >
                        {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>

                <div className={`flex-1 overflow-y-auto ${isSidebarCollapsed ? 'px-2 py-4' : 'px-3 py-4'} space-y-6 hide-scrollbar`}>
                    <div>
                        {!isSidebarCollapsed && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Menu</p>}
                        <nav className="space-y-0.5">
                            <button onClick={() => setMenuActive('meus')} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'} rounded-xl transition ${menuActive === 'meus' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}`} title="Meus snippets">
                                <Code size={18} />
                                {!isSidebarCollapsed && <span className="font-medium text-sm">Meus snippets</span>}
                            </button>
                            <button onClick={() => setMenuActive('favs')} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'} rounded-xl transition ${menuActive === 'favs' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}`} title="Favoritos">
                                <Star size={18} className={menuActive === 'favs' ? 'text-yellow-400 fill-current' : ''} />
                                {!isSidebarCollapsed && <span className="font-medium text-sm">Favoritos</span>}
                            </button>
                            <Link href={route('explore')} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'} rounded-xl transition text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white`} title="Explorar públicos">
                                <Compass size={18} />
                                {!isSidebarCollapsed && <span className="font-medium text-sm">Explorar públicos</span>}
                            </Link>
                            <button onClick={() => setMenuActive('recentes')} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'} rounded-xl transition ${menuActive === 'recentes' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}`} title="Recentes">
                                <Clock size={18} />
                                {!isSidebarCollapsed && <span className="font-medium text-sm">Recentes</span>}
                            </button>
                        </nav>
                    </div>

                    <div>
                        {!isSidebarCollapsed && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2 mt-4">Pastas</p>}
                        {isSidebarCollapsed && <div className="h-px bg-slate-200 dark:bg-slate-800 my-4 mx-2"></div>}
                        <nav className="space-y-0.5">
                            {folders?.map(folder => (
                                <button 
                                    key={folder.id} 
                                    onClick={() => setMenuActive(`folder_${folder.id}`)}
                                    title={folder.name}
                                    className={`w-full group flex items-center ${isSidebarCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'} text-sm font-medium transition-colors ${menuActive === `folder_${folder.id}` ? 'bg-white dark:bg-[#161618] text-slate-900 dark:text-white border-l-[3px] shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-[#161618] border-l-[3px] border-transparent'}`}
                                    style={menuActive === `folder_${folder.id}` ? { borderLeftColor: folder.color || '#A8FF3E' } : {}}
                                >
                                    <div className="flex items-center gap-3">
                                        <Folder size={16} style={{ color: folder.color || (menuActive === `folder_${folder.id}` ? '#A8FF3E' : '') }} className={!folder.color && menuActive !== `folder_${folder.id}` ? "text-slate-400" : ""} /> 
                                        {!isSidebarCollapsed && <span>{folder.name}</span>}
                                    </div>
                                    {!isSidebarCollapsed && <Trash2 size={12} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" onClick={(e) => { e.stopPropagation(); if(confirm('Excluir pasta?')) router.delete(`/folders/${folder.id}`); }} />}
                                </button>
                            ))}
                            <button onClick={handleCreateFolder} title="Nova pasta" className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2'} text-sm font-medium text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors mt-1 border-l-[3px] border-transparent`}>
                                <Plus size={16} /> {!isSidebarCollapsed && <span>Nova pasta</span>}
                            </button>
                        </nav>
                    </div>

                    {/* PRO Banner */}
                    {(!auth.user?.is_pro && !isSidebarCollapsed) && (
                        <div className="mt-8 bg-white dark:bg-[#111] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#A8FF3E]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#A8FF3E]/20 transition"></div>
                            <h4 className="font-bold text-sm mb-2 text-slate-900 dark:text-white flex items-center gap-1.5"><Crown size={14} className="text-[#A8FF3E]" /> Upgrade para Pro</h4>
                            <p className="text-xs text-slate-500 mb-4">Sem anúncios, busca semântica e geração de snippets por IA.</p>
                            <button onClick={() => setShowUpgradeModal(true)} className="w-full py-2 bg-[#A8FF3E] hover:bg-[#9BEB39] text-slate-900 text-xs font-bold rounded-xl transition shadow-sm">Ver planos</button>
                        </div>
                    )}
                    {(!auth.user?.is_pro && isSidebarCollapsed) && (
                        <button onClick={() => setShowUpgradeModal(true)} title="Upgrade para Pro" className="mt-8 w-full flex justify-center p-2.5 text-[#A8FF3E] hover:bg-[#A8FF3E]/10 rounded-xl transition">
                            <Crown size={20} />
                        </button>
                    )}
                </div>

                <div className={`p-3 border-t border-slate-200 dark:border-slate-800 mt-auto ${isSidebarCollapsed ? 'flex flex-col gap-3 items-center' : ''}`}>
                    <div className={`flex items-center w-full ${isSidebarCollapsed ? 'flex-col gap-3 justify-center' : 'justify-between'}`}>
                        <Link href="/profile" className={`flex items-center gap-2 group cursor-pointer ${isSidebarCollapsed ? 'justify-center' : 'flex-1'}`} title={isSidebarCollapsed ? "Perfil" : ""}>
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs group-hover:bg-[#A8FF3E] group-hover:text-slate-900 transition-colors shrink-0">
                                {auth.user?.name?.charAt(0)}
                            </div>
                            {!isSidebarCollapsed && (
                                <div className="overflow-hidden">
                                    <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{auth.user?.name}</p>
                                    <p className="text-[10px] text-slate-500 truncate">{auth.user?.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}</p>
                                </div>
                            )}
                        </Link>
                        <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors p-2 shrink-0" title="Sair">
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* COLUNA 2 — Área central de lista (Oculta no mobile se houver snippet selecionado) */}
            <div className={`flex-1 flex-col min-w-[300px] border-r border-slate-200 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0A0A0B]/50 h-full ${(selectedSnippet || isEditing) ? 'hidden lg:flex' : 'flex'}`}>
                {/* Search Bar no Topo */}
                <div className="h-14 flex items-center px-4 md:px-6 border-b border-slate-200 dark:border-slate-800 justify-between shrink-0">
                    <div className="relative w-full max-w-[280px]">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Buscar snippets..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg text-[13px] text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[#A8FF3E] focus:ring-1 focus:ring-[#A8FF3E] transition-all"
                        />
                    </div>
                    <button onClick={handleNewSnippet} className="ml-4 flex-shrink-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[13px] font-bold text-slate-700 dark:text-slate-200 shadow-sm transition-all">
                        <Plus size={14} /> Novo
                    </button>
                </div>

                <div className="flex-shrink-0 px-6 py-3 border-b border-slate-200 dark:border-slate-800 overflow-x-auto hide-scrollbar">
                    <div className="flex items-center gap-2">
                        {['Todos', ...new Set(snippets.map(s => s.language).filter(Boolean))].map(filter => (
                            <button 
                                key={filter}
                                onClick={() => setCurrentFilter(filter)}
                                className={`px-4 flex items-center justify-center h-[26px] rounded-full border text-xs font-bold whitespace-nowrap transition-colors ${
                                    currentFilter === filter && filter === 'Todos'
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700 shadow-sm' 
                                    : currentFilter === filter
                                    ? 'bg-slate-100 dark:bg-slate-800 shadow-sm border-transparent text-slate-800 dark:text-slate-100'
                                    : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                    {filteredSnippets.map(snippet => (
                        <button 
                            key={snippet.id}
                            onClick={() => { setSelectedSnippet(snippet); setIsEditing(false); }}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${selectedSnippet?.id === snippet.id ? 'bg-white dark:bg-[#1E293B] border-[#A8FF3E] shadow-sm ring-1 ring-[#A8FF3E]' : 'bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 hover:border-[#A8FF3E]/50 dark:hover:border-[#A8FF3E]/50 hover:shadow-sm'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-[15px] text-slate-900 dark:text-slate-100 truncate pr-2">{snippet.title}</h4>
                                <LanguageBadge language={snippet.language} />
                            </div>
                            
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-2 leading-snug">
                                {snippet.description || 'Sem descrição...'}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                {snippet.tags?.slice(0, 3).map(tag => (
                                    <TagBadge key={tag} name={tag} />
                                ))}
                            </div>
                            
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-[11px] text-slate-500 dark:text-slate-500 font-medium">
                                    há 2 dias
                                </span>
                                <div className="flex items-center gap-3 text-slate-400">
                                    <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(snippet.code); toast.success('Copiado!'); }} className="hover:text-slate-600 dark:hover:text-slate-200"><Copy size={14} /></button>
                                    <button onClick={(e) => handleToggleFavorite(e, snippet)} className={`hover:text-yellow-500 ${snippet.is_favorite ? 'text-yellow-500' : ''}`}><Heart size={14} className={snippet.is_favorite ? 'fill-current' : ''} /></button>
                                    <button className="hover:text-slate-600 dark:hover:text-slate-200"><MoreHorizontal size={14} /></button>
                                </div>
                            </div>
                        </button>
                    ))}
                    {filteredSnippets.length === 0 && (
                        <div className="text-center text-xs text-slate-500 mt-10">Nenhum snippet encontrado.</div>
                    )}
                </div>
            </div>

            {/* COLUNA 3 — Painel de detalhe direito (Aparece no mobile se selecionado) */}
            <aside className={`w-full lg:w-[500px] xl:w-[650px] flex-shrink-0 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] flex-col h-full ${(selectedSnippet || isEditing) ? 'flex absolute inset-0 z-30 lg:relative lg:z-0' : 'hidden lg:flex'}`}>
                {(selectedSnippet || isEditing) ? (
                    <>
                        <div className="flex-1 overflow-y-auto p-4 lg:p-[14px] flex flex-col gap-4">
                            {/* Botão voltar mobile */}
                            <button onClick={() => { setSelectedSnippet(null); setIsEditing(false); }} className="lg:hidden flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg w-fit">
                                <ArrowLeft size={16} /> Voltar para lista
                            </button>

                            {/* Título e Metadados */}
                            <div>
                                {isEditing ? (
                                    <>
                                        <input 
                                            type="text" 
                                            value={formData.title} 
                                            onChange={e => setFormData({...formData, title: e.target.value})} 
                                            className="w-full font-bold text-lg bg-transparent border-b border-slate-200 dark:border-slate-700 focus:border-[#A8FF3E] focus:ring-0 px-0 py-1 mb-2 text-slate-800 dark:text-white" 
                                            placeholder="Título do Snippet"
                                        />
                                    </>
                                ) : (
                                    <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{selectedSnippet?.title}</h2>
                                )}
                                
                                <div className="flex flex-col sm:flex-row gap-2 mt-3 items-start sm:items-center">
                                    {isEditing ? (
                                        <div className="relative">
                                            <input type="text" value={formData.language} onChange={e=>setFormData({...formData, language: e.target.value})} className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[12px] font-bold px-3 py-1.5 pr-8 rounded-lg w-full sm:w-32 focus:outline-none focus:border-[#A8FF3E] focus:ring-1 focus:ring-[#A8FF3E]" placeholder="Linguagem" />
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                                <Code size={14} />
                                            </div>
                                        </div>
                                    ) : (
                                        <LanguageBadge language={selectedSnippet?.language} className="px-3 py-1 text-[11px]" />
                                    )}
                                    
                                    <span className="hidden sm:block text-slate-300 dark:text-slate-700">·</span>
                                    
                                    {isEditing ? (
                                        <div className="relative w-full sm:w-40">
                                            <select 
                                                value={formData.folder_id || ''} 
                                                onChange={e => setFormData({...formData, folder_id: e.target.value})} 
                                                className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[12px] font-medium text-slate-700 dark:text-slate-300 px-3 py-1.5 pr-8 rounded-lg focus:outline-none focus:border-[#A8FF3E] focus:ring-1 focus:ring-[#A8FF3E] transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm"
                                            >
                                                <option value="">Sem pasta (Raiz)</option>
                                                {folders?.map(f => (
                                                    <option key={f.id} value={f.id}>{f.name}</option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                                <ChevronDown size={14} />
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700/50">
                                            <Folder size={12}/> {folders?.find(f => f.id == selectedSnippet?.folder_id)?.name || 'Sem pasta'}
                                        </span>
                                    )}
                                </div>
                                {isEditing && (
                                    <div className="mt-3">
                                        <input 
                                            type="text" 
                                            value={formData.tags} 
                                            onChange={e => setFormData({...formData, tags: e.target.value})} 
                                            className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#A8FF3E] focus:ring-1 focus:ring-[#A8FF3E] text-slate-700 dark:text-slate-200" 
                                            placeholder="Tags (separadas por vírgula)"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Botões de Ação */}
                            <div className="flex flex-col gap-2 w-full sm:w-auto">
                                {!isEditing ? (
                                    <>
                                        <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(selectedSnippet?.code); toast.success('Copiado!'); }} className="flex items-center gap-2 h-9 px-3 text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors w-full sm:w-auto justify-center">
                                            <Copy size={16} /> Copiar
                                        </button>
                                        <button onClick={handleEdit} className="flex items-center gap-2 h-9 px-3 text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors w-full sm:w-auto justify-center">
                                            <Edit2 size={16} /> Editar
                                        </button>
                                        <button 
                                            onClick={() => {
                                                if (!selectedSnippet.is_public) {
                                                    router.put(`/snippets/${selectedSnippet.id}`, {
                                                        ...selectedSnippet,
                                                        is_public: true
                                                    }, {
                                                        onSuccess: () => window.open(`/s/${selectedSnippet.id}`)
                                                    });
                                                } else {
                                                    window.open(`/s/${selectedSnippet.id}`);
                                                }
                                            }} 
                                            className="flex items-center gap-2 h-9 px-3 text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors w-full sm:w-auto justify-center"
                                        >
                                            <Share2 size={16} /> Publicar
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex gap-2">
                                        {auth.user?.is_pro ? (
                                            <button onClick={() => setShowAiModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold bg-[#A8FF3E]/20 text-[#7AE600] border border-[#A8FF3E]/50 rounded-lg hover:bg-[#A8FF3E]/30 transition">
                                                <Sparkles size={14} /> <span className="hidden sm:inline">IA Gerar</span>
                                            </button>
                                        ) : (
                                            <button onClick={() => setShowUpgradeModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg hover:text-slate-500 transition" title="Exclusivo PRO">
                                                <Sparkles size={14} /> <span className="hidden sm:inline">IA (Pro)</span>
                                            </button>
                                        )}
                                        <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition">Cancelar</button>
                                        <button onClick={handleSave} className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition">
                                            <Save size={16} /> Salvar
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Editor de Código */}
                            <div className="bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-slate-800 rounded-lg flex-1 min-h-[400px] flex flex-col overflow-hidden">
                                <Editor
                                    key={isEditing ? `edit-${formData.id||'new'}` : `view-${selectedSnippet?.id}`}
                                    height="100%"
                                    language={(isEditing ? formData.language : selectedSnippet?.language)?.toLowerCase() || 'javascript'}
                                    theme={isDark ? 'vs-dark' : 'light'}
                                    value={isEditing ? formData.code : selectedSnippet?.code}
                                    onChange={val => isEditing && setFormData({...formData, code: val})}
                                    options={{
                                        readOnly: !isEditing,
                                        minimap: { enabled: false },
                                        lineNumbers: "on",
                                        fontSize: 15,
                                        fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                                        padding: { top: 24, bottom: 24 },
                                        scrollBeyondLastLine: false,
                                        lineHeight: 1.7,
                                        overviewRulerBorder: false,
                                        hideCursorInOverviewRuler: true,
                                        renderLineHighlight: "all"
                                    }}
                                />
                            </div>

                            {/* Explicação por IA */}
                            {(!isEditing && (explanation || selectedSnippet)) && (
                                <div className="bg-[#F8F9FA] dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg p-[10px]">
                                    <div className="flex items-center gap-1 text-slate-400 mb-2">
                                        <Sparkles size={10} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Explicação por IA</span>
                                    </div>
                                    <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {explanation ? explanation : (
                                            <div className="flex items-center justify-between">
                                                <span>Clique abaixo para a IA analisar este código.</span>
                                                <button onClick={handleExplain} disabled={loadingAI} className="text-[#A8FF3E] text-[10px] font-bold bg-slate-900 px-2 py-1 rounded">
                                                    {loadingAI ? 'Analisando...' : 'Gerar'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Tags IA */}
                            {(!isEditing || isEditing) && (
                                <div className="bg-[#F8F9FA] dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg p-[10px]">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-1 text-slate-400">
                                            <Tag size={10} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Tags Geradas por IA</span>
                                        </div>
                                        {isEditing && (
                                            <button onClick={handleGenerateTags} disabled={loadingAI} className="text-[#A8FF3E] text-[9px] font-bold bg-slate-900 px-1.5 py-0.5 rounded">
                                                {loadingAI ? '...' : 'Auto'}
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {(isEditing ? formData.tags : selectedSnippet?.tags)?.map(tag => (
                                            <TagBadge key={tag} name={tag} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-400 dark:text-slate-600">
                        <Code size={48} className="mb-4 opacity-20" />
                        <p className="font-medium text-center text-sm max-w-[200px]">Selecione um snippet ou crie um novo para começar a editar.</p>
                    </div>
                )}
            </aside>

            {/* Modal de Nova Pasta */}
            {showFolderModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] px-4">
                    <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800/60 bg-[#f8faf8] dark:bg-[#0f172a] flex justify-between items-center shrink-0">
                            <h3 className="font-bold text-slate-800 dark:text-white">Criar Nova Pasta</h3>
                            <button onClick={() => setShowFolderModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <form onSubmit={submitCreateFolder} className="p-5">
                            <div className="mb-4">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Nome da Pasta</label>
                                <input
                                    type="text"
                                    required
                                    autoFocus
                                    value={newFolderName}
                                    onChange={e => setNewFolderName(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#A8FF3E] focus:ring-1 focus:ring-[#A8FF3E] text-slate-800 dark:text-slate-100"
                                    placeholder="Ex: Projetos React"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Cor da Pasta</label>
                                <div className="flex items-center gap-2">
                                    {FOLDER_COLORS.map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setNewFolderColor(color)}
                                            className={`w-6 h-6 rounded-full border-2 transition-transform ${newFolderColor === color ? 'scale-125 border-white dark:border-[#0f172a] ring-2 ring-slate-400 dark:ring-slate-600' : 'border-transparent hover:scale-110'}`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <button type="button" onClick={() => setShowFolderModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                    Cancelar
                                </button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium bg-[#A8FF3E] text-slate-900 rounded-lg hover:bg-[#9BEB39] transition-colors shadow-sm">
                                    Criar Pasta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
