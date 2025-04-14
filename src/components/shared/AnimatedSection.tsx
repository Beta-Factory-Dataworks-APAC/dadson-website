import React from 'react';
import AnimationWrapper from '@/lib/react-bits/AnimationWrapper';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animationType?: 'fade' | 'slide' | 'zoom' | 'bounce' | 'carousel';
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  className?: string;
  id?: string;
}

/**
 * AnimatedSection - A generic section wrapper with animation capabilities
 * 
 * This component uses the AnimationWrapper to apply animations to any content.
 * It's designed to be used for sections of content throughout the site.
 */
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animationType = 'fade',
  direction = 'up',
  duration = 0.5,
  delay = 0,
  className = '',
  id,
}) => {
  return (
    <section className={`w-full ${className}`} id={id}>
      <AnimationWrapper
        type={animationType}
        direction={direction}
        duration={duration}
        delay={delay}
      >
        {children}
      </AnimationWrapper>
    </section>
  );
};

export default AnimatedSection; 