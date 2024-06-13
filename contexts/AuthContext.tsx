import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { save, getValueFor, deleteValueFor } from '../services/storage';
import { router } from 'expo-router';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
}

interface User {
  username: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userToken = await getValueFor('userToken');
      if (userToken) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userToken));
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
    await save('userToken', JSON.stringify(userData));
    router.navigate('/')
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    await deleteValueFor('userToken');
    router.navigate('/')
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
