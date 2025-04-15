import React, { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

/**
 * PROGRESS UPDATE - 2024
 * - Removed problematic SVG overlay that was appearing on top of the footer
 * - Simplified component to show only the base footer image
 * - Maintained animation framework for future enhancements
 */

const FooterLogo: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const svgControls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      svgControls.start({
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { 
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1], // Nice cubic bezier easing
        }
      });
    }
  }, [isInView, svgControls]);

  // Animation variants for different screen sizes
  const svgVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.96, 
      filter: "blur(10px)" 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  // Path animation variants
  const pathVariants = {
    hidden: { 
      pathLength: 0, 
      fill: "rgba(0, 0, 0, 0)" 
    },
    visible: { 
      pathLength: 1, 
      fill: "rgba(0, 0, 0, 0)", // Changed to transparent fill
      transition: { 
        pathLength: { duration: 0, ease: "easeInOut" },
        fill: { duration: 0, ease: "easeInOut" }
      }
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Base image always visible */}
      <img 
        src="/images/dadson-footer.png" 
        alt="Dadson Logistics Logo"
        className="w-full h-auto"
      />
      
      {/* Removing the animated SVG overlay */}
    </div>
  );
};

export default FooterLogo; 