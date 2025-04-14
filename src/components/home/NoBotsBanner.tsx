import React from 'react';
import Image from 'next/image';

const NoBotsBanner = () => {
  return (
    <div className="bg-white w-full overflow-hidden">
      {/* Scrolling Text Banner */}
      <div className="relative overflow-hidden py-4">
        <div className="whitespace-nowrap animate-marquee inline-block">
          <div className="inline-flex items-center text-[60px] md:text-[80px] font-bold tracking-tight leading-none">
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
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative pb-36">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 py-12 relative">
          {/* Left Column with Truck Image */}
          <div className="flex-1 relative min-h-[300px]">
            {/* Truck Image */}
            <div className="absolute left-[-40%] lg:left-[-30%] bottom-[-30px] w-[110%] h-auto z-10">
              <Image
                src="/truck.png"
                alt="Dadson Logistics Truck"
                width={900}
                height={450}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Content Column */}
          <div className="flex-1 flex flex-col">
            {/* Title and Description */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase">
                WE DON'T JUST<br />
                BOOK LOADS.<br />
                BUILD TRUST.
              </h2>
              <h3 className="text-xl md:text-2xl font-medium mb-4">
                Certified. Vetted. Verified.
              </h3>
              <p className="text-gray-700">
                We're proud members of the Transportation Intermediaries Association (TIA) and the Better Business Bureau (BBB)—proof of our commitment to service, safety, and integrity.
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-5 lg:gap-4">
              <div>
                <h4 className="font-medium text-lg md:text-xl">AI-Based Carrier Vetting — <span className="font-normal">Smarter safety, fewer surprises</span></h4>
              </div>
              <div>
                <h4 className="font-medium text-lg md:text-xl">Live Load Visibility — <span className="font-normal">GPS tracking with predictive ETA</span></h4>
              </div>
              <div>
                <h4 className="font-medium text-lg md:text-xl">Carrier First Culture — <span className="font-normal">Loyal carriers mean dependable coverage</span></h4>
              </div>
              <div>
                <h4 className="font-medium text-lg md:text-xl">Radical Ownership — <span className="font-normal">We treat every load like it's our own</span></h4>
              </div>
              <div>
                <h4 className="font-medium text-lg md:text-xl">Zero Ghosting — <span className="font-normal">We don't disappear when things get tough</span></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoBotsBanner; 