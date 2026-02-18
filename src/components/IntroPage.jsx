import { motion } from 'framer-motion';
import { Heart, Brain, ArrowRight, Sun, Moon, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import AboutPage from './AboutPage.jsx';
import ContactPage from './ContactPage.jsx';

// Single hero image – replace hero.jpg with your own if you like
const INTRO_IMAGE = new URL('./girlimage/hero.jpg', import.meta.url).href;

const IntroPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useApp();
  const [imageLoaded, setImageLoaded] = useState(false);

  const features = [
    { icon: Heart, title: 'Emotional Understanding', description: 'AI-powered emotion recognition', color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { icon: Brain, title: 'Intelligent Therapy', description: 'Personalized therapeutic guidance', color: 'text-violet-500', bg: 'bg-violet-500/10' },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-colors duration-500"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #0a0f1a 0%, #0f172a 50%, #0a0f1a 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%)'
      }}
    >
      {/* Theme Toggle & Credit Badge Placeholder (if needed) */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
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

      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
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

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen max-w-7xl mx-auto px-6 lg:px-12 py-12 gap-12">

        {/* Left - Content */}
        <motion.div
          className="lg:w-1/2 flex flex-col justify-center order-2 lg:order-1"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
          >
            Hello! I am <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-500">
              Puresoul, AI Therapist
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-lg md:text-xl mb-8 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
          >
            Your safe space for emotional healing and growth. Experience personalized therapy powered by advanced AI emotion recognition.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border backdrop-blur-sm transition-all hover:bg-white/5 ${theme === 'dark'
                  ? 'bg-white/5 border-white/10 hover:border-white/20'
                  : 'bg-white/60 border-slate-200 hover:border-blue-200 shadow-sm'
                  }`}
              >
                <div className={`p-3 rounded-xl ${feature.bg}`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <div>
                  <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg shadow-blue-500/25 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Begin Your Healing Journey
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
            <motion.button
              onClick={() => document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-full text-lg font-bold border transition-all ${theme === 'dark'
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
            >
              Learn More
            </motion.button>
          </div>

          <p className={`mt-4 text-sm text-center lg:text-left ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            Free to start • No credit card required
          </p>
        </motion.div>

        {/* Right - Image */}
        <motion.div
          className="lg:w-1/2 relative order-1 lg:order-2 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full max-w-md aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl group">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-teal-500/20 to-purple-500/20 blur-3xl opacity-50 group-hover:opacity-75 transition-opacity" />

            <div className={`absolute inset-0 border-[6px] rounded-[2.5rem] z-20 pointer-events-none ${theme === 'dark' ? 'border-white/10' : 'border-white/40'
              }`} />

            {!imageLoaded && (
              <div className={`absolute inset-0 flex items-center justify-center ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <div className="animate-pulse w-12 h-12 rounded-full bg-slate-300/20" />
              </div>
            )}

            <motion.img
              src={INTRO_IMAGE}
              alt="Calm, welcoming presence"
              className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onLoad={() => setImageLoaded(true)}
              initial={{ scale: 1.1 }}
              animate={{ scale: imageLoaded ? 1 : 1.1 }}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

            {/* Floating Badge */}
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm">Guided by Puresoul</p>
                  <p className="text-white/70 text-xs">A gentle space to pause</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white fill-white/50" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sections */}
      <div id="about-section" className="relative z-10">
        <AboutPage isSection={true} />
      </div>
      <div id="contact-section" className="relative z-10">
        <ContactPage isSection={true} />
      </div>

    </div>
  );
};

export default IntroPage;