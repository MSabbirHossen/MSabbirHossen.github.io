import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const ThemeProvider = ({ children }) => {
  const [resolvedTheme, setResolvedTheme] = useState('dark');

  // Initialize theme state from localStorage or default to 'system'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') ?? 'system';
  });

  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const activeTheme = getSystemTheme();

      setResolvedTheme(activeTheme);

      const root = document.documentElement;

      root.classList.remove('light', 'dark');
      root.classList.add(activeTheme);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const activeTheme = theme === 'system' ? getSystemTheme() : theme;
    setResolvedTheme(activeTheme);

    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
