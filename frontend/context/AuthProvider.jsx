import React, { useState, createContext, useContext } from 'react';
import cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = cookies.get("just") || localStorage.getItem("lonelyu");

  let parsedState;
  try {
    parsedState = initialState ? JSON.parse(initialState) : undefined;
  } catch (error) {
    console.error("Invalid auth data format:", error);
    parsedState = undefined;
  }

  const [authUser, setAuthUser] = useState(parsedState);


  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;