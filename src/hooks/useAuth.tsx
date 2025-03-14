
import { useState, useCallback, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '@/lib/api';
import { toast } from 'sonner';

// Types
interface User {
  id: string;
  email: string;
  name?: string;
  [key: string]: any; // For additional user properties
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  
  // Check if user is already logged in
  const { data, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authAPI.getCurrentUser,
    retry: false,
    enabled: !!localStorage.getItem('auth_token'),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Update user data when query data changes
  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => 
      authAPI.login(email, password),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      setUser(data.user);
      toast.success('Successfully logged in');
      navigate('/');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  }, [loginMutation]);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setUser(null);
    queryClient.clear();
    toast.info('Logged out successfully');
    navigate('/login');
  }, [navigate, queryClient]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
