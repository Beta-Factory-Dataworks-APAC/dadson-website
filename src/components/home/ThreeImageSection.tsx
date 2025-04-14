"use client";

import React from 'react';
import Image from 'next/image';

const ThreeImageSection = () => {
  return (
    <section className="pb-16 pt-12 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Mobile scrollable container */}
        <div className="md:hidden relative w-full overflow-x-auto pb-4 -mx-6 px-6">
          <div className="flex w-[180%] rounded-[32px] overflow-hidden">
            {/* First Image - Mobile */}
            <div className="relative aspect-[4/3] w-1/3 mr-1" style={{ borderTopLeftRadius: '50%', overflow: 'hidden' }}>
              <Image 
                src="/images/home/home1.png" 
                alt="Shipping containers stacked at port" 
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
            
            {/* Second Image - Mobile */}
            <div className="relative aspect-[4/3] w-1/3 mx-1">
              <Image 
                src="/images/home/home2.png" 
                alt="Freight train traveling through snowy mountains" 
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
            
            {/* Third Image - Mobile */}
            <div className="relative aspect-[4/3] w-1/3 ml-1" style={{ borderTopRightRadius: '50%', overflow: 'hidden' }}>
              <Image 
                src="/images/home/home3.png" 
                alt="Cargo being loaded onto aircraft" 
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Desktop/tablet continuous curved container */}
        <div className="hidden md:block relative w-full overflow-hidden rounded-[32px] transition-transform duration-300 hover:scale-[1.01]">
          {/* Grid container for images with slight gap */}
          <div className="grid grid-cols-3 gap-2">
            {/* First Image - Desktop */}
            <div className="relative aspect-[4/3]" style={{ borderTopLeftRadius: '50%', overflow: 'hidden' }}>
              <Image 
                src="/images/home/home1.png" 
                alt="Shipping containers stacked at port" 
                fill
                sizes="33vw"
                className="object-cover"
                priority
              />
            </div>
            
            {/* Second Image - Desktop */}
            <div className="relative aspect-[4/3]">
              <Image 
                src="/images/home/home2.png" 
                alt="Freight train traveling through snowy mountains" 
                fill
                sizes="33vw"
                className="object-cover"
                priority
              />
            </div>
            
            {/* Third Image - Desktop */}
            <div className="relative aspect-[4/3]" style={{ borderTopRightRadius: '50%', overflow: 'hidden' }}>
              <Image 
                src="/images/home/home3.png" 
                alt="Cargo being loaded onto aircraft" 
                fill
                sizes="33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeImageSection; 