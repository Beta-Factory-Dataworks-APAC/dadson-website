import { useEffect, useRef } from 'react';

interface UseResetAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * A hook to reset animations when elements leave and re-enter the viewport
 * This allows animations to be triggered each time an element comes into view
 */
export default function useResetAnimation(
  selector: string,
  animationClass: string,
  options: UseResetAnimationOptions = {}
) {
  const { threshold = 0.2, rootMargin = "0px" } = options;
  const observedElements = useRef<Map<Element, boolean>>(new Map());
  
  useEffect(() => {
    // Find all elements matching the selector
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;
    
    // Initialize the observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target;
          
          if (entry.isIntersecting) {
            // Element is in view, add the animation class
            element.classList.add(animationClass);
            // Mark as observed (in view)
            observedElements.current.set(element, true);
          } else {
            // Element is out of view, only remove the class if it was previously in view
            if (observedElements.current.get(element)) {
              element.classList.remove(animationClass);
              // Reset the animation by forcing a reflow
              void (element as HTMLElement).offsetWidth;
            }
          }
        });
      },
      { threshold, rootMargin }
    );
    
    // Start observing all matching elements
    elements.forEach((element) => {
      observer.observe(element);
      observedElements.current.set(element, false);
    });
    
    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [selector, animationClass, threshold, rootMargin]);
} 