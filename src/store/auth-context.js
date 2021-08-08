import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [checkLogin, setCheckLogin] = useState(false);

  useEffect(() => {
    const storedLoggedInfo = localStorage.getItem('UserLogged');

    if (storedLoggedInfo === 'True') {
      setCheckLogin(true);
    }
  }, []);

  const loginHandler = () => {
    localStorage.setItem('UserLogged', 'True');
    setCheckLogin(true);
  };

  const logOutHandler = () => {
    localStorage.removeItem('UserLogged');
    setCheckLogin(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: checkLogin,
        onLogin: loginHandler,
        onLogout: logOutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
