import React from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

/**
 * AnimationWrapper - A reusable animation component that provides consistent animations
 * This component acts as a compatibility layer for future migration to React Bits
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be animated
 * @param {string} props.type - Animation type (fade, slide, zoom, etc.)
 * @param {string} props.direction - Direction for slide animations (up, down, left, right)
 * @param {number} props.delay - Delay before animation starts (in seconds)
 * @param {number} props.duration - Duration of the animation (in seconds)
 * @param {boolean} props.once - Whether to animate only once when in view
 */
const AnimationWrapper = ({
  children,
  type = 'fade',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  once = false,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'zoom' | 'bounce';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  [key: string]: any;
}) => {
  const ref = React.useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { 
    once,
    amount: 0.3 // Trigger when 30% of element is in view
  });

  // Define animation variants based on type
  const getVariants = () => {
    switch (type) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case 'slide':
        const offset = 50;
        const directions = {
          up: { y: offset },
          down: { y: -offset },
          left: { x: offset },
          right: { x: -offset }
        };
        return {
          hidden: { opacity: 0, ...directions[direction] },
          visible: { opacity: 1, x: 0, y: 0 }
        };
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'bounce':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 15,
              delay
            }
          }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  const variants = getVariants();

  // Handle animation state based on viewport visibility
  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ 
        duration, 
        delay, 
        ease: 'easeOut',
        // Ensure immediate reset when hiding
        hidden: { duration: 0, delay: 0 }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper; 