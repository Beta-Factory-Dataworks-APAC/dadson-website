'use client';

/**
 * PROGRESS UPDATE - 2024
 * - Simplified truck animation with fluid motion and single deceleration
 * - Improved physics parameters for realistic truck movement
 * - Optimized for performance with GPU acceleration
 * - Added accessibility support with reduced motion preference detection
 */

import React, { useEffect, useState } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
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
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Simplified animation with natural truck movement
  // Phase 1: Gentle initial appearance with gradual fade-in
  // Phase 2: Single fluid movement with natural physics-based deceleration
  useEffect(() => {
    const animateSequence = async () => {
      if (hasAnimated) return;

      // Skip animation if user prefers reduced motion
      if (prefersReducedMotion) {
        controls.set({ x: 0, opacity: 1 });
        setHasAnimated(true);
        if (onComplete) onComplete();
        return;
      }

      // Wait for initial delay
      await new Promise(resolve => setTimeout(resolve, delay * 1000));
      
      // Initial fade in
      await controls.start({
        opacity: 1,
        transition: { duration: 0.7, ease: 'easeInOut' }
      });
      
      // Single fluid movement with natural physics-based deceleration
      await controls.start({
        x: '0%',
        transition: {
          type: 'spring',
          stiffness: 28,      // Lower stiffness for smooth deceleration
          damping: 30,        // Higher damping for minimal oscillation
          mass: 3.8,          // Higher mass for realistic truck weight
          velocity: -2,       // Initial velocity for natural entry
          duration: 2.5,      // Longer duration for smoother animation
          restDelta: 0.0001   // High precision at rest position
        }
      });
      
      setHasAnimated(true);
      if (onComplete) onComplete();
    };

    animateSequence();
  }, [controls, delay, hasAnimated, onComplete, prefersReducedMotion]);

  return (
    <motion.div
      initial={{ x: prefersReducedMotion ? 0 : '-120%', opacity: prefersReducedMotion ? 1 : 0 }}
      animate={controls}
      className={className}
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