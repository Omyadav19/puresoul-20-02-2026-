import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, LogOut, Sun, Moon, LayoutDashboard, Database } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useCredits } from '../context/CreditContext.jsx';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, logout, user } = useApp();
  const { credits } = useCredits();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Pages where the global header should be hidden
  // (each of these pages has its own built-in header/nav)
  const hiddenRoutes = [
    '/',
    '/login',
    '/welcome',
    '/about',
    '/contact',
    '/emotion-detection',
    '/therapy-session',
    '/dashboard',
    '/mood-history',
    '/buy-credits',
  ];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${theme === 'dark'
        ? 'bg-[#0a0f1a]/80 border-white/10 text-white'
        : 'bg-white/80 border-slate-200 text-slate-800'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate(user ? '/dashboard' : '/')}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-gradient-to-br from-blue-500 to-teal-400 group-hover:scale-105 shadow-lg shadow-blue-500/20`}
          >
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <div className="font-bold text-lg tracking-tight">Puresoul AI</div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${location.pathname === '/dashboard'
              ? 'text-blue-500'
              : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>

          <Link
            to="/buy-credits"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${location.pathname === '/buy-credits'
              ? 'text-blue-500'
              : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
          >
            <Database className="w-4 h-4" />
            Credits: {credits}
          </Link>

          <div className="h-6 w-px bg-current opacity-10 mx-2" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all ${theme === 'dark'
              ? 'bg-white/10 hover:bg-white/20 text-yellow-400'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${theme === 'dark'
              ? 'bg-white/5 hover:bg-white/10 text-rose-400'
              : 'bg-rose-50 hover:bg-rose-100 text-rose-600'
              }`}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full p-4 border-b transition-colors ${theme === 'dark' ? 'bg-[#0a0f1a] border-white/10' : 'bg-white border-slate-200'
          }`}>
          <div className="flex flex-col gap-4">
            <Link to="/dashboard" className="p-2 font-medium" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            <Link to="/buy-credits" className="p-2 font-medium" onClick={() => setIsMenuOpen(false)}>Credits: {credits}</Link>
            <div className="h-px bg-current opacity-10" />
            <button onClick={() => { toggleTheme(); setIsMenuOpen(false); }} className="p-2 flex items-center gap-2 font-medium">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} Toggle Theme
            </button>
            <button onClick={handleLogout} className="p-2 flex items-center gap-2 font-medium text-rose-500">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
