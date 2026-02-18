import { createContext, useContext, useState } from 'react';
import { verifySessionToken } from '../utils/auth.js';

const AppContext = createContext(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check for existing session on app load
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const verifiedUser = verifySessionToken(token);
        // Merge is_pro from localStorage (saved at login)
        const storedUser = JSON.parse(localStorage.getItem('userData') || '{}');
        return { ...verifiedUser, is_pro: storedUser.is_pro || false };
      } catch (error) {
        console.warn('Token verification failed, clearing invalid token:', error.message);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        return null;
      }
    }
    return null;
  });
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [therapySessions, setTherapySessions] = useState([]);
  const [sadDetectionCount, setSadDetectionCount] = useState(0);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const addEmotionData = (emotion) => {
    setEmotionHistory(prev => [...prev, emotion]);
  };

  const addTherapySession = (session) => {
    setTherapySessions(prev => [...prev, session]);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  // Debug user state
  console.log('AppContext user state:', user ? { id: user.id, username: user.username } : 'null');
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        logout,
        currentEmotion,
        setCurrentEmotion,
        emotionHistory,
        addEmotionData,
        therapySessions,
        addTherapySession,
        sadDetectionCount,
        setSadDetectionCount,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};