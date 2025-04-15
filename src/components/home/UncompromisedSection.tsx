"use client";

import React from 'react';
import Image from 'next/image';

const UncompromisedSection = () => {
  return (
    <section className="py-[24px] sm:py-[30px] md:py-[40px] lg:py-[80px] px-4 md:px-6 bg-white">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-16">
        {/* Left column - YOUR LOGISTICS and UNCOMPROMISED */}
        <div className="w-full md:w-[40%] flex flex-col justify-start mb-4 sm:mb-6 md:mb-0">
          <div className="self-stretch text-gray-500 text-[12px] sm:text-[14px] md:text-[16px] font-clash font-medium uppercase leading-snug tracking-[6px] sm:tracking-[9.60px] mb-2 sm:mb-3 md:mb-5">
            Your Logistics
          </div>
          <div className="w-full md:w-[90%] text-cyan-500 font-clash uppercase relative pb-[25%] sm:pb-[22%] md:pb-0">
            <Image 
              src="/uncompromised.png" 
              alt="UNCOMPROMISED" 
              width={500}
              height={140}
              className="w-full"
              priority
            />
          </div>
        </div>

        {/* Right column - Freight Brokerage and Paragraph */}
        <div className="w-full md:w-[60%] flex flex-col justify-center">
          <h2 className="self-stretch text-slate-800 text-[18px] sm:text-[20px] md:text-[24px] font-clash font-medium leading-tight sm:leading-loose mb-2 sm:mb-3 md:mb-4">
            Freight Brokerage Done Right.
          </h2>
          <p className="self-stretch text-gray-500 text-[14px] sm:text-[16px] md:text-lg font-satoshi font-medium leading-relaxed sm:leading-normal max-w-full md:max-w-[90%]">
            We connect shippers with dependable capacity—and carriers with the loads they want to haul. From trucking to air freight, LTL and warehousing coordination, we handle logistics with the urgency and discipline it deserves.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UncompromisedSection; 