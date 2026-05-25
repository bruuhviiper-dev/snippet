import { usePage } from '@inertiajs/react';

export default function AdBanner({ slotId = "XXXXXX", format = "auto", style = { display: 'block' } }) {
    const { auth } = usePage().props;

    // Se o usuário tem o plano Pro, não renderiza anúncios
    if (auth.user?.plan === 'pro') {
        return null;
    }

    return (
        <div className="bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex flex-col items-center justify-center my-4 overflow-hidden relative min-h-[100px]">
            <span className="absolute top-2 right-2 text-[10px] uppercase font-bold tracking-widest text-slate-400">Ad</span>
            {/* Simulador visual de Anúncio para ambiente local */}
            <div className="text-slate-400 dark:text-slate-600 text-sm font-medium">
                Espaço para Google AdSense
                <br />
                <span className="text-xs font-normal opacity-70">Slot: {slotId}</span>
            </div>
            
            {/* O script real do AdSense entraria aqui
            <ins className="adsbygoogle"
                style={style}
                data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive="true"></ins>
            */}
        </div>
    );
}
