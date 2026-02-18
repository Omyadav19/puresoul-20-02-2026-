import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Users, Sparkles, Shield, Brain, ArrowLeft, Sun, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const AboutPage = ({ isSection = false }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useApp();

  const features = [
    {
      icon: Heart,
      title: "Real-time Emotion Detection",
      desc: "Non-intrusive, adaptive recognition from video input.",
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    },
    {
      icon: Brain,
      title: "Personalized Therapy Journeys",
      desc: "Adaptive conversations tailored to your progress.",
      color: "text-violet-500",
      bg: "bg-violet-500/10"
    },
    {
      icon: Shield,
      title: "Privacy & Safety",
      desc: "Data-first privacy approach and secure interactions.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    }
  ];

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
        {[...Array(20)].map((_, i) => (
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

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border backdrop-blur-xl ${theme === 'dark'
            ? 'bg-white/5 border-white/10'
            : 'bg-white/70 border-white/50'
            }`}
        >
          <div className="flex items-center gap-6 mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 flex items-center justify-center shadow-lg shadow-blue-500/20"
            >
              <Heart className="w-10 h-10 text-white fill-white" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
              >
                About Puresoul AI
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}
              >
                Empathy-first AI for emotional wellbeing
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                What we do
              </h2>
              <p className={`leading-relaxed text-lg mb-8 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                Puresoul AI blends advanced emotion recognition with personalized conversational
                therapy tools to help users understand their feelings and build healthier habits.
                We prioritize privacy, safety, and accessibility.
              </p>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all hover:bg-white/5 ${theme === 'dark'
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/60 border-slate-200 shadow-sm'
                      }`}
                  >
                    <div className={`p-3 rounded-xl ${feature.bg}`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Our approach
              </h2>
              <p className={`leading-relaxed text-lg mb-8 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                We combine clinical best-practices with interpretable machine learning to provide
                helpful suggestions, reflective prompts, and emotion-aware interventions. The system
                is designed to complement human care and provide accessible support between sessions.
              </p>

              <div className={`p-6 rounded-2xl border ${theme === 'dark'
                ? 'bg-emerald-500/10 border-emerald-500/20'
                : 'bg-emerald-50 border-emerald-200'
                }`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-500">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-emerald-200' : 'text-emerald-800'}`}>
                    Community & Support
                  </h3>
                </div>
                <p className={theme === 'dark' ? 'text-emerald-200/80' : 'text-emerald-600'}>
                  Resources and community features coming soon. Join us in building a safe space for mental health awareness.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex items-center justify-between flex-wrap gap-6 pt-8 border-t border-white/10"
          >
            {!isSection && (
              <button
                onClick={() => navigate('/')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${theme === 'dark'
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back Home
              </button>
            )}
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
              Want to learn more? Visit the <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate('/contact')}>Contact page</span>.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
