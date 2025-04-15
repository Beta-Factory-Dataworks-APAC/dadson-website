import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="mx-[5px] md:mx-[20px] mb-[20px] relative">
      <section className="relative w-full h-[500px] sm:h-[550px] md:h-[640px] lg:h-[1040px] overflow-hidden rounded-[12px] md:rounded-[20px] mt-[20px]">
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
          {/* Dark overlay for better readability */}
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        {/* Content container - adjusted vertical spacing and centering */}
        <div className="relative z-10 flex flex-col items-center justify-start w-full h-full px-4 md:px-6 text-white text-center pt-[75px] sm:pt-[95px] md:pt-[150px] pb-[20px] sm:pb-[40px] md:pb-[60px]">
          {/* Main headline - moved down slightly */}
          <h1 className="font-clash font-medium text-[32px] sm:text-[40px] md:text-[60px] lg:text-[80px] leading-[1.15] sm:leading-[1.2] md:leading-[90px] uppercase text-center max-w-full md:max-w-[1224px] mx-auto mb-[25px] md:mb-[40px] transform rotate-[0.65deg]">
            Trusted Freight Solutions.<br />
            Backed by Real People.
          </h1>

          {/* Empty spacer - adjusted for new layout */}
          <div className="flex-grow min-h-[30px] sm:min-h-[50px] md:min-h-[120px]"></div>
          
          {/* Single CTA Button - centered */}
          <div className="flex justify-center mb-[25px] sm:mb-[30px] md:mb-[40px] w-full max-w-[90%] sm:max-w-[471px] mx-auto">
            <Link 
              href="/quote" 
              className="w-full sm:w-[216px] h-[44px] sm:h-[48px] md:h-[56px] flex justify-center items-center py-2 md:py-3 px-4 md:px-6 rounded-[4px] md:rounded-[6px] bg-[rgba(0,180,225,0.9)] hover:bg-[rgba(0,180,225,1)] text-white font-clash font-semibold text-[15px] sm:text-[16px] md:text-[18px] leading-[32px] shadow-[0px_4px_34px_rgba(0,180,225,0.15)] backdrop-blur-[22px] transition-colors duration-300"
            >
              GET A QUOTE
            </Link>
          </div>
          
          {/* Tagline - moved below button and made more concise */}
          <p className="font-satoshi font-medium text-[15px] sm:text-[16px] md:text-[18px] leading-[1.4] sm:leading-[1.5] text-white w-full max-w-[90%] sm:max-w-[80%] md:max-w-[500px] mx-auto">
            Every load matters. We deliver on that promise.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HeroSection; 