"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, AuthResponse, googleAuth, authUtils } from "@/api/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      // First check localStorage
      const localUser = authUtils.getUser();
      const localToken = authUtils.getToken();

      if (localUser && localToken) {
        setUser(localUser);
        
        // Verify with server
        const response = await googleAuth.checkAuthStatus();
        if (response.success && response.user) {
          setUser(response.user);
          if (response.token) {
            authUtils.saveAuthData(response.token, response.user);
          }
        } else {
          // Token invalid, clear local data
          authUtils.clearAuthData();
          setUser(null);
        }
      } else {
        // No local data, check server
        const response = await googleAuth.checkAuthStatus();
        if (response.success && response.user) {
          setUser(response.user);
          if (response.token) {
            authUtils.saveAuthData(response.token, response.user);
          }
        }
      }
    } catch (error) {
      console.error("Auth status check failed:", error);
      authUtils.clearAuthData();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const { emailAuth } = await import("@/api/auth");
      const response = await emailAuth.login(email, password);
      
      if (response.success && response.user) {
        setUser(response.user);
        if (response.token) {
          authUtils.saveAuthData(response.token, response.user);
        }
      }
      
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        message: "Đăng nhập thất bại",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = () => {
    // This will redirect to Google OAuth
    googleAuth.initiateLogin();
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { logout: logoutApi } = await import("@/api/auth");
      await logoutApi();
      
      // Clear local state
      authUtils.clearAuthData();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear local state even if server logout fails
      authUtils.clearAuthData();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    loginWithGoogle,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Hook for protected routes
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login page or show login modal
      window.location.href = "/";
    }
  }, [isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
}
