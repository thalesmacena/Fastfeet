import { ThemeContext } from '@/contexts/ThemeContext';
import { useContext } from 'react';
import { DarkSwitch, LightSwitch } from './styles';

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
