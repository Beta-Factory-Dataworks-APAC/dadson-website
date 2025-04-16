"use client";

import React from 'react';
import Image from 'next/image';

const ThreeImageSection = () => {
  return (
    <section className="hidden md:block pb-8 sm:pb-12 md:pb-16 pt-4 sm:pt-8 md:pt-12 bg-white">
      <div className="w-full">
        {/* Mobile vertical layout - hidden now as it's handled by HomeMobileBanner */}
        <div className="hidden">
          {/* Section Title - Mobile only */}
          <div className="text-center mb-4">
            <h2 className="text-xl sm:text-2xl font-medium font-clash text-gray-900">
              FREIGHT SOLUTIONS
            </h2>
            <p className="text-sm text-gray-500 font-satoshi mt-1">Full-service logistics solutions</p>
          </div>
          
          {/* First Image - Mobile Vertical */}
          <div className="relative w-full h-[220px] sm:h-[240px] rounded-[24px] overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-[1.02]">
            <Image 
              src="/images/home/home1.png" 
              alt="Shipping containers stacked at port" 
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white text-base font-medium font-clash uppercase">Port Logistics</h3>
              <p className="text-white/90 text-xs font-satoshi mt-1">Container handling & port operations</p>
            </div>
          </div>
          
          {/* Second Image - Mobile Vertical */}
          <div className="relative w-full h-[220px] sm:h-[240px] rounded-[24px] overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-[1.02]">
            <Image 
              src="/images/home/home2.png" 
              alt="Freight train traveling through snowy mountains" 
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white text-base font-medium font-clash uppercase">Rail Transport</h3>
              <p className="text-white/90 text-xs font-satoshi mt-1">Efficient rail freight solutions</p>
            </div>
          </div>
          
          {/* Third Image - Mobile Vertical */}
          <div className="relative w-full h-[220px] sm:h-[240px] rounded-[24px] overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-[1.02]">
            <Image 
              src="/images/home/home3.png" 
              alt="Cargo being loaded onto aircraft" 
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white text-base font-medium font-clash uppercase">Air Freight</h3>
              <p className="text-white/90 text-xs font-satoshi mt-1">Expedited air cargo services</p>
            </div>
          </div>
        </div>

        {/* Desktop/tablet continuous curved container */}
        <div className="relative w-full overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
          {/* Grid container for images with slight gap */}
          <div className="grid grid-cols-3 gap-1">
            {/* First Image - Desktop - Using consistent aspect ratio */}
            <div 
              className="relative w-full aspect-[4/3]" 
              style={{ 
                borderTopLeftRadius: '65%', 
                borderBottomLeftRadius: '3%',
                overflow: 'hidden' 
              }}
            >
              <Image 
                src="/images/home/home1.png" 
                alt="Shipping containers stacked at port" 
                fill
                sizes="33vw"
                className="object-cover"
                priority
              />
            </div>
            
            {/* Second Image - Desktop - Using same aspect ratio */}
            <div 
              className="relative w-full aspect-[4/3]"
              style={{ 
                overflow: 'hidden' 
              }}
            >
              <Image 
                src="/images/home/home2.png" 
                alt="Freight train traveling through snowy mountains" 
                fill
                sizes="33vw"
                className="object-cover"
                priority
              />
            </div>
            
            {/* Third Image - Desktop - Using same aspect ratio */}
            <div 
              className="relative w-full aspect-[4/3]" 
              style={{ 
                borderTopRightRadius: '65%', 
                borderBottomRightRadius: '3%',
                overflow: 'hidden' 
              }}
            >
              <Image 
                src="/images/home/home3.png" 
                alt="Cargo being loaded onto aircraft" 
                fill
                sizes="33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeImageSection; 