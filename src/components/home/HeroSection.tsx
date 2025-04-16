import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="mx-[10px] md:mx-[20px] mb-[20px] relative">
      <section className="relative w-full h-[580px] sm:h-[600px] md:h-[700px] lg:h-[840px] xl:h-[1040px] overflow-hidden rounded-[16px] md:rounded-[20px] mt-[15px]">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/truck-bg.png"
            alt="Dadson Logistics truck on highway"
            fill
            priority
            quality={90}
            className="object-cover object-[center_15%] lg:object-center"
          />
          {/* Dark overlay for better readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content container - improved spacing distribution */}
        <div className="relative z-10 flex flex-col items-center justify-between w-full h-full px-4 md:px-6 text-white text-center pt-[80px] xs:pt-[90px] sm:pt-[120px] md:pt-[140px] lg:pt-[180px] pb-[35px] xs:pb-[40px] sm:pb-[50px] md:pb-[60px] lg:pb-[80px]">
          {/* Main headline - improved scaling and line breaks */}
          <div className="flex-1 w-full">
            <h1 className="font-clash font-medium text-[30px] xs:text-[34px] sm:text-[40px] md:text-[48px] lg:text-[70px] xl:text-[80px] leading-[1.15] xs:leading-[1.2] sm:leading-[1.2] md:leading-[1.15] uppercase text-center max-w-[95%] xs:max-w-[90%] sm:max-w-[95%] md:max-w-[1224px] mx-auto mb-[30px] sm:mb-[35px] md:mb-[40px] transform rotate-[0.65deg] tracking-[0.02em]">
              <span className="inline-block">Trusted</span><br />
              <span className="inline-block">Freight</span><br />
              <span className="inline-block">Solutions.</span><br />
              <span className="inline-block">Backed by</span><br />
              <span className="inline-block">Real People.</span>
            </h1>
          </div>

          {/* Bottom content wrapper - improved spacing */}
          <div className="w-full max-w-[92%] xs:max-w-[90%] sm:max-w-[600px] mx-auto">
            {/* CTA Buttons - improved mobile layout */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-[20px] xs:mb-[25px] sm:mb-[30px] md:mb-[35px]">
              <Link 
                href="/quote" 
                className="w-full sm:w-[280px] h-[50px] xs:h-[52px] sm:h-[54px] md:h-[56px] flex justify-center items-center py-3 md:py-3.5 px-5 md:px-6 rounded-[6px] bg-[rgba(0,180,225,0.9)] hover:bg-[rgba(0,180,225,1)] text-white font-clash font-semibold text-[15px] xs:text-[16px] sm:text-[16px] md:text-[17px] leading-[1.2] shadow-[0px_4px_34px_rgba(0,180,225,0.15)] shadow-[inset_0px_-5px_12px_0px_rgba(255,255,255,0.15)] backdrop-blur-[22px] transition-colors duration-300"
              >
                GET A QUOTE
              </Link>
              <Link 
                href="/carriers" 
                className="w-full sm:w-[280px] h-[50px] xs:h-[52px] sm:h-[54px] md:h-[56px] flex justify-center items-center py-3 md:py-3.5 px-5 md:px-6 rounded-[6px] bg-white/10 hover:bg-white/15 text-white font-clash font-semibold text-[15px] xs:text-[16px] sm:text-[16px] md:text-[17px] leading-[1.2] outline outline-1 outline-stone-50/10 backdrop-blur-[22px] transition-colors duration-300"
              >
                BECOME A CARRIER
              </Link>
            </div>
            
            {/* Tagline - improved readability and width */}
            <p className="font-satoshi font-medium text-[14px] xs:text-[15px] sm:text-[16px] md:text-[17px] leading-[1.4] sm:leading-[1.5] text-white/90 max-w-[260px] xs:max-w-[280px] sm:max-w-[400px] md:max-w-[450px] mx-auto">
              At Dadson Logistics, every load is managed like it matters—because it does.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection; 