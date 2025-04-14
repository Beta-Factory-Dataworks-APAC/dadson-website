"use client";

import React from 'react';
import Image from 'next/image';

const UncompromisedSection = () => {
  return (
    <section className="py-[80px] px-6 bg-white">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Left column - YOUR LOGISTICS and UNCOMPROMISED */}
        <div className="w-full md:w-[40%] flex flex-col justify-center">
          <h3 className="uppercase text-[#767676] font-medium text-[16px] tracking-wider mb-4">
            Your Logistics
          </h3>
          <div className="w-full md:w-[90%]">
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
          <h2 className="font-bold text-[24px] text-[#101B21] mb-4">
            Freight Brokerage Done Right.
          </h2>
          <p className="text-[16px] leading-[1.6] text-[#555] max-w-[90%]">
            We connect shippers with dependable capacity—and carriers with the loads they want to haul. From trucking to air freight, LTL and warehousing coordination, we handle logistics with the urgency and discipline it deserves.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UncompromisedSection; 