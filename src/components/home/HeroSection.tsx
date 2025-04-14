import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="mx-[20px] mb-[20px] relative">
      <section className="relative w-full h-[85vh] overflow-hidden rounded-[20px] -mt-[92px]">
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
        <div className="relative z-10 flex flex-col items-center justify-start w-full h-full px-6 text-white text-center pt-[160px] pb-[60px]">
          {/* Main headline */}
          <h1 className="font-clash font-medium text-[80px] leading-[90px] uppercase text-center max-w-[1224px] mx-auto mb-[40px] transform rotate-[0.65deg]">
            Trusted Freight Solutions.<br />
            Backed by Real People.
          </h1>

          {/* Empty spacer to push content down */}
          <div className="flex-grow min-h-[150px]"></div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-[27px] mb-[30px] w-[471px] mx-auto">
            <Link 
              href="/quote" 
              className="w-[216px] h-[56px] flex justify-center items-center py-3 px-6 rounded-[6px] bg-[rgba(0,180,225,0.9)] hover:bg-[rgba(0,180,225,1)] text-white font-clash font-semibold text-[18px] leading-[32px] shadow-[0px_4px_34px_rgba(0,180,225,0.15)] backdrop-blur-[22px] transition-colors duration-300"
            >
              GET A QUOTE
            </Link>
            <Link 
              href="/carriers" 
              className="w-[228px] h-[56px] flex justify-center items-center py-3 px-6 rounded-[6px] bg-white/10 hover:bg-white/15 border border-[rgba(247,247,247,0.1)] text-white font-clash font-semibold text-[18px] leading-[32px] backdrop-blur-[22px] transition-colors duration-300"
            >
              BECOME A CARRIER
            </Link>
          </div>

          {/* Tagline */}
          <p className="font-satoshi font-medium text-[20px] leading-[30px] text-white w-[686px] mx-auto mb-[40px]">
            At Dadson Logistics, every load is managed like it matters—because it does.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HeroSection; 