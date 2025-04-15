'use client';

/**
 * PROGRESS UPDATE - 2024
 * - Enhanced truck animation with 5-phase movement for ultra-smooth motion
 * - Added progressive acceleration and deceleration with custom easing curves
 * - Improved physics parameters for realistic truck movement
 * - Optimized for performance with GPU acceleration
 * - Added accessibility support with reduced motion preference detection
 */

import React, { useEffect, useState } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

/**
 * TruckAnimation - A specialized animation component for truck slide-in with braking effect
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

  // Multi-phase animation for more realistic and smooth truck movement
  // Phase 1: Gentle initial appearance with soft acceleration
  // Phase 2: Smooth acceleration to cruising speed
  // Phase 3: Steady movement
  // Phase 4: Early deceleration phase
  // Phase 5: Final precise braking with subtle settling
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
      
      // Initial fade in - more gradual
      await controls.start({
        opacity: 1,
        transition: { duration: 0.4, ease: 'easeInOut' }
      });
      
      // Phase 1: Gentle initial entry - softer start
      await controls.start({
        x: '-90%',
        transition: {
          duration: 0.6,
          ease: [0.12, 0.06, 0.17, 0.99] // Custom easing for very gentle start
        }
      });
      
      // Phase 2: Smooth acceleration
      await controls.start({
        x: '-65%',
        transition: {
          duration: 0.5,
          ease: [0.33, 0.1, 0.5, 1.0] // Smooth acceleration curve
        }
      });
      
      // Phase 3: Steady cruising movement
      await controls.start({
        x: '-35%',
        transition: {
          duration: 0.6,
          ease: [0.4, 0.0, 0.6, 1.0] // Slightly eased linear movement
        }
      });
      
      // Phase 4: Early deceleration
      await controls.start({
        x: '-15%',
        transition: {
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1.0] // Starting to slow down
        }
      });
      
      // Phase 5: Final braking with realistic physics and subtle settling
      await controls.start({
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 40,    // Even lower stiffness for less bounce
          damping: 22,      // Higher damping for smoother stop
          mass: 2.2,        // Heavier mass for more realistic truck inertia
          velocity: -2,     // Lower initial velocity for gentler approach
          duration: 1.5,    // Longer duration for smoother final braking
          restDelta: 0.0005 // Higher precision at rest position
        }
      });
      
      setHasAnimated(true);
      if (onComplete) onComplete();
    };

    animateSequence();
  }, [controls, delay, hasAnimated, onComplete, prefersReducedMotion]);

  return (
    <motion.div
      initial={{ x: prefersReducedMotion ? 0 : '-110%', opacity: prefersReducedMotion ? 1 : 0 }}
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