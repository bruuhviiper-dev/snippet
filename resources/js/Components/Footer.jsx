export default function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f172a] pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-[#A8FF3E] text-slate-900 p-1.5 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">SnippetVault</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">O cofre inteligente definitivo para desenvolvedores modernos guardarem, buscarem e entenderem seus códigos usando o poder da IA.</p>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-4">Produto</h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                        <li><a href="/pricing" className="hover:text-accent transition">Preços</a></li>
                        <li><a href="#" className="hover:text-accent transition">Changelog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                        <li><a href="#" className="hover:text-accent transition">Termos de Uso</a></li>
                        <li><a href="#" className="hover:text-accent transition">Privacidade</a></li>
                        <li><a href="#" className="hover:text-accent transition">Contato</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                <p>&copy; {new Date().getFullYear()} SnippetVault. Todos os direitos reservados.</p>
                <div className="flex gap-4">
                    <span>Feito com Laravel, React & Stripe</span>
                </div>
            </div>
        </footer>
    );
}
