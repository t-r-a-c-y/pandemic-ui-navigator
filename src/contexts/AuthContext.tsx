
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  dob?: string;
  healthStatus?: 'normal' | 'at-risk' | 'infected' | 'recovered';
  vaccinationStatus?: 'none' | 'partial' | 'fully-vaccinated' | 'boosted';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('pandemicnet_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock implementation - in a real app, this would make an API call
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll accept any credentials with proper format
      if (!email.includes('@') || password.length < 6) {
        throw new Error('Invalid credentials');
      }
      
      // Create a mock user
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substring(2),
        name: email.split('@')[0],
        email: email,
        healthStatus: 'normal',
        vaccinationStatus: 'boosted',
      };
      
      // Save to localStorage and state
      localStorage.setItem('pandemicnet_user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast({
        title: "Login successful",
        description: "Welcome back to PandemicNet"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock implementation - in a real app, this would make an API call
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate inputs
      if (!name || !email.includes('@') || password.length < 6) {
        throw new Error('Invalid signup details');
      }
      
      // Create a mock user
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substring(2),
        name,
        email,
        healthStatus: 'normal',
        vaccinationStatus: 'none',
      };
      
      // Save to localStorage and state
      localStorage.setItem('pandemicnet_user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast({
        title: "Account created",
        description: "Welcome to PandemicNet"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An unknown error occurred"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('pandemicnet_user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out"
    });
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) throw new Error('Not authenticated');
    
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('pandemicnet_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error instanceof Error ? error.message : "An unknown error occurred"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
