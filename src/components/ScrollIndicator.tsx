"use client";

import { useEffect, useState } from 'react';

const ScrollIndicator = () => {
  const [hasScrollableSections, setHasScrollableSections] = useState(false);

  useEffect(() => {
    // Simple check if any sections need scrolling
    const checkScrollability = () => {
      const sections = Array.from(document.querySelectorAll('section'));
      const viewportHeight = window.innerHeight;
      
      // Check if any section is taller than viewport
      const hasScrollable = sections.some(section => {
        const sectionHeight = section.getBoundingClientRect().height;
        return sectionHeight > viewportHeight * 1.1;
      });
      
      setHasScrollableSections(hasScrollable);
    };
    
    // Initial check
    checkScrollability();
    
    // Recheck on resize
    window.addEventListener('resize', checkScrollability);
    
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);
  
  if (!hasScrollableSections) return null;
  
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-500 mb-2">Scroll to read more</span>
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center items-start p-1">
          <div className="w-1.5 h-3 bg-[#00B4E1] rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator; 