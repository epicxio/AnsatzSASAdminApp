import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'school_admin' | 'corporate_admin' | 'student' | 'teacher' | 'parent' | 'employee' | 'department_head' | 'hrbp';
  organizationName?: string;
  photoURL?: string;  // For profile image
  department?: string;
  position?: string;
  employeeId?: string;
  schoolName?: string;
  gradeLevel?: string;
  studentId?: string;
  subjects?: string[];
  children?: string[];
  class?: string;
  status?: 'active' | 'inactive';
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  organizationName: string;
  adminType: 'school' | 'corporate';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check local storage or make API call to verify session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signup = useCallback(async (data: SignUpData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        email: data.email,
        name: data.name,
        role: data.adminType === 'school' ? 'school_admin' : 'corporate_admin',
        organizationName: data.organizationName,
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        role: 'student',
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/signup');
  }, [navigate]);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 