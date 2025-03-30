import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const savedPosition = localStorage.getItem('navScrollPosition');
      if (savedPosition) {
        scrollContainer.style.scrollBehavior = 'auto';
        scrollContainer.scrollLeft = parseInt(savedPosition, 10);
        // Reset scroll behavior after immediate scroll
        setTimeout(() => {
          scrollContainer.style.scrollBehavior = 'smooth';
        }, 0);
      }
    }
  }, [location.pathname]);  // Reset position when route changes

  const handleScroll = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      localStorage.setItem('navScrollPosition', String(scrollContainer.scrollLeft));
    }
  };

  return { scrollRef, handleScroll };
};
