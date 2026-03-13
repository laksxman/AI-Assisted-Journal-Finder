import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthContextProvider = ({ children }) => {
  const [userId, setUserId] = useState('demo-user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage or use demo
    const savedUserId = localStorage.getItem('journalUserId') || 'demo-user';
    setUserId(savedUserId);
    setLoading(false);
  }, []);

  const updateUserId = (newUserId) => {
    setUserId(newUserId);
    localStorage.setItem('journalUserId', newUserId);
  };

  return (
    <AuthContext.Provider value={{
      userId,
      updateUserId,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

