'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Services.module.css';

// SVG Icons used in About page
const RadicalOwnershipIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27.5 14.5L27.5 33.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.5 14.5L20.5 33.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M44 24H30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 24H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 13L35 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 35L35 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 13L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 35L13 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HumanSupportIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M36.46 36.46L42 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 42L11.54 36.46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36.46 12.36L42 6.82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6.82L11.54 12.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 24.5C32 28.64 28.64 32 24.5 32C20.36 32 17 28.64 17 24.5C17 20.36 20.36 17 24.5 17C28.64 17 32 20.36 32 24.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CarrierFirstIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.41 34.59C25.05 34.95 24.55 35.15 24.02 35.15C23.49 35.15 22.99 34.95 22.63 34.59L13.41 25.37C13.05 25.01 12.85 24.51 12.85 23.98C12.85 23.45 13.05 22.95 13.41 22.59L22.63 13.37C22.99 13.01 23.49 12.81 24.02 12.81C24.55 12.81 25.05 13.01 25.41 13.37L34.63 22.59C34.99 22.95 35.19 23.45 35.19 23.98C35.19 24.51 34.99 25.01 34.63 25.37L25.41 34.59Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 12V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36 12H41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M38.5 12V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 36H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 41V36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36 36H41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M38.5 41V36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ZeroGhostingIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40C32.84 40 40 32.84 40 24C40 15.16 32.84 8 24 8C15.16 8 8 15.16 8 24C8 32.84 15.16 40 24 40Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 24L21 30L33 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProblemSolverIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M41.12 14L24 24L6.88 14L24 4L41.12 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 24V44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M41 14V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 14V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M34 44V31L24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 44V31L24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Services() {
  // State to track viewport width for conditional rendering
  const [isMobile, setIsMobile] = useState(false);
  
  // Effect to check viewport width on client side
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint in Tailwind
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className={styles.servicesPage}>
      {/* Hero Section */}
      <section className="relative w-full bg-zinc-950 py-12 md:py-20 lg:py-28">
        <div className="w-full max-w-1440 mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className={`${styles.servicesWrapper} px-0`}>
            {/* Service Banner Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Text Content - Takes up full width on small screens, 1 col on md screens */}
              <div className="col-span-1 flex flex-col justify-start items-start">
                <div className="flex flex-col justify-start items-start gap-2 mb-3 pt-4 md:pt-6">
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6">
                      <rect x="2" y="2" width="8" height="8" rx="1" fill="#00B4E1"/>
                      <rect x="14" y="2" width="8" height="8" rx="1" fill="#00B4E1"/>
                      <rect x="2" y="14" width="8" height="8" rx="1" fill="#00B4E1"/>
                      <rect x="14" y="14" width="8" height="8" rx="1" fill="#00B4E1"/>
                    </svg>
                    <div className="text-primary-blue text-base font-medium font-satoshi">Our Services</div>
                  </div>
                </div>
                  
                <div className="tracking-wide w-full mb-6">
                  <span className="text-white text-4xl sm:text-5xl md:text-5xl font-medium font-clash uppercase block leading-[1.15]">WE KEEP</span>
                  <span className="text-white text-4xl sm:text-5xl md:text-5xl font-medium font-clash uppercase block leading-[1.15]">FREIGHT</span>
                  <span className="text-white text-4xl sm:text-5xl md:text-5xl font-medium font-clash uppercase block leading-[1.15]">MOVING SAFELY,</span>
                  <span className="text-white text-4xl sm:text-5xl md:text-5xl font-medium font-clash uppercase block leading-[1.15]">EFFICIENTLY</span>
                  <span className="text-gray-500 text-4xl sm:text-5xl md:text-5xl font-medium font-clash uppercase block leading-[1.15] mt-1">AND</span>
                  <span className="text-gray-500 text-4xl sm:text-5xl md:text-5xl font-medium font-clash uppercase block leading-[1.15]">WITHOUT THE</span>
                  <span className="text-gray-500 text-4xl sm:text-5xl md:text-5xl font-medium font-clash uppercase block leading-[1.15]">USUAL</span>
                  <span className="text-gray-500 text-4xl sm:text-5xl md:text-5xl font-medium font-clash uppercase block leading-[1.15]">FRICTION.</span>
                </div>
                
                <p className="text-gray-500 text-base sm:text-lg font-medium font-satoshi leading-normal mb-8">
                  From port drayage to cross-country truckload,<br className="hidden sm:block" />
                  Dadson delivers consistent coverage and transparent communication.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-8 w-full sm:w-auto">
                  <a href="/contact" className="inline-block w-full sm:w-auto px-6 py-3 bg-[rgba(0,180,225,0.9)] hover:bg-[rgba(0,180,225,1)] rounded-md text-white text-sm font-semibold font-clash uppercase text-center">
                    GET A QUOTE
                  </a>
                  <a href="#" className="inline-block w-full sm:w-auto px-6 py-3 bg-zinc-800 rounded-md text-white text-sm font-semibold font-clash uppercase text-center">
                    BECOME A CARRIER
                  </a>
                </div>
              </div>
              
              {/* Image - Takes 1 column on md screens */}
              <div className="col-span-1 h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-2xl mt-6 md:mt-0">
                <Image 
                  src="/images/services/Rectangle 37-min.png" 
                  alt="Freight Services" 
                  width={765} 
                  height={641}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="w-full bg-[#f7f7f7] py-16 md:py-24">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-center">
          <h2 className="font-clash uppercase text-4xl sm:text-5xl md:text-6xl font-medium text-center mb-16 md:mb-24 text-[#101B21]">
            What We Offer
          </h2>
          
          {/* Desktop view - Only visible on md screens and above */}
          <div className="hidden md:flex w-full flex-col gap-16 md:gap-20">
            {/* Top Row - 3 service tiles */}
            <div className="grid grid-cols-3 gap-6">
              {/* Service Tile 1 - Full Truckload */}
              <div className="flex flex-col">
                <div className="aspect-square w-full rounded-t-[20px] overflow-hidden">
                  <Image 
                    src="/images/services/Rectangle 40-min.png" 
                    alt="Full Truckload Services" 
                    width={508} 
                    height={446}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col p-8 bg-white gap-6">
                  <h3 className="font-clash uppercase text-4xl leading-[1.2] font-medium">
                    <span className="text-[#101B21]">Full Truckload</span><br />
                    <span className="text-[#B1B6BA]">(FTL)</span>
                  </h3>
                  <p className="text-[#707C83] font-satoshi text-lg font-medium leading-[1.4]">
                    Dry van, reefer, flatbed. Coast to coast or regional.
                  </p>
                </div>
              </div>
              
              {/* Service Tile 2 - Intermodal */}
              <div className="flex flex-col">
                <div className="aspect-square w-full rounded-t-[20px] overflow-hidden">
                  <Image 
                    src="/images/services/Rectangle 40-1-min.png" 
                    alt="Intermodal & Drayage Services" 
                    width={508} 
                    height={446}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col p-8 bg-white gap-6">
                  <h3 className="font-clash uppercase text-4xl leading-[1.2] font-medium text-[#101B21]">
                    Intermodal & Drayage
                  </h3>
                  <p className="text-[#707C83] font-satoshi text-lg font-medium leading-[1.4]">
                    We handle container pickups and deliveries to and from ports and rail ramps with urgency and coordination.
                  </p>
                </div>
              </div>
              
              {/* Service Tile 3 - LTL */}
              <div className="flex flex-col">
                <div className="aspect-square w-full rounded-t-[20px] overflow-hidden">
                  <Image 
                    src="/images/services/Rectangle 40-2-min.png" 
                    alt="Less Than Truckload Services" 
                    width={508} 
                    height={446}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col p-8 bg-white gap-6">
                  <h3 className="font-clash uppercase text-4xl leading-[1.2] font-medium">
                    <span className="text-[#101B21]">Less Than Truckload</span><br />
                    <span className="text-[#B1B6BA]">(LTL)</span>
                  </h3>
                  <p className="text-[#707C83] font-satoshi text-lg font-medium leading-[1.4]">
                    Dry van, reefer, flatbed. Coast to coast or regional.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Bottom Row - 2 service tiles centered */}
            <div className="grid grid-cols-2 gap-6 max-w-[1050px] mx-auto">
              {/* Service Tile 4 - Warehousing */}
              <div className="flex flex-col">
                <div className="aspect-square w-full rounded-t-[20px] overflow-hidden">
                  <Image 
                    src="/images/services/Rectangle 40-3-min.png" 
                    alt="Warehousing Services" 
                    width={508} 
                    height={446}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col p-8 bg-white gap-6">
                  <h3 className="font-clash uppercase text-4xl leading-[1.2] font-medium text-[#101B21]">
                    Warehousing
                  </h3>
                  <p className="text-[#707C83] font-satoshi text-lg font-medium leading-[1.4]">
                    Short/long-term storage matched to your needs.
                  </p>
                </div>
              </div>
              
              {/* Service Tile 5 - Transloading */}
              <div className="flex flex-col">
                <div className="aspect-square w-full rounded-t-[20px] overflow-hidden">
                  <Image 
                    src="/images/services/image.png" 
                    alt="Transloading Services" 
                    width={508} 
                    height={446}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col p-8 bg-white gap-6">
                  <h3 className="font-clash uppercase text-4xl leading-[1.2] font-medium text-[#101B21]">
                    Transloading
                  </h3>
                  <p className="text-[#707C83] font-satoshi text-lg font-medium leading-[1.4]">
                    Seamless transfers from container to trailer minimizing dwell time and keeping freight on schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile view - Only visible on screens smaller than md */}
          <div className="md:hidden w-full">
            {/* Mobile service carousel/scrollable area */}
            <div className="overflow-x-auto pb-6">
              <div className="flex flex-nowrap gap-4 min-w-full">
                {/* Mobile Service Tile 1 - Full Truckload */}
                <div className="flex-none w-[80%] max-w-[320px]">
                  <div className="flex flex-col rounded-[15px] overflow-hidden shadow-sm">
                    <div className="h-[180px] overflow-hidden">
                      <Image 
                        src="/images/services/Rectangle 40-min.png" 
                        alt="Full Truckload Services" 
                        width={508} 
                        height={446}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col p-4 bg-white gap-3">
                      <h3 className="font-clash uppercase text-xl leading-[1.2] font-medium">
                        <span className="text-[#101B21]">Full Truckload</span><br />
                        <span className="text-[#B1B6BA]">(FTL)</span>
                      </h3>
                      <p className="text-[#707C83] font-satoshi text-sm font-medium leading-tight">
                        Dry van, reefer, flatbed. Coast to coast or regional.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Service Tile 2 - Intermodal */}
                <div className="flex-none w-[80%] max-w-[320px]">
                  <div className="flex flex-col rounded-[15px] overflow-hidden shadow-sm">
                    <div className="h-[180px] overflow-hidden">
                      <Image 
                        src="/images/services/Rectangle 40-1-min.png" 
                        alt="Intermodal & Drayage Services" 
                        width={508} 
                        height={446}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col p-4 bg-white gap-3">
                      <h3 className="font-clash uppercase text-xl leading-[1.2] font-medium text-[#101B21]">
                        Intermodal & Drayage
                      </h3>
                      <p className="text-[#707C83] font-satoshi text-sm font-medium leading-tight">
                        Container pickups & deliveries with urgency and coordination.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Service Tile 3 - LTL */}
                <div className="flex-none w-[80%] max-w-[320px]">
                  <div className="flex flex-col rounded-[15px] overflow-hidden shadow-sm">
                    <div className="h-[180px] overflow-hidden">
                      <Image 
                        src="/images/services/Rectangle 40-2-min.png" 
                        alt="Less Than Truckload Services" 
                        width={508} 
                        height={446}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col p-4 bg-white gap-3">
                      <h3 className="font-clash uppercase text-xl leading-[1.2] font-medium">
                        <span className="text-[#101B21]">Less Than Truckload</span><br />
                        <span className="text-[#B1B6BA]">(LTL)</span>
                      </h3>
                      <p className="text-[#707C83] font-satoshi text-sm font-medium leading-tight">
                        Dry van, reefer, flatbed. Coast to coast or regional.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Service Tile 4 - Warehousing */}
                <div className="flex-none w-[80%] max-w-[320px]">
                  <div className="flex flex-col rounded-[15px] overflow-hidden shadow-sm">
                    <div className="h-[180px] overflow-hidden">
                      <Image 
                        src="/images/services/Rectangle 40-3-min.png" 
                        alt="Warehousing Services" 
                        width={508} 
                        height={446}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col p-4 bg-white gap-3">
                      <h3 className="font-clash uppercase text-xl leading-[1.2] font-medium text-[#101B21]">
                        Warehousing
                      </h3>
                      <p className="text-[#707C83] font-satoshi text-sm font-medium leading-tight">
                        Short/long-term storage matched to your needs.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Service Tile 5 - Transloading */}
                <div className="flex-none w-[80%] max-w-[320px]">
                  <div className="flex flex-col rounded-[15px] overflow-hidden shadow-sm">
                    <div className="h-[180px] overflow-hidden">
                      <Image 
                        src="/images/services/image.png" 
                        alt="Transloading Services" 
                        width={508} 
                        height={446}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col p-4 bg-white gap-3">
                      <h3 className="font-clash uppercase text-xl leading-[1.2] font-medium text-[#101B21]">
                        Transloading
                      </h3>
                      <p className="text-[#707C83] font-satoshi text-sm font-medium leading-tight">
                        Seamless transfers from container to trailer minimizing dwell time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



