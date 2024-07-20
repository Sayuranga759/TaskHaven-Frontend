import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Create the context
const AuthContext = createContext({ auth: null, setAuth: () => {} });

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();
    

   useEffect(() => {
    const storedAuth = Cookies.get('auth');
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;


