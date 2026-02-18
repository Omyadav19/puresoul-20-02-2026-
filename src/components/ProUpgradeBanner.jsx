// src/components/ProUpgradeBanner.jsx
// Shown to free users to encourage upgrading to Pro.

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, X, CheckCircle, Loader2 } from 'lucide-react';
import { upgradeToPro } from '../utils/proApi';
import { useApp } from '../context/AppContext.jsx';

const FEATURES = [
    'Persistent therapy sessions saved forever',
    'Full conversation history & memory',
    'AI remembers your past sessions',
    'Resume any previous conversation',
    'Unlimited session archive',
];

/**
 * @param {object}   props
 * @param {boolean}  props.isOpen    Show/hide the banner
 * @param {Function} props.onClose   Close callback
 * @param {string}   props.theme     'dark' | 'light'
 */
const ProUpgradeBanner = ({ isOpen, onClose, theme = 'dark' }) => {
    const { setUser, user } = useApp();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const isDark = theme === 'dark';

    const handleUpgrade = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await upgradeToPro();
            const updatedUser = { ...data.user, is_pro: true };
            // Persist so AppContext reads is_pro correctly after reload
            localStorage.setItem('userData', JSON.stringify(updatedUser));
            // Update the user in global context so UI reflects Pro status immediately
            setUser((prev) => ({ ...prev, ...updatedUser }));
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 2000);
        } catch (err) {
            setError('Upgrade failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="pro-upgrade-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        initial={{ scale: 0.85, y: 40, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.85, y: 40, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden ${isDark ? 'bg-[#0f0f1a] border border-white/10' : 'bg-white border border-slate-200'
                            }`}
                    >
                        {/* Gradient top bar */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400" />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${isDark ? 'text-white/40 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                                }`}
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="p-8">
                            {/* Icon + title */}
                            <div className="flex flex-col items-center text-center mb-6">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4"
                                >
                                    <Crown className="w-8 h-8 text-white" />
                                </motion.div>
                                <h2 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                    Upgrade to Pro
                                </h2>
                                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                                    Unlock persistent memory & full session history
                                </p>
                            </div>

                            {/* Features list */}
                            <ul className="space-y-3 mb-8">
                                {FEATURES.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.07 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                        <span className={`text-sm ${isDark ? 'text-white/80' : 'text-slate-700'}`}>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Error */}
                            {error && (
                                <p className="text-red-400 text-xs text-center mb-4">{error}</p>
                            )}

                            {/* CTA */}
                            <motion.button
                                onClick={handleUpgrade}
                                disabled={loading || success}
                                whileHover={!loading && !success ? { scale: 1.03 } : {}}
                                whileTap={!loading && !success ? { scale: 0.97 } : {}}
                                className={`w-full py-4 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${success
                                    ? 'bg-green-500 shadow-green-500/30'
                                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-purple-500/30'
                                    } disabled:opacity-70`}
                            >
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                                ) : success ? (
                                    <><CheckCircle className="w-4 h-4" /> You're now Pro! 🎉</>
                                ) : (
                                    <><Sparkles className="w-4 h-4" /> Activate Pro Now</>
                                )}
                            </motion.button>

                            <p className={`text-center text-[10px] mt-3 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>
                                Demo mode — no payment required
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProUpgradeBanner;
