import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'classic' | 'modern' | 'ocean';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('ocean');

  const toggleTheme = () => {
    setThemeState(prev => {
      if (prev === 'classic') return 'modern';
      if (prev === 'modern') return 'ocean';
      return 'classic';
    });
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div className={`${theme === 'modern' ? 'dark' : ''} ${theme === 'ocean' ? 'ocean-theme' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};