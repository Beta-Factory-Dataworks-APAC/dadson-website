import React from 'react';
import AnimatedHeading from '@/components/shared/AnimatedHeading';
import AnimatedSection from '@/components/shared/AnimatedSection';

/**
 * ContactDemo - A demonstration component for animation components
 * 
 * This component uses the AnimatedHeading and AnimatedSection components
 * to demonstrate different animation types available in the project.
 */
const ContactDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Main heading */}
        <AnimatedHeading 
          size="h1" 
          animationType="fade"
          className="text-primary-dark mb-16 text-center"
        >
          Animation Demo
        </AnimatedHeading>
        
        {/* Fade animation */}
        <AnimatedSection 
          animationType="fade" 
          className="mb-20 bg-primary-navy text-white p-10 rounded-lg"
        >
          <AnimatedHeading 
            size="h2" 
            className="mb-6 text-white"
          >
            Fade Animation
          </AnimatedHeading>
          <p className="font-satoshi">
            This section uses a simple fade animation. It's suitable for content that should 
            appear subtly without drawing too much attention to the animation itself.
          </p>
        </AnimatedSection>
        
        {/* Slide animation */}
        <AnimatedSection 
          animationType="slide" 
          direction="left"
          className="mb-20 bg-[rgba(0,180,225,0.05)] p-10 rounded-lg"
        >
          <AnimatedHeading 
            size="h2" 
            animationType="slide"
            direction="left"
            className="mb-6"
          >
            Slide Animation
          </AnimatedHeading>
          <p className="font-satoshi">
            This section slides in from the left. Slide animations are great for creating a sense 
            of movement and drawing attention to newly revealed content.
          </p>
        </AnimatedSection>
        
        {/* Zoom animation */}
        <AnimatedSection 
          animationType="zoom"
          className="mb-20 bg-[rgba(3,3,61,0.05)] p-10 rounded-lg"
        >
          <AnimatedHeading 
            size="h2" 
            animationType="zoom"
            className="mb-6"
          >
            Zoom Animation
          </AnimatedHeading>
          <p className="font-satoshi">
            This section zooms in from a slightly smaller size. Zoom animations can create a sense
            of depth and are effective for highlighting important information.
          </p>
        </AnimatedSection>
        
        {/* Bounce animation */}
        <AnimatedSection 
          animationType="bounce"
          className="mb-20 bg-[rgba(0,180,225,0.1)] p-10 rounded-lg"
        >
          <AnimatedHeading 
            size="h2" 
            animationType="bounce"
            className="mb-6"
          >
            Bounce Animation
          </AnimatedHeading>
          <p className="font-satoshi">
            This section uses a bounce animation. Bounce effects add a playful, energetic feel
            and can be used to draw strong attention to key elements.
          </p>
        </AnimatedSection>
        
        {/* Different delays */}
        <AnimatedSection 
          className="mb-20 bg-[rgba(3,3,61,0.1)] p-10 rounded-lg"
        >
          <AnimatedHeading 
            size="h2" 
            className="mb-10 text-center"
          >
            Sequenced Animations
          </AnimatedHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedSection 
              animationType="slide" 
              direction="up"
              delay={0}
              className="bg-white p-6 rounded shadow-form"
            >
              <h3 className="font-satoshi font-medium text-[24px] mb-3">No Delay</h3>
              <p className="font-satoshi">This item appears immediately when the section is in view.</p>
            </AnimatedSection>
            
            <AnimatedSection 
              animationType="slide" 
              direction="up"
              delay={0.2}
              className="bg-white p-6 rounded shadow-form"
            >
              <h3 className="font-satoshi font-medium text-[24px] mb-3">Short Delay</h3>
              <p className="font-satoshi">This item appears after a short delay (0.2s).</p>
            </AnimatedSection>
            
            <AnimatedSection 
              animationType="slide" 
              direction="up"
              delay={0.4}
              className="bg-white p-6 rounded shadow-form"
            >
              <h3 className="font-satoshi font-medium text-[24px] mb-3">Longer Delay</h3>
              <p className="font-satoshi">This item appears after a longer delay (0.4s).</p>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ContactDemo; 