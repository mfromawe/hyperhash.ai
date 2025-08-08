import { create } from 'zustand';

// Define the User interface based on AuthContext
interface User {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  emailVerified: boolean;
  plan: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
  subscription?: {
    planId: string;
    status: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  };
}

// Define the RegisterData interface based on AuthContext
interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}


interface UserPreferences {
  platform: string;
  style: string;
  language: string;
  location: string;
  theme: 'light' | 'dark' | 'system';
  recentGenerations: Array<{
    id: string;
    content: string;
    hashtags: string[];
    timestamp: Date;
    platform: string;
    style: string;
  }>;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

interface UserStore extends UserPreferences, AuthState {
  setPlatform: (platform: string) => void;
  setStyle: (style: string) => void;
  setLanguage: (language: string) => void;
  setLocation: (location: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  addGeneration: (generation: Omit<UserPreferences['recentGenerations'][0], 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

export const useUserStore = create<UserStore>()((set, get) => ({
  // User Preferences
  platform: 'instagram',
  style: 'organic',
  language: 'auto',
  location: 'global',
  theme: 'system',
  recentGenerations: [],

  // Auth State
  user: null,
  loading: true,

  // Preference Setters
  setPlatform: (platform: string) => set({ platform }),
  setStyle: (style: string) => set({ style }),
  setLanguage: (language: string) => set({ language }),
  setLocation: (location: string) => set({ location }),
  setTheme: (theme: 'light' | 'dark' | 'system') => set({ theme }),
  
  addGeneration: (generation: Omit<UserPreferences['recentGenerations'][0], 'id' | 'timestamp'>) => {
    const newGeneration = {
      ...generation,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    
    set((state: UserStore) => ({
      recentGenerations: [newGeneration, ...state.recentGenerations].slice(0, 10) // Keep only last 10
    }));
  },
  
  clearHistory: () => set({ recentGenerations: [] }),

  // Auth Actions
  checkAuth: async () => {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        set({ user: data.user });
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        set({ user: data.user });
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  register: async (registerData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.ok) {
        set({ user: data.user });
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      set({ user: null });
    } catch (error) {
      console.error('Logout error:', error);
      set({ user: null });
    }
  },
}));
