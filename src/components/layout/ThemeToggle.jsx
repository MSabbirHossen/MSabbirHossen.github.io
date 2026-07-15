import { HiMoon, HiSun } from 'react-icons/hi';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        relative
rounded-md
px-1
py-1
text-sm
font-medium
transition-all
duration-300
hover:text-accent-primary
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-accent-primary
focus-visible:ring-offset-2
focus-visible:ring-offset-white
dark:focus-visible:ring-offset-slate-900
      "
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
    </button>
  );
}
