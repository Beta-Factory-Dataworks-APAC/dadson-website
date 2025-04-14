import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimationWrapper serves as a compatibility layer between Framer Motion (currently used)
 * and React Bits (to be implemented).
 * 
 * This will simplify the future migration to React Bits once it's properly set up.
 * 
 * TODO: Replace Framer Motion implementations with React Bits once it's installed via jsrepo.
 */

interface AnimationWrapperProps {
  children: React.ReactNode;
  type: 'fade' | 'slide' | 'zoom' | 'bounce' | 'carousel';
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  className?: string;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  type,
  direction = 'up',
  duration = 0.5,
  delay = 0,
  className = '',
}) => {
  // Animation configurations based on type
  const animations = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: {
        opacity: 0,
        x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
        y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
      },
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    bounce: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 15,
          duration,
          delay,
        }
      },
    },
    carousel: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  // Choose the animation configuration based on the specified type
  const animation = animations[type];

  // For bounce, we've defined a custom transition
  const transition = type === 'bounce' 
    ? undefined 
    : { duration, delay, ease: 'easeOut' };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={animation}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper; 