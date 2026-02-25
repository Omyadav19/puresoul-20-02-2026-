import React from 'react';
import { motion } from 'framer-motion';
import { useCredits } from '../../context/CreditContext';

const CreditProgress = () => {
    const { credits, totalCreditsPurchased } = useCredits();
    const maxCredits = 12 + (totalCreditsPurchased || 0);
    const progress = (credits / maxCredits) * 100;

    // Determine color based on remaining credits
    const getProgressColor = () => {
        if (credits <= 2) return 'bg-rose-500';
        if (credits <= 5) return 'bg-amber-500';
        return 'bg-blue-400';
    };

    const getGlowColor = () => {
        if (credits <= 2) return 'shadow-[0_0_10px_#f43f5e]';
        if (credits <= 5) return 'shadow-[0_0_10px_#f59e0b]';
        return 'shadow-[0_0_10px_#60a5fa]';
    };

    return (
        <div className="flex flex-col gap-1.5 w-full max-w-[140px] px-2">
            <div className="flex flex-col leading-tight">
                <div className="flex justify-between items-baseline">
                    <span className="text-[9px] uppercase tracking-tighter font-black text-white/40">
                        Energy
                    </span>
                    <span className="text-[11px] font-black text-blue-300">
                        {maxCredits} <span className="text-white/20">/</span>
                    </span>
                </div>
                <div className="flex justify-between items-baseline -mt-0.5">
                    <span className="text-[9px] uppercase tracking-tighter font-black text-white/40">
                        Balance
                    </span>
                    <span className={`text-[11px] font-black ${credits <= 3 ? 'text-rose-400' : 'text-blue-100'}`}>
                        {credits}
                    </span>
                </div>
            </div>

            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                    className={`h-full rounded-full ${getProgressColor()} ${getGlowColor()} transition-colors duration-500`}
                />
            </div>
        </div>
    );
};

export default CreditProgress;
