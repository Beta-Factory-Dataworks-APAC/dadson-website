import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="mx-[5px] md:mx-[20px] mb-[20px] relative">
      <section className="relative w-full h-[85vh] overflow-hidden rounded-[12px] md:rounded-[20px] mt-[20px]">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/truck-bg.png"
            alt="Dadson Logistics truck on highway"
            fill
            priority
            quality={90}
            className="object-cover"
          />
        </div>

        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center justify-start w-full h-full px-4 md:px-6 text-white text-center pt-[100px] md:pt-[160px] pb-[40px] md:pb-[60px]">
          {/* Main headline */}
          <h1 className="font-clash font-medium text-[40px] md:text-[60px] lg:text-[80px] leading-[1.2] md:leading-[90px] uppercase text-center max-w-full md:max-w-[1224px] mx-auto mb-[20px] md:mb-[40px] transform rotate-[0.65deg]">
            Trusted Freight Solutions.<br />
            Backed by Real People.
          </h1>

          {/* Empty spacer to push content down */}
          <div className="flex-grow min-h-[100px] md:min-h-[150px]"></div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-[27px] mb-[20px] md:mb-[30px] w-full max-w-[90%] sm:max-w-[471px] mx-auto">
            <Link 
              href="/quote" 
              className="w-full sm:w-[216px] h-[48px] md:h-[56px] flex justify-center items-center py-2 md:py-3 px-4 md:px-6 rounded-[4px] md:rounded-[6px] bg-[rgba(0,180,225,0.9)] hover:bg-[rgba(0,180,225,1)] text-white font-clash font-semibold text-[16px] md:text-[18px] leading-[32px] shadow-[0px_4px_34px_rgba(0,180,225,0.15)] backdrop-blur-[22px] transition-colors duration-300"
            >
              GET A QUOTE
            </Link>
            <Link 
              href="/carriers" 
              className="w-full sm:w-[228px] h-[48px] md:h-[56px] flex justify-center items-center py-2 md:py-3 px-4 md:px-6 rounded-[4px] md:rounded-[6px] bg-white/10 hover:bg-white/15 border border-[rgba(247,247,247,0.1)] text-white font-clash font-semibold text-[16px] md:text-[18px] leading-[32px] backdrop-blur-[22px] transition-colors duration-300"
            >
              BECOME A CARRIER
            </Link>
          </div>

          {/* Tagline */}
          <p className="font-satoshi font-medium text-[16px] md:text-[20px] leading-[1.5] md:leading-[30px] text-white w-full max-w-[90%] md:max-w-[686px] mx-auto mb-[20px] md:mb-[40px]">
            At Dadson Logistics, every load is managed like it matters—because it does.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HeroSection; 