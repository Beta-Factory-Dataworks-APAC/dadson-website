"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative">
      <section className="relative w-full h-[580px] sm:h-[600px] md:h-[700px] lg:h-[840px] xl:h-[1040px] overflow-hidden rounded-[16px] md:rounded-[20px] mt-[15px]">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/truck-bg.png"
            alt="Dadson Logistics truck on highway"
            fill
            priority
            quality={90}
            className="object-cover object-[center_30%] sm:object-[center_15%] lg:object-center"
          />
          {/* Gradient overlay - stronger at bottom for text */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
        </div>

        {/* Content container - mobile optimized */}
        <div className="relative z-10 flex flex-col justify-between w-full h-full px-4 md:px-6 text-white">
          {/* Main headline - pushed down further */}
          <div className="w-full max-w-[1224px] mx-auto pt-[160px] xs:pt-[170px] sm:pt-[80px] md:pt-[120px] lg:pt-[140px] xl:pt-[160px] text-center">
            <h1 className="font-clash font-medium text-[26px] xs:text-[30px] sm:text-[40px] md:text-[48px] lg:text-[60px] xl:text-[70px] leading-[1.1] uppercase tracking-[0.02em]">
              <div className="mb-0.5 sm:mb-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
                Trusted Freight Solutions.
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                Backed by Real People.
              </div>
            </h1>
          </div>

          {/* CTA and tagline wrapper - closer to bottom */}
          <div className="w-full max-w-[92%] xs:max-w-[90%] sm:max-w-[600px] mx-auto mt-auto pb-8 text-center">
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-3">
              <Link 
                href="/quote" 
                className="w-full sm:w-[280px] h-[44px] xs:h-[46px] sm:h-[52px] md:h-[56px] flex justify-center items-center py-2 sm:py-3 md:py-3.5 px-5 md:px-6 rounded-[6px] bg-[rgba(0,180,225,0.9)] hover:bg-[rgba(0,180,225,1)] text-white font-clash font-semibold text-[14px] xs:text-[15px] sm:text-[16px] md:text-[17px] leading-[1.2] shadow-[0px_4px_34px_rgba(0,180,225,0.15)] shadow-[inset_0px_-5px_12px_0px_rgba(255,255,255,0.15)] backdrop-blur-[22px] transition-colors duration-300"
              >
                GET A QUOTE
              </Link>
              <Link 
                href="https://mycarrierpackets.com/a3d4024a-30a7-41f2-8173-f0adc5b9abc5/Carrier/Intellivite/Dadson%20logistics%20inc" 
                className="w-full sm:w-[280px] h-[44px] xs:h-[46px] sm:h-[52px] md:h-[56px] flex justify-center items-center py-2 sm:py-3 md:py-3.5 px-5 md:px-6 rounded-[6px] bg-white/10 hover:bg-white/15 text-white font-clash font-semibold text-[14px] xs:text-[15px] sm:text-[16px] md:text-[17px] leading-[1.2] outline outline-1 outline-stone-50/10 backdrop-blur-[22px] transition-colors duration-300"
              >
                BECOME A CARRIER
              </Link>
            </div>
            
            {/* Tagline */}
            <p className="font-satoshi font-medium text-[12px] xs:text-[13px] sm:text-[15px] md:text-[16px] leading-[1.3] sm:leading-[1.5] text-white/90 max-w-[240px] xs:max-w-[260px] sm:max-w-[400px] md:max-w-[450px] mx-auto animate-fade-in" style={{ animationDelay: '700ms' }}>
              At Dadson Logistics, every load is managed like it matters—because it does.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection; 