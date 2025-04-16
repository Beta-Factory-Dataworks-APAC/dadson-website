"use client";

/**
 * PROGRESS UPDATE - 2024
 * - Converted to Client Component to support styled-jsx
 * - Integrated with improved TruckAnimation for smoother truck movement
 * - Optimized marquee animation performance
 */

import React from 'react';
import Image from 'next/image';
import TruckAnimation from '@/lib/react-bits/TruckAnimation';

const NoBotsBanner = () => {
  return (
    <div className="hidden md:block bg-white w-full overflow-hidden">
      {/* Scrolling Text Banner - with adjusted speed and styling for mobile */}
      <div className="relative overflow-hidden py-2 md:py-4">
        <div className="whitespace-nowrap animate-marquee-slower inline-block">
          <div className="inline-flex items-center text-[20px] sm:text-[28px] md:text-[60px] lg:text-[80px] font-bold tracking-tight leading-none font-clash">
            <span className="text-[#1A1A1A]">NO BOTS.&nbsp;</span>
            <span className="text-[#A0A0A0]">NO GUESSWORK.&nbsp;</span>
            <span className="text-[#1A1A1A]">JUST FREIGHT DONE RIGHT&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="text-[#1A1A1A]">NO BOTS.&nbsp;</span>
            <span className="text-[#A0A0A0]">NO GUESSWORK.&nbsp;</span>
            <span className="text-[#1A1A1A]">JUST FREIGHT DONE RIGHT&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>
      </div>

      {/* Content Section with Truck and Benefits */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative pb-10 sm:pb-12 md:pb-16 lg:pb-36">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-24 py-4 sm:py-6 md:py-8 lg:py-12 relative">
          {/* Left Column with Truck Image - Hidden on mobile, shown on larger screens */}
          <div className="flex-1 relative min-h-[300px] md:min-h-[340px] lg:min-h-[380px]">
            {/* Truck Image with specialized animation */}
            <TruckAnimation
              src="/truck.png"
              alt="Dadson Logistics Truck"
              width={1000}
              height={500}
              className="absolute left-[-20%] md:left-[-30%] lg:left-[-40%] bottom-[-60px] md:bottom-[-90px] lg:bottom-[-120px] w-[120%] md:w-[130%] lg:w-[150%] h-auto z-10"
              priority
              delay={0.5}
            />
          </div>

          {/* Mobile Truck Image - Only visible on mobile, improved placement */}
          <div className="hidden relative w-full h-[140px] sm:h-[160px] mb-3 sm:mb-4">
            <TruckAnimation
              src="/truck.png"
              alt="Dadson Logistics Truck"
              width={600}
              height={300}
              className="absolute left-[-5%] top-[0px] w-[120%]"
              priority
              delay={0.5}
            />
          </div>

          {/* Right Content Column */}
          <div className="flex-1 flex flex-col md:pt-4 lg:pt-8">
            {/* Title and Description - improved readability on mobile */}
            <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12 ml-0 lg:ml-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 sm:mb-3 md:mb-4 uppercase font-clash tracking-tight leading-tight">
                WE DON'T JUST<br />
                BOOK LOADS.<br />
                BUILD TRUST.
              </h2>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-2 sm:mb-3 md:mb-4 font-satoshi">
                Certified. Vetted. Verified.
              </h3>
              <p className="text-gray-700 text-sm md:text-base font-satoshi max-w-[90%] md:max-w-[95%] lg:max-w-none">
                We're proud members of the Transportation Intermediaries Association (TIA) and the Better Business Bureau (BBB)—proof of our commitment to service, safety, and integrity.
              </p>
            </div>

            {/* Benefits - improved spacing for mobile */}
            <div className="flex flex-col gap-2.5 sm:gap-3 md:gap-4 lg:gap-6 font-satoshi">
              <div className="flex items-start">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-1.5 sm:mt-2 mr-3"></div>
                <h4 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl">Carrier Vetting That Doesn't Miss <span className="font-normal text-gray-600 text-xs sm:text-sm md:text-base">— We use smart tools and trained compliance specialists to vet every carrier before a load is moved.</span></h4>
              </div>
              <div className="flex items-start">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-1.5 sm:mt-2 mr-3"></div>
                <h4 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl">Every Load, Tracked <span className="font-normal text-gray-600 text-xs sm:text-sm md:text-base">— Tracking is always active—and always shared—so customers know where things stand.</span></h4>
              </div>
              <div className="flex items-start">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-1.5 sm:mt-2 mr-3"></div>
                <h4 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl">Carrier-First Culture <span className="font-normal text-gray-600 text-xs sm:text-sm md:text-base">— Loyal carriers mean dependable coverage. We treat them like partners, not transactions.</span></h4>
              </div>
              <div className="flex items-start">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-1.5 sm:mt-2 mr-3"></div>
                <h4 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl">Radical Ownership <span className="font-normal text-gray-600 text-xs sm:text-sm md:text-base">— We treat every load like it's our own. Because your freight is our reputation.</span></h4>
              </div>
              <div className="flex items-start">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-1.5 sm:mt-2 mr-3"></div>
                <h4 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl">Zero Ghosting <span className="font-normal text-gray-600 text-xs sm:text-sm md:text-base">— We don't disappear when things get tough. We lean in and solve it.</span></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoBotsBanner; 