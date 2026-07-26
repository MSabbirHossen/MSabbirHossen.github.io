import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext();

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') ?? 'system';
  });
  const [systemTheme, setSystemTheme] = useState(() => getSystemTheme());

  const resolvedTheme = useMemo(
    () => (theme === 'system' ? systemTheme : theme),
    [systemTheme, theme]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);

    localStorage.setItem('portfolio-theme', theme);
  }, [resolvedTheme, theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
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
