import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserType = 'provider' | 'client';

interface User {
  id: string;
  email: string;
  username: string;
  type: UserType;
  photo?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: UserType) => Promise<boolean>;
  register: (email: string, password: string, username: string, type: UserType, photo?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'provider@example.com',
    username: 'DevPro',
    type: 'provider',
  },
  {
    id: '2',
    email: 'client@example.com',
    username: 'TechClient',
    type: 'client',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, type: UserType): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = mockUsers.find(u => u.email === email && u.type === type);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = async (
    email: string,
    password: string,
    username: string,
    type: UserType,
    photo?: string
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email,
      username,
      type,
      photo,
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
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
