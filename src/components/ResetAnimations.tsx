"use client";

import { useEffect } from 'react';
import useResetAnimation from '@/lib/hooks/useResetAnimation';

/**
 * Component that manages animation resets for key sections
 * This ensures animations trigger each time an element comes into view
 */
const ResetAnimations = () => {
  // Initialize animation resetting for different elements/sections
  
  // Animate motion elements
  useResetAnimation('[data-animate="motion"]', 'animate-in-view', { threshold: 0.2 });
  
  // Animate fade elements
  useResetAnimation('[data-animate="fade"]', 'animate-fade-in', { threshold: 0.2 });
  
  // Animate slide-up elements
  useResetAnimation('[data-animate="slide-up"]', 'animate-slide-up', { threshold: 0.2 });
  
  // Add custom CSS for the animations that are triggered on view
  useEffect(() => {
    // Add global styles for animations
    const style = document.createElement('style');
    style.innerHTML = `
      /* Base animation state - hidden initially */
      [data-animate="fade"] {
        opacity: 0;
        transition: opacity 0.8s ease-out;
      }
      [data-animate="slide-up"] {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
      }
      [data-animate="motion"] {
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
      }
      
      /* Animation triggered state */
      [data-animate="fade"].animate-fade-in {
        opacity: 1;
      }
      [data-animate="slide-up"].animate-slide-up {
        opacity: 1;
        transform: translateY(0);
      }
      [data-animate="motion"].animate-in-view {
        opacity: 1;
        transform: scale(1);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // This component doesn't render anything visible
  return null;
};

export default ResetAnimations; 