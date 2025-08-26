import React, { createContext, useContext, useState, ReactNode } from 'react';
import apiClient from '../api/apiClient';
import { setToken } from '../utils/token';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string
  ) => Promise<boolean>;
  getuser:()=>Promise<any>
  logout: () => void;
}

interface LoginResponse {
  access_token: string;
  user: User;
}

interface SignupResponse {
  user: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // ---------------- LOGIN ----------------
  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) return false;

    try {
      const { data } = await apiClient.post<LoginResponse>('/login', { email, password });
      console.log(data, 'LOGIN RESPONSE');

      setToken(data.access_token); // Save token (probably to localStorage)
      setUser(data.user); // Save logged-in user
      return true;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  // ---------------- SIGNUP ----------------
  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string
  ): Promise<boolean> => {
    if (!firstName || !lastName || !email || !password || !phone) return false;

    try {
      const { data } = await apiClient.post<SignupResponse>('/register', {
        firstName,
        lastName,
        phone,
        email,
        password,
      });

      console.log(data, 'SIGNUP RESPONSE');
      setUser(data.user);
      return true;
    } catch (err) {
      console.error('Signup error:', err);
      return false;
    }
  };

  const getuser = async (): Promise<any> => {
  try {
    const { data } = await apiClient.get('/users/profile');
    setUser(data);
    return null;
  } catch (err) {
    return err;
  }
};
  // ---------------- LOGOUT ----------------
  const logout = () => {
    setUser(null);
    setToken(''); // Clear token from storage
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        getuser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
