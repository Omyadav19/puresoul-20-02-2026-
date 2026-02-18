import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, ArrowLeft, Sun, Moon, Sparkles, MapPin, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const ContactPage = ({ isSection = false }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useApp();
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSent(true);
      setIsSubmitting(false);
      setTimeout(() => setSent(false), 5000);
    }, 1500);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-colors duration-500 pt-24 pb-12 px-6"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #0a0f1a 0%, #0f172a 50%, #0a0f1a 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%)'
      }}
    >
      {/* Theme Toggle */}
      {!isSection && (
        <div className="absolute top-6 right-6 z-50">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full backdrop-blur-md border shadow-lg transition-all ${theme === 'dark'
              ? 'bg-white/10 border-white/20 text-yellow-400'
              : 'bg-white/80 border-white/40 text-slate-700'
              }`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </div>
      )}

      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(59, 130, 246, ${Math.random() * 0.4 + 0.2})`,
              boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          >
            <Sparkles className="w-3 h-3 text-blue-300" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className={`h-full rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border backdrop-blur-xl flex flex-col justify-between ${theme === 'dark'
            ? 'bg-white/5 border-white/10'
            : 'bg-white/70 border-white/50'
            }`}
        >
          <div>
            <div className="flex items-center gap-6 mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 flex items-center justify-center shadow-lg shadow-blue-500/20"
              >
                <Mail className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                >
                  Contact Support
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}
                >
                  Questions, feedback, or partnerships
                </motion.p>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Email Us</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>puresoul3011@gmail.com</p>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>We'll respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            {!isSection && (
              <button
                onClick={() => navigate('/')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all w-max ${theme === 'dark'
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back Home
              </button>
            )}
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border backdrop-blur-xl ${theme === 'dark'
            ? 'bg-white/5 border-white/10'
            : 'bg-white/70 border-white/50'
            }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-bold mb-2 ml-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                Your Email
              </label>
              <input
                required
                type="email"
                placeholder="hello@example.com"
                className={`w-full px-6 py-4 rounded-xl border transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-500/20 ${theme === 'dark'
                  ? 'bg-black/20 border-white/10 text-white placeholder-slate-500'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                  }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-bold mb-2 ml-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                Message
              </label>
              <textarea
                required
                rows={6}
                placeholder="How can we help you today?"
                className={`w-full px-6 py-4 rounded-xl border transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-500/20 resize-none ${theme === 'dark'
                  ? 'bg-black/20 border-white/10 text-white placeholder-slate-500'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                  }`}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-all ${theme === 'dark'
                ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white'
                : 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                } ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl flex items-center gap-3 ${theme === 'dark' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                  }`}
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium text-sm">Message sent successfully! We'll be in touch soon.</span>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
