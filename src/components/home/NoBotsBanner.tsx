import React from 'react';
import Image from 'next/image';

const NoBotsBanner = () => {
  return (
    <div className="bg-white w-full overflow-hidden">
      {/* Scrolling Text Banner */}
      <div className="relative overflow-hidden py-2 md:py-4">
        <div className="whitespace-nowrap animate-marquee inline-block">
          <div className="inline-flex items-center text-[32px] sm:text-[60px] md:text-[80px] font-bold tracking-tight leading-none font-['Clash_Display']">
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
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative pb-16 md:pb-36">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-24 py-8 md:py-12 relative">
          {/* Left Column with Truck Image - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block flex-1 relative min-h-[300px]">
            {/* Truck Image */}
            <div className="absolute left-[-60%] bottom-[-30px] w-[160%] h-auto z-10">
              <Image
                src="/truck.png"
                alt="Dadson Logistics Truck"
                width={1000}
                height={500}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Mobile Truck Image - Only visible on mobile */}
          <div className="block lg:hidden relative w-full h-[200px] mb-6">
            <div className="absolute left-[-20%] top-[0px] w-[140%]">
              <Image
                src="/truck.png"
                alt="Dadson Logistics Truck"
                width={600}
                height={300}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Content Column */}
          <div className="flex-1 flex flex-col">
            {/* Title and Description */}
            <div className="mb-6 md:mb-8 lg:mb-12 ml-0 lg:ml-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4 uppercase font-['Clash_Display'] tracking-tight">
                WE DON'T JUST<br />
                BOOK LOADS.<br />
                BUILD TRUST.
              </h2>
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium mb-3 md:mb-4 font-['Satoshi']">
                Certified. Vetted. Verified.
              </h3>
              <p className="text-gray-700 text-sm md:text-base font-['Satoshi']">
                We're proud members of the Transportation Intermediaries Association (TIA) and the Better Business Bureau (BBB)—proof of our commitment to service, safety, and integrity.
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-4 lg:gap-6 font-['Satoshi']">
              <div className="flex items-start">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-2 mr-3"></div>
                <h4 className="font-medium text-base md:text-lg lg:text-xl">AI-Based Carrier Vetting <span className="font-normal text-gray-600 text-sm md:text-base">— Smarter safety, fewer surprises</span></h4>
              </div>
              <div className="flex items-start">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-2 mr-3"></div>
                <h4 className="font-medium text-base md:text-lg lg:text-xl">Live Load Visibility <span className="font-normal text-gray-600 text-sm md:text-base">— GPS tracking with predictive ETA</span></h4>
              </div>
              <div className="flex items-start">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-2 mr-3"></div>
                <h4 className="font-medium text-base md:text-lg lg:text-xl">Carrier First Culture <span className="font-normal text-gray-600 text-sm md:text-base">— Loyal carriers mean dependable coverage</span></h4>
              </div>
              <div className="flex items-start">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-2 mr-3"></div>
                <h4 className="font-medium text-base md:text-lg lg:text-xl">Radical Ownership <span className="font-normal text-gray-600 text-sm md:text-base">— We treat every load like it's our own</span></h4>
              </div>
              <div className="flex items-start">
                <div className="min-w-[8px] h-[8px] rounded-full bg-[#00B4E1] mt-2 mr-3"></div>
                <h4 className="font-medium text-base md:text-lg lg:text-xl">Zero Ghosting <span className="font-normal text-gray-600 text-sm md:text-base">— We don't disappear when things get tough</span></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoBotsBanner; 