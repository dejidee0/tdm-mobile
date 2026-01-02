import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = { id: string; name: string } | null;

export type AppContextType = {
  user: User;
  setUser: (u: User) => void;
  cartCount: number;
  setCartCount: (n: number) => void;
  themeMode: 'light' | 'dark';
  setThemeMode: (t: 'light' | 'dark') => void;
};

const defaultValue: AppContextType = {
  user: null,
  // noop defaults; real implementations from provider
  setUser: () => undefined,
  cartCount: 0,
  setCartCount: () => undefined,
  themeMode: 'light',
  setThemeMode: () => undefined,
};

const AppContext = createContext<AppContextType>(defaultValue);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  return (
    <AppContext.Provider value={{ user, setUser, cartCount, setCartCount, themeMode, setThemeMode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export default AppContext;
