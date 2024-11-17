import { useEffect, useRef } from "react";

/**
 * A custom hook that locks/unlocks scrolling of the page body
 * When locked, it fixes the body position and stores the scroll position
 * When unlocked, it restores the original scroll position
 * 
 * @param isOpen - Boolean flag to determine if scroll should be locked (true) or unlocked (false)
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const [isMenuOpen, setIsMenuOpen] = useState(false);
 *   useScrollLock(isMenuOpen);
 *   return <div>...</div>
 * }
 * ```
 */
export const useScrollLock = (isOpen: boolean) => {
  const wasLocked = useRef(document.body.style.position === 'fixed');

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      wasLocked.current = true;
    } else if (wasLocked.current) {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, Math.abs(parseInt(scrollY || '0', 10)));
      wasLocked.current = false;
    }
  }, [isOpen]);
};