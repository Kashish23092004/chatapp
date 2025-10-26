import React, { useState, createContext, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getInitialAuth = () => {
    const stored = localStorage.getItem("lonelyu");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Invalid auth data format:", error);
        localStorage.removeItem("lonelyu");
        return null;
      }
    }
    return null;
  };

  const [authUser, setAuthUser] = useState(getInitialAuth);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("lonelyu", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("lonelyu");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;