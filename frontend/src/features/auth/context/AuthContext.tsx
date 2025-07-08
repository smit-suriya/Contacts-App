import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { getCurrentUser } from "../services/authApi";

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null, token: string | null) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getCurrentUser();
        setUserState(res);
      } catch (error) {
        setUserState(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const setUser = (newUser: User | null, token: string | null) => {
    setUserState(newUser);

    if (token) {
      // store token in localStorage or cookies
      localStorage.setItem("token", token);
    } else {
      // remove token from localStorage or cookies
      localStorage.removeItem("token");
    }

    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
