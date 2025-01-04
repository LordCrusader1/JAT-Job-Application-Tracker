import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext to store authentication information
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage (to persist on page reload)
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null, // Check localStorage for token
    user: JSON.parse(localStorage.getItem('user')) || null, // Initialize user from localStorage
  });

  const login = (user, token) => {
    setAuth({ user, token });
    localStorage.setItem('token', token); // Save token to localStorage
    localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  useEffect(() => {
    // Whenever the app is loaded or the token changes, check localStorage
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setAuth({ user: JSON.parse(storedUser), token: storedToken });
      console.log('Auth initialized:', { user: JSON.parse(storedUser), token: storedToken });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};




