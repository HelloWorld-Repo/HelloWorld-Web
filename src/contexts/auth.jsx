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

/*
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

import themeModes from '../enums/themeModes';
import api from '../services/api';
import AuthService from '../services/AuthService';

const ApplicationContext = createContext({});

const ApplicationProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeModes.LIGHT);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isRendered = true;

    if (isRendered) {
      loadStorageData();
    }

    return () => {
      isRendered = false;
    };
  }, []);

  const loadStorageData = async () => {
    try {
      const storagedUser = await AsyncStorage.getItem('@HelloWorld:user');
      const storagedToken = await AsyncStorage.getItem('@HelloWorld:token');

      if (storagedUser && storagedToken) {
        setUser({ ...JSON.parse(storagedUser), token: storagedToken });
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setUserFeedback = async () => {
    const newUser = { ...user, askForFeedback: false };
    setUser(newUser);
    await AsyncStorage.setItem('@HelloWorld:user', JSON.stringify(newUser));
  };

  const signIn = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);

      if (response?.user) {
        setUser({ ...response?.user, token: response?.token });

        api.defaults.headers.Authorization = `Baerer ${response?.token}`;

        await AsyncStorage.setItem(
          '@HelloWorld:user',
          JSON.stringify(response?.user)
        );
        await AsyncStorage.setItem('@HelloWorld:token', response?.token);
      } else {
        throw new Error('E-mail ou senha não encontrados');
      }
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  const updateUser = async (newUser) => {
    await AsyncStorage.setItem('@HelloWorld:user', JSON.stringify(newUser));
    setUser({ ...newUser, token: user.token });
  };
  const increaseUserLevel = async () => {
    const newUser = { ...user, level: (user.level || 0) + 1 };
    await AsyncStorage.setItem('@HelloWorld:user', JSON.stringify(newUser));
    setUser(newUser);
  };

  return (
    <ApplicationContext.Provider
      value={{
        isSigned: !!user?.token,
        user,
        theme,
        setTheme,
        signIn,
        signOut,
        setUserFeedback,
        updateUser,
        increaseUserLevel,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

ApplicationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useApplicationProvider = () => useContext(ApplicationContext);

export { ApplicationContext, ApplicationProvider, useApplicationProvider };

*/
