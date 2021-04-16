import { ThemeContext } from '@/contexts/ThemeContext';
import { DarkSwitch, LightSwitch } from '@/styles/components/ThemeSwitch';
import { useContext } from 'react';

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      {theme === 'light' ? (
        <LightSwitch size={24} onClick={() => toggleTheme()} />
      ) : (
        <DarkSwitch size={24} onClick={() => toggleTheme()} />
      )}
    </>
  );
};
