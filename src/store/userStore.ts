import { create } from 'zustand';

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

interface UserStore extends UserPreferences {
  setPlatform: (platform: string) => void;
  setStyle: (style: string) => void;
  setLanguage: (language: string) => void;
  setLocation: (location: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  addGeneration: (generation: Omit<UserPreferences['recentGenerations'][0], 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  platform: 'instagram',
  style: 'organic',
  language: 'auto',
  location: 'global',
  theme: 'system',
  recentGenerations: [],
  
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
}));
