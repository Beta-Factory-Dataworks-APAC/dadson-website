'use client';

import React from 'react';
import AnimationWrapper from '@/lib/react-bits/AnimationWrapper';

interface AnimatedHeadingProps {
  children: React.ReactNode;
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  animationType?: 'fade' | 'slide' | 'zoom' | 'bounce';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

/**
 * AnimatedHeading - A reusable heading component with animation
 * 
 * Accepts different heading sizes and animation types, with customizable delays
 * and directions. Applies standardized typography from the design system.
 */
const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  children,
  size = 'h2',
  animationType = 'fade',
  direction = 'up',
  delay = 0,
  className = '',
}) => {
  // Map of heading sizes to corresponding Tailwind classes based on design system
  const sizeClasses = {
    h1: 'font-clash font-medium uppercase text-[80px] leading-[1.125]', // Headline as per specs
    h2: 'font-clash font-medium uppercase text-[42px] leading-[1.19]',  // Section header as per specs
    h3: 'font-satoshi font-medium text-[24px] leading-[1.35]',          // Secondary heading as per specs
    h4: 'font-satoshi font-medium text-[20px] leading-[1.35]',
    h5: 'font-satoshi font-medium text-[18px] leading-[1.33]',
    h6: 'font-satoshi font-medium text-[16px] leading-[1.35]',
  };

  // Combine the base classes for the heading size with any additional classes
  const headingClasses = `${sizeClasses[size]} ${className}`;

  // Create the appropriate heading element based on the size prop
  const renderHeading = () => {
    switch (size) {
      case 'h1':
        return <h1 className={headingClasses}>{children}</h1>;
      case 'h2':
        return <h2 className={headingClasses}>{children}</h2>;
      case 'h3':
        return <h3 className={headingClasses}>{children}</h3>;
      case 'h4':
        return <h4 className={headingClasses}>{children}</h4>;
      case 'h5':
        return <h5 className={headingClasses}>{children}</h5>;
      case 'h6':
      default:
        return <h6 className={headingClasses}>{children}</h6>;
    }
  };

  return (
    <AnimationWrapper
      type={animationType}
      direction={direction}
      delay={delay}
    >
      {renderHeading()}
    </AnimationWrapper>
  );
};

export default AnimatedHeading; 