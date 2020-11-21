import React, { useContext, createContext, useState } from "react";

const userAuth = {
    isAuthenticated: false,
    signin(cb) {
      userAuth.isAuthenticated = true;
      setTimeout(cb, 100);
    },
    signout(cb) {
        userAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = cb => {
    return userAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = cb => {
    return userAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}

