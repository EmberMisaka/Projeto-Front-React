import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cadastrar, fazerLogin, decodeJWT, BackendRole } from '../services/api';

export type UserType = 'provider' | 'client' | 'admin';

interface User {
  id: string;
  email: string;
  username: string;
  type: UserType;
  photo?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<UserType | null>;
  register: (
    email: string,
    password: string,
    username: string,
    type: UserType,
    tecnologias?: string,
    photo?: string
  ) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function roleToUserType(role: BackendRole): UserType {
  if (role === 'provedor') return 'provider';
  if (role === 'ADM') return 'admin';
  return 'client';
}

function userTypeToRole(type: UserType): BackendRole {
  if (type === 'provider') return 'provedor';
  if (type === 'admin') return 'ADM';
  return 'contratante';
}

const STORAGE_TOKEN_KEY = 'tm_token';
const STORAGE_USER_KEY = 'tm_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_TOKEN_KEY);
    const storedUser = localStorage.getItem(STORAGE_USER_KEY);
    if (storedToken && storedUser) {
      const decoded = decodeJWT(storedToken);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } else {
        localStorage.removeItem(STORAGE_TOKEN_KEY);
        localStorage.removeItem(STORAGE_USER_KEY);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<UserType | null> => {
    const response = await fazerLogin({ email, senha: password });
    const decoded = decodeJWT(response.token);
    if (!decoded) return null;

    const userType = roleToUserType(decoded.role);
    const userData: User = {
      id: String(decoded.id),
      email,
      username: email.split('@')[0],
      type: userType,
    };

    localStorage.setItem(STORAGE_TOKEN_KEY, response.token);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userData));
    setToken(response.token);
    setUser(userData);
    return userType;
  };

  const register = async (
    email: string,
    password: string,
    username: string,
    type: UserType,
    tecnologias?: string,
    photo?: string
  ): Promise<boolean> => {
    const response = await cadastrar({
      nome: username,
      email,
      senha: password,
      role: userTypeToRole(type),
      tecnologias: tecnologias || undefined,
    });

    const userData: User = {
      id: String(response.usuario.id),
      email,
      username: response.usuario.nome,
      type: roleToUserType(response.usuario.role),
      photo,
    };

    const tokenRes = await fazerLogin({ email, senha: password });
    if (tokenRes.token) {
      localStorage.setItem(STORAGE_TOKEN_KEY, tokenRes.token);
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userData));
      setToken(tokenRes.token);
    }

    setUser(userData);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    localStorage.removeItem(STORAGE_USER_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
