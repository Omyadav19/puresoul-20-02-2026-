import React from 'react';
import { motion } from 'framer-motion';
import { useCredits } from '../../context/CreditContext';

const CreditProgress = () => {
    const { credits, totalCreditsPurchased } = useCredits();
    const initialMax = 12 + (totalCreditsPurchased || 0);
    const maxCredits = Math.max(credits, initialMax);
    const progress = maxCredits > 0 ? (credits / maxCredits) * 100 : 0;

    // Determine color based on remaining credits
    const getProgressColor = () => {
        if (credits <= 3) return 'bg-rose-500';
        if (credits <= 7) return 'bg-amber-500';
        return 'bg-blue-500';
    };

    const getGlowColor = () => {
        if (credits <= 3) return 'shadow-[0_0_10px_#f43f5e]';
        if (credits <= 7) return 'shadow-[0_0_10px_#f59e0b]';
        return 'shadow-[0_0_10px_#3b82f6]';
    };

    return (
        <div className="flex flex-col gap-1.5 w-full min-w-[140px] max-w-[180px]">
            <div className="flex justify-between items-center px-0.5">
                <span className="text-[9px] uppercase tracking-[0.1em] font-black text-white/40 whitespace-nowrap">
                    Energy Balance
                </span>
                <span className={`text-[10px] font-black whitespace-nowrap ${credits <= 3 ? 'text-rose-400' : 'text-blue-300'}`}>
                    {credits} <span className="text-white/20 font-medium">/</span> {maxCredits}
                </span>
            </div>

            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
                <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                    className={`h-full rounded-full ${getProgressColor()} ${getGlowColor()} transition-colors duration-500`}
                />
            </div>

            {credits <= 3 && credits > 0 && (
                <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] text-amber-400/80 font-medium italic animate-pulse px-1"
                >
                    Low credits! Conserving energy 😊
                </motion.p>
            )}

            {credits === 0 && (
                <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] text-rose-400 font-bold uppercase tracking-tighter px-1"
                >
                    Out of energy. Please recharge 💛
                </motion.p>
            )}
        </div>
    );
};

export default CreditProgress;
