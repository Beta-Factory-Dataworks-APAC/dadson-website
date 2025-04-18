'use client';

/**
 * PROGRESS UPDATE - 2024
 * - Simplified truck animation with fluid motion and single deceleration
 * - Improved physics parameters for realistic truck movement
 * - Optimized for performance with GPU acceleration
 * - Added accessibility support with reduced motion preference detection
 * - Added viewport detection to reset and replay animation when in view
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimationControls, useReducedMotion, useInView } from 'framer-motion';
import Image from 'next/image';

/**
 * TruckAnimation - A specialized animation component for truck slide-in with natural deceleration
 * Uses Framer Motion directly as it requires custom animation physics
 * Respects user preferences for reduced motion
 */
interface TruckAnimationProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  delay?: number;
  onComplete?: () => void;
}

const TruckAnimation: React.FC<TruckAnimationProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  delay = 0.3,
  onComplete,
}) => {
  const controls = useAnimationControls();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 }); // Reduced threshold for mobile
  const prefersReducedMotion = useReducedMotion();
  const [previouslyInView, setPreviouslyInView] = useState(false);

  useEffect(() => {
    const animateSequence = async () => {
      if (prefersReducedMotion) {
        controls.set({ x: 0, opacity: 1 });
        if (onComplete) onComplete();
        return;
      }

      if (isInView) {
        if (!previouslyInView) {
          await controls.set({ x: '-120%', opacity: 0 });
          await new Promise(resolve => setTimeout(resolve, delay * 1000));
          
          await controls.start({
            opacity: 1,
            transition: { duration: 0.7, ease: 'easeInOut' }
          });
          
          await controls.start({
            x: '0%',
            transition: {
              type: 'spring',
              stiffness: 28,
              damping: 30,
              mass: 3.8,
              velocity: -2,
              duration: 2.5,
              restDelta: 0.0001
            }
          });
          
          if (onComplete) onComplete();
        }
        setPreviouslyInView(true);
      } else {
        setPreviouslyInView(false);
      }
    };

    animateSequence();
  }, [controls, delay, isInView, onComplete, prefersReducedMotion, previouslyInView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ x: prefersReducedMotion ? 0 : '-120%', opacity: prefersReducedMotion ? 1 : 0 }}
      animate={controls}
      className={`${className} relative`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-contain"
        priority={priority}
      />
    </motion.div>
  );
};

export default TruckAnimation; 