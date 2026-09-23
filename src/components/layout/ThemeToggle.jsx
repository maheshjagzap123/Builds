import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const STORAGE_KEY = 'mb.theme';

function savedTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch (_) { return null; }
}

function initialTheme() {
  if (typeof document === 'undefined') return 'dark';
  const current = document.documentElement.getAttribute('data-theme');
  return current === 'light' || current === 'dark' ? current : 'dark';
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (savedTheme()) return undefined;
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const syncSystemTheme = (event) => setTheme(event.matches ? 'light' : 'dark');
    media.addEventListener?.('change', syncSystemTheme);
    return () => media.removeEventListener?.('change', syncSystemTheme);
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (_) { /* storage may be unavailable */ }
  };

  const isLight = theme === 'light';
  return (
    <button type="button" className={`theme-toggle ${className}`} onClick={toggle} aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'} title={isLight ? 'Switch to dark theme' : 'Switch to light theme'} data-cursor="hover">
      {isLight ? <Moon size={17} strokeWidth={1.8} /> : <Sun size={17} strokeWidth={1.8} />}
    </button>
  );
}
