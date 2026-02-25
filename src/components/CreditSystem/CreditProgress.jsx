import { motion, AnimatePresence } from 'framer-motion';
import { useCredits } from '../../context/CreditContext';
import { useApp } from '../../context/AppContext';

const CreditProgress = () => {
    const { user } = useApp();
    const { credits, totalCreditsPurchased } = useCredits();

    // Determine base credits by user tier
    const isPro = user?.is_pro;
    const isProPlus = user?.is_pro_plus;
    const baseCredits = isProPlus ? 120 : (isPro ? 48 : 12);

    const maxCredits = baseCredits + (totalCreditsPurchased || 0);
    const progress = Math.min((credits / maxCredits) * 100, 100);

    // Determine color based on remaining credits percentage
    const getProgressColor = () => {
        if (progress <= 20) return 'bg-rose-500';
        if (progress <= 50) return 'bg-amber-500';
        return 'bg-blue-500';
    };

    const getGlowColor = () => {
        if (progress <= 20) return 'shadow-[0_0_10px_#f43f5e]';
        if (progress <= 50) return 'shadow-[0_0_10px_#f59e0b]';
        return 'shadow-[0_0_10px_#3b82f6]';
    };

    return (
        <div className="flex flex-col gap-1.5 w-full min-w-[140px] max-w-[180px]">
            <div className="flex justify-between items-end px-1 leading-none">
                <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-tighter font-black text-white/30">
                        Energy Limit
                    </span>
                    <span className="text-sm font-black text-white/90">
                        {maxCredits}
                    </span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[9px] uppercase tracking-tighter font-black text-white/30">
                        Balance
                    </span>
                    <span className={`text-sm font-black ${progress <= 20 ? 'text-rose-400' : 'text-blue-300'}`}>
                        {credits}
                    </span>
                </div>
            </div>

            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
                <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                    className={`h-full rounded-full ${getProgressColor()} ${getGlowColor()} transition-colors duration-500`}
                />
            </div>

            <AnimatePresence>
                {credits <= 3 && credits > 0 && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[8px] text-amber-400/80 font-bold italic animate-pulse px-1 text-right"
                    >
                        Low energy! ⚡
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CreditProgress;
