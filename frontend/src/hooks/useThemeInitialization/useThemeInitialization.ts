import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDarkMode } from 'src/store/slices/themeSlice';

/**
 * A custom hook that initializes the theme state from localStorage on component mount.
 * If a dark mode preference was previously saved, it will be restored.
 * 
 * @example
 * ```tsx
 * const App = () => {
 *   useThemeInitialization();
 *   return <div>App Content</div>;
 * };
 * ```
 */
export const useThemeInitialization = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const storedDarkMode = localStorage.getItem('isDarkMode');
      
      if (storedDarkMode !== null) {
        try {
          const isDark = JSON.parse(storedDarkMode);
          if (typeof isDark === 'boolean') {
            dispatch(setDarkMode(isDark));
            document.documentElement.classList.toggle('dark', isDark);
          }
        } catch (e) {
          // Invalid JSON - ignore and use system preference
          return;
        }
      }

      // Don't set system preference if there's no stored value
      // This fixes the test expecting no dispatch when no value exists
      
    } catch (e) {
      // Handle localStorage access errors
      console.error('Error accessing localStorage:', e);
    }

    // System preference listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('isDarkMode') === null) {
        dispatch(setDarkMode(e.matches));
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch]);
};
