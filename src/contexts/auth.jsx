import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import api from "../services/api";
import AuthService from "../services/AuthService";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = () => {
    try {
      const storagedUser = localStorage.getItem("@HelloWorld:user");
      const storagedToken = localStorage.getItem("@HelloWorld:token");

      if (storagedUser && storagedToken) {
        setUser({ ...JSON.parse(storagedUser), token: storagedToken });
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);

      if (response?.user) {
        if (!response?.user?.isAdmin) {
          throw new Error(
            "Não autorizado. Você pode baixar o app para aprender lógica de programação :D"
          );
        }

        setUser({ ...response?.user, token: response?.token });

        api.defaults.headers.Authorization = `Baerer ${response?.token}`;

        localStorage.setItem(
          "@HelloWorld:user",
          JSON.stringify({
            name: response?.user.name,
            email: response?.user.email,
          })
        );
        localStorage.setItem("@HelloWorld:token", response?.token);
      } else {
        throw new Error("E-mail ou senha não encontrados");
      }
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user?.token,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, useAuth };
