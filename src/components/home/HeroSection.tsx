import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="mx-[5px] md:mx-[20px] mb-[20px] relative">
      <section className="relative w-full h-[450px] sm:h-[550px] md:h-[640px] lg:h-[1040px] overflow-hidden rounded-[12px] md:rounded-[20px] mt-[20px]">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/truck-bg.png"
            alt="Dadson Logistics truck on highway"
            fill
            priority
            quality={90}
            className="object-cover object-[center_5%] xs:object-[center_8%] sm:object-[center_10%] md:object-[center_15%] lg:object-center"
            style={{
              objectPosition: 'center 5%'
            }}
          />
          {/* Dark overlay for better readability */}
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        {/* Content container - adjusted vertical spacing and centering */}
        <div className="relative z-10 flex flex-col items-center justify-start w-full h-full px-4 md:px-6 text-white text-center pt-[65px] sm:pt-[95px] md:pt-[150px] pb-[20px] sm:pb-[40px] md:pb-[60px]">
          {/* Main headline - moved down slightly */}
          <h1 className="font-clash font-medium text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] leading-[1.15] sm:leading-[1.2] md:leading-[90px] uppercase text-center max-w-full md:max-w-[1224px] mx-auto mb-[15px] sm:mb-[25px] md:mb-[40px] transform rotate-[0.65deg]">
            Trusted Freight Solutions.<br />
            Backed by Real People.
          </h1>

          {/* Empty spacer - adjusted for mobile visibility */}
          <div className="flex-grow min-h-[10px] sm:min-h-[50px] md:min-h-[100px]"></div>
          
          {/* CTA Buttons - centered and stacked on mobile, side by side on larger screens */}
          <div className="flex flex-col sm:flex-row justify-center gap-5 sm:gap-4 mb-[25px] sm:mb-[30px] md:mb-[40px] w-full max-w-[95%] sm:max-w-[600px] mx-auto">
            <Link 
              href="/quote" 
              className="w-full sm:w-[216px] h-[50px] sm:h-[52px] md:h-[60px] flex justify-center items-center py-3 md:py-4 px-5 md:px-7 rounded-[5px] md:rounded-[6px] bg-[rgba(0,180,225,0.9)] hover:bg-[rgba(0,180,225,1)] text-white font-clash font-semibold text-[16px] sm:text-[17px] md:text-[18px] leading-[32px] shadow-[0px_4px_34px_rgba(0,180,225,0.15)] shadow-[inset_0px_-5px_12px_0px_rgba(255,255,255,0.15)] backdrop-blur-[22px] transition-colors duration-300"
            >
              GET A QUOTE
            </Link>
            <Link 
              href="/carriers" 
              className="w-full sm:w-[216px] h-[50px] sm:h-[52px] md:h-[60px] flex justify-center items-center py-3 md:py-4 px-5 md:px-7 rounded-[5px] md:rounded-[6px] bg-white/10 hover:bg-white/15 text-white font-clash font-semibold text-[16px] sm:text-[17px] md:text-[18px] leading-[32px] outline outline-1 outline-stone-50/10 backdrop-blur-[22px] transition-colors duration-300 mt-3 sm:mt-0"
            >
              BECOME A CARRIER
            </Link>
          </div>
          
          {/* Tagline - moved below button and made more concise */}
          <p className="font-satoshi font-medium text-[15px] sm:text-[16px] md:text-[18px] leading-[1.4] sm:leading-[1.5] text-white w-full max-w-[90%] sm:max-w-[80%] md:max-w-[500px] mx-auto">
            At Dadson Logistics, every load is managed like it matters—because it does.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HeroSection; 