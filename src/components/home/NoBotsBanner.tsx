"use client";

/**
 * PROGRESS UPDATE - 2024
 * - Converted to Client Component to support styled-jsx
 * - Integrated with improved TruckAnimation for smoother truck movement
 * - Optimized marquee animation performance
 * - Added support for animation reset on viewport visibility change
 * - Hybrid approach: Uses direct Framer Motion for desktop and static image fallback for mobile
 */

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';
// Import TruckAnimation for mobile view
import TruckAnimation from '@/lib/react-bits/TruckAnimation';

const NoBotsBanner = () => {
  const truckRef = useRef(null);
  const mobileTruckRef = useRef(null);
  const inView = useInView(truckRef, { once: false, amount: 0.3 });
  const mobileInView = useInView(mobileTruckRef, { once: false, amount: 0.3 });

  return (
    <div className="w-full overflow-hidden bg-white relative">
      
      {/* Scrolling Text Banner - with adjusted speed and styling for mobile */}
      <div className="relative overflow-hidden py-2 md:py-3 lg:py-4 mb-4 md:mb-6 lg:mb-8">
        <div className="whitespace-nowrap animate-marquee-slower inline-block">
          <div className="inline-flex items-center text-[20px] sm:text-[28px] md:text-[60px] lg:text-[80px] font-bold tracking-tight leading-none font-clash">
            <span className="text-[#1A1A1A]">NO BOTS.&nbsp;</span>
            <span className="text-[#A0A0A0]">NO GUESSWORK.&nbsp;</span>
            <span className="text-[#1A1A1A]">JUST FREIGHT DONE RIGHT.&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="text-[#1A1A1A]">NO BOTS.&nbsp;</span>
            <span className="text-[#A0A0A0]">NO GUESSWORK.&nbsp;</span>
            <span className="text-[#1A1A1A]">JUST FREIGHT DONE RIGHT&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>
      </div>

      {/* Content Section with Truck and Benefits */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative pb-8 sm:pb-10 md:pb-12 lg:pb-16">
        {/* DESKTOP LAYOUT - Using direct Framer Motion (current implementation) */}
        <div className="hidden md:flex flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 py-4 sm:py-6 md:py-8 lg:py-10 relative">
          {/* Left Side: Trust Content */}
          <div className="w-1/2 flex flex-col relative pr-4 md:pr-6 lg:pr-8">
            <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 md:mb-5 uppercase font-clash tracking-tight leading-tight">
                WE DON'T JUST<br />
                BOOK LOADS.<br />
                BUILD TRUST.
              </h2>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-3 sm:mb-4 font-satoshi">
                Certified. Vetted. Verified.
              </h3>
              <p className="text-gray-700 text-sm md:text-base font-satoshi max-w-[90%] md:max-w-[95%] lg:max-w-none">
                We're proud members of the Transportation Intermediaries Association (TIA) and the Better Business Bureau (BBB)—proof of our commitment to service, safety, and integrity.
              </p>
            </div>
            
            {/* Truck Image - Using Framer Motion for smooth scroll-triggered animation */}
            <div className="relative h-[220px] md:h-[280px] lg:h-[320px] w-full overflow-visible" ref={truckRef}>
              <motion.div 
                className="absolute left-0 bottom-0 w-[105%] h-auto z-10"
                initial={{ opacity: 0, x: "-100%" }}
                animate={inView ? { opacity: 1, x: "0%" } : { opacity: 0, x: "-100%" }}
                transition={{ 
                  duration: 2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3
                }}
              >
                <div className="px-2 md:px-0">
                  <Image
                    src="/images/truck.png"
                    alt="Dadson Logistics Truck"
                    width={600}
                    height={300}
                    className="w-full h-auto object-contain transform scale-85 md:scale-95 lg:scale-100"
                    priority
                    quality={90}
                    onError={(e) => {
                      console.error('Image failed to load');
                      const target = e.target as HTMLElement;
                      if (target) {
                        target.classList.add('bg-red-200');
                      }
                    }}
                    onLoad={() => console.log('Image loaded successfully')}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Benefits */}
          <div className="w-1/2 flex flex-col justify-start pl-4 md:pl-6 lg:pl-8">
            {/* Benefits section with enhanced visual design */}
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7 font-satoshi mt-0">
              {/* AI-Based Carrier Vetting */}
              <div className="benefit-card p-4 sm:p-5 border border-gray-100 rounded-xl hover:border-[#00B4E1] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="min-w-[10px] h-[10px] rounded-full bg-[#00B4E1] mt-2"></div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl text-gray-900">
                      AI-Based Carrier Vetting
                    </h4>
                    <p className="font-normal text-gray-600 text-xs sm:text-sm md:text-base">
                      Smarter safety, fewer surprises
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Load Visibility */}
              <div className="benefit-card p-4 sm:p-5 border border-gray-100 rounded-xl hover:border-[#00B4E1] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="min-w-[10px] h-[10px] rounded-full bg-[#00B4E1] mt-2"></div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl text-gray-900">
                      Live Load Visibility
                    </h4>
                    <p className="font-normal text-gray-600 text-xs sm:text-sm md:text-base">
                      GPS tracking with predictive ETA
                    </p>
                  </div>
                </div>
              </div>

              {/* Carrier First Culture */}
              <div className="benefit-card p-4 sm:p-5 border border-gray-100 rounded-xl hover:border-[#00B4E1] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="min-w-[10px] h-[10px] rounded-full bg-[#00B4E1] mt-2"></div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl text-gray-900">
                      Carrier First Culture
                    </h4>
                    <p className="font-normal text-gray-600 text-xs sm:text-sm md:text-base">
                      Loyal carriers mean dependable coverage
                    </p>
                  </div>
                </div>
              </div>

              {/* Radical Ownership */}
              <div className="benefit-card p-4 sm:p-5 border border-gray-100 rounded-xl hover:border-[#00B4E1] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="min-w-[10px] h-[10px] rounded-full bg-[#00B4E1] mt-2"></div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl text-gray-900">
                      Radical Ownership
                    </h4>
                    <p className="font-normal text-gray-600 text-xs sm:text-sm md:text-base">
                      We treat every load like it's our own
                    </p>
                  </div>
                </div>
              </div>

              {/* Zero Ghosting */}
              <div className="benefit-card p-4 sm:p-5 border border-gray-100 rounded-xl hover:border-[#00B4E1] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="min-w-[10px] h-[10px] rounded-full bg-[#00B4E1] mt-2"></div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl text-gray-900">
                      Zero Ghosting
                    </h4>
                    <p className="font-normal text-gray-600 text-xs sm:text-sm md:text-base">
                      We don't disappear when things get tough
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE LAYOUT - Using static image positioned for reliability */}
        <div className="md:hidden flex flex-col py-4 gap-6">
          {/* Mobile header content */}
          <div className="mb-6 px-1">
            <h2 className="text-[22px] sm:text-[26px] font-semibold mb-3 uppercase font-clash tracking-tight leading-tight">
              WE DON'T JUST<br />
              BOOK LOADS.<br />
              BUILD TRUST.
            </h2>
            <h3 className="text-[16px] sm:text-[18px] font-medium mb-3 font-satoshi">
              Certified. Vetted. Verified.
            </h3>
            <p className="text-gray-700 text-[14px] sm:text-[15px] font-satoshi leading-relaxed max-w-[95%]">
              We're proud members of the Transportation Intermediaries Association (TIA) and the Better Business Bureau (BBB)—proof of our commitment to service, safety, and integrity.
            </p>
          </div>

          {/* Simple static truck image for mobile - Guaranteed to be visible */}
          <div className="relative w-full h-[160px] sm:h-[180px] flex justify-center items-center my-2 sm:my-4">
            <div className="w-[95%] max-w-[350px]">
              <img
                src="/images/truck.png"
                alt="Dadson Logistics Truck"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          
          {/* Mobile benefits with improved spacing */}
          <div className="flex flex-col gap-3 sm:gap-4 font-satoshi mt-2 px-1">
            <div className="benefit-card-mobile p-3 sm:p-4 border border-gray-100 rounded-lg hover:border-[#00B4E1] transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-1.5"></div>
                <div className="flex flex-col">
                  <h4 className="font-medium text-[15px] sm:text-[16px] text-gray-900">AI-Based Carrier Vetting</h4>
                  <p className="font-normal text-gray-600 text-[13px] sm:text-[14px] mt-0.5">Smarter safety, fewer surprises</p>
                </div>
              </div>
            </div>

            <div className="benefit-card-mobile p-3 sm:p-4 border border-gray-100 rounded-lg hover:border-[#00B4E1] transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-1.5"></div>
                <div className="flex flex-col">
                  <h4 className="font-medium text-[15px] sm:text-[16px] text-gray-900">Live Load Visibility</h4>
                  <p className="font-normal text-gray-600 text-[13px] sm:text-[14px] mt-0.5">GPS tracking with predictive ETA</p>
                </div>
              </div>
            </div>

            <div className="benefit-card-mobile p-3 sm:p-4 border border-gray-100 rounded-lg hover:border-[#00B4E1] transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-1.5"></div>
                <div className="flex flex-col">
                  <h4 className="font-medium text-[15px] sm:text-[16px] text-gray-900">Carrier First Culture</h4>
                  <p className="font-normal text-gray-600 text-[13px] sm:text-[14px] mt-0.5">Loyal carriers mean dependable coverage</p>
                </div>
              </div>
            </div>

            <div className="benefit-card-mobile p-3 sm:p-4 border border-gray-100 rounded-lg hover:border-[#00B4E1] transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-1.5"></div>
                <div className="flex flex-col">
                  <h4 className="font-medium text-[15px] sm:text-[16px] text-gray-900">Radical Ownership</h4>
                  <p className="font-normal text-gray-600 text-[13px] sm:text-[14px] mt-0.5">We treat every load like it's our own</p>
                </div>
              </div>
            </div>

            <div className="benefit-card-mobile p-3 sm:p-4 border border-gray-100 rounded-lg hover:border-[#00B4E1] transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-1.5"></div>
                <div className="flex flex-col">
                  <h4 className="font-medium text-[15px] sm:text-[16px] text-gray-900">Zero Ghosting</h4>
                  <p className="font-normal text-gray-600 text-[13px] sm:text-[14px] mt-0.5">We don't disappear when things get tough</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoBotsBanner; 