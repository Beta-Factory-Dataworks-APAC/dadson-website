"use client";

import React from 'react';
import Image from 'next/image';

const UncompromisedSection = () => {
  return (
    <section className="pt-[40px] sm:pt-[50px] md:pt-[60px] lg:pt-[70px] pb-[40px] sm:pb-[50px] md:pb-[60px] lg:pb-[70px] px-[15px] md:px-6 bg-white">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        {/* Left column - YOUR LOGISTICS and UNCOMPROMISED */}
        <div className="w-full md:w-[40%] flex flex-col justify-start relative">
          <div className="relative">
            <div className="text-gray-500 text-[12px] sm:text-[14px] md:text-[16px] font-clash font-medium uppercase leading-none sm:leading-snug tracking-[4px] sm:tracking-[6px] md:tracking-[9.60px] mb-3 sm:mb-4 md:mb-5">
              Your Logistics
            </div>
            <div className="w-[106%] -ml-[3%] md:w-[90%] md:ml-0 text-cyan-500 font-clash uppercase">
              <Image 
                src="/uncompromised.png?v=2"
                alt="UNCOMPROMISED" 
                width={500}
                height={140}
                className="w-full"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right column - Freight Brokerage and Paragraph */}
        <div className="w-full md:w-[60%] flex flex-col justify-center mt-4 sm:mt-6 md:mt-0">
          <div className="self-stretch text-slate-800 text-[24px] sm:text-[28px] md:text-[32px] font-satoshi font-medium leading-tight sm:leading-tight md:leading-tight mb-4 sm:mb-5 md:mb-6">
            Freight Brokerage Done Right
          </div>
          <div className="self-stretch text-gray-500 text-[15px] sm:text-[16px] md:text-lg font-satoshi font-medium leading-relaxed sm:leading-relaxed">
            We connect shippers with dependable capacity—and carriers with the loads they want to haul. From truckload and drayage to LTL and warehousing coordination, we handle logistics with the urgency and discipline it deserves.
          </div>
        </div>
      </div>
    </section>
  );
};

export default UncompromisedSection; 