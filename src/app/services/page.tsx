'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Services.module.css';
import AnimatedHeading from '@/components/shared/AnimatedHeading';
import { motion } from 'framer-motion';

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

// Reusable section icon component
const SectionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6">
    <rect x="2" y="2" width="8" height="8" rx="1" fill="#00B4E1"/>
    <rect x="14" y="2" width="8" height="8" rx="1" fill="#00B4E1"/>
    <rect x="2" y="14" width="8" height="8" rx="1" fill="#00B4E1"/>
    <rect x="14" y="14" width="8" height="8" rx="1" fill="#00B4E1"/>
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

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  return (
    <div className={styles.servicesPage}>
      {/* Hero Section - Improved mobile padding and spacing */}
      <section className="relative w-full bg-zinc-950 py-12 sm:py-16 md:py-24 lg:py-32 overflow-x-hidden">
        <div className="w-full max-w-1440 mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className={`${styles.servicesWrapper} px-3 sm:px-6 md:px-12 lg:px-16 py-10 sm:py-12 md:py-16 lg:py-20`}>
            {/* Service Banner Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Text Content - Takes up full width on small screens, 1 col on md screens */}
              <div className="col-span-1 flex flex-col justify-start items-start h-auto sm:h-[350px] md:h-[500px]">
                <div className="flex flex-col justify-start items-start gap-2 mb-2 pt-2 md:pt-4">
                  <div className="flex items-center gap-2">
                    <SectionIcon />
                    <div className="justify-start text-cyan-500 text-base font-medium font-['Satoshi'] leading-loose">Our Services</div>
                  </div>
                </div>
                  
                <div className="tracking-wide w-full mb-4">
                  <AnimatedHeading 
                    size="h1" 
                    animationType="fade" 
                    className="leading-tight md:leading-none text-[28px] xs:text-[32px] sm:text-[40px] md:text-[50px] lg:text-[65px]"
                  >
                    <div className="flex flex-wrap self-stretch justify-start">
                      <span className="text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-medium font-['Clash_Display'] uppercase">We keep freight moving safely, efficiently </span>
                      <span className="text-gray-400 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-medium font-['Clash_Display'] uppercase">and without the usual friction.</span>
                    </div>
                  </AnimatedHeading>
                </div>
                
                <p className="w-full md:w-[685px] justify-start text-gray-500 text-sm sm:text-base md:text-lg font-medium font-['Satoshi'] leading-normal mb-6">
                  From port drayage to cross-country truckload,<br className="hidden sm:block" />
                  Dadson delivers consistent coverage and transparent communication.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-4 w-full sm:w-auto mt-4 sm:mt-auto">
                  <a href="/contact" className="w-full sm:w-52 px-5 py-2 sm:py-3 bg-cyan-500/90 hover:bg-cyan-500 rounded-md shadow-[0px_4px_34px_0px_rgba(0,180,225,0.15)] text-white text-sm sm:text-lg font-semibold font-['Clash_Display'] uppercase text-center">
                    GET A QUOTE
                  </a>
                  <a href="#" className="w-full sm:w-auto px-5 py-2 sm:py-3 bg-white/10 rounded-md outline outline-1 outline-stone-50/10 text-white text-sm sm:text-lg font-semibold font-['Clash_Display'] uppercase text-center">
                    BECOME A CARRIER
                  </a>
                </div>
              </div>
              
              {/* Image - Takes 1 column on md screens */}
              <div className="col-span-1 h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-xl sm:rounded-2xl mt-4 sm:mt-6 md:mt-0">
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

      {/* What We Offer Section - Improved mobile experience */}
      <section className="w-full bg-[#f7f7f7] py-12 sm:py-16 md:py-24 overflow-x-hidden">
        <div className="w-full max-w-[1564px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-start gap-10 sm:gap-16 md:gap-[64px]">
          <h2 className="text-[#101B21] text-[32px] xs:text-[36px] sm:text-[50px] md:text-[64px] font-medium font-['Clash_Display'] uppercase w-full">
            What We Offer
          </h2>
          
          {/* Desktop view - Only visible on md screens and above */}
          <motion.div 
            className="hidden md:flex w-full flex-col gap-[42px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Top Row - 3 service tiles */}
            <div className="w-full flex justify-start items-stretch gap-5">
              {/* Service Tile 1 - Full Truckload */}
              <motion.div 
                className="flex-1 flex flex-col"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="w-full h-[446px] rounded-t-[20px] overflow-hidden">
                  <Image 
                    src="/images/services/Rectangle 40-min.png" 
                    alt="Full Truckload Services" 
                    width={508} 
                    height={446}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col p-6 bg-white gap-6 flex-grow">
                  <div className="w-full">
                    <span className="text-[#101B21] font-['Clash_Display'] uppercase text-[42px] leading-[50px] font-medium">Full Truckload</span><br />
                    <span className="text-[#B1B6BA] font-['Clash_Display'] uppercase text-[42px] leading-[50px] font-medium">(FTL)</span>
                  </div>
                  <p className="text-[#707C83] font-['Satoshi'] text-[18px] font-medium leading-[24px]">
                    Dry van, reefer, flatbed. Coast to coast or regional.
                  </p>
                </div>
              </motion.div>
              
              {/* Service Tile 2 - Intermodal */}
              <motion.div 
                className="flex-1 flex flex-col"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="w-full h-[446px] rounded-t-[20px] overflow-hidden">
                  <Image 
                    src="/images/services/Rectangle 40-1-min.png" 
                    alt="Intermodal & Drayage Services" 
                    width={508} 
                    height={446}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col p-6 bg-white gap-6 flex-grow">
                  <div className="w-full text-[#101B21] font-['Clash_Display'] uppercase text-[42px] leading-[50px] font-medium">
                    Intermodal & Drayage
                  </div>
                  <p className="text-[#707C83] font-['Satoshi'] text-[18px] font-medium leading-[24px]">
                    We handle container pickups and deliveries to and from ports and rail ramps with urgency and coordination.
                  </p>
                </div>
              </motion.div>
              
              {/* Service Tile 3 - LTL */}
              <motion.div 
                className="flex-1 flex flex-col"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="w-full h-[446px] rounded-t-[20px] overflow-hidden">
                  <Image 
                    src="/images/services/Rectangle 40-2-min.png" 
                    alt="Less Than Truckload Services" 
                    width={508} 
                    height={446}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col p-6 bg-white gap-6 flex-grow">
                  <div className="w-full">
                    <span className="text-[#101B21] font-['Clash_Display'] uppercase text-[42px] leading-[50px] font-medium">Less Than Truckload </span>
                    <span className="text-[#B1B6BA] font-['Clash_Display'] uppercase text-[42px] leading-[50px] font-medium">(LTL)</span>
                  </div>
                  <p className="text-[#707C83] font-['Satoshi'] text-[18px] font-medium leading-[24px]">
                    Dry van, reefer, flatbed. Coast to coast or regional.
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Bottom Row - 2 service tiles with fixed width */}
            <div className="flex justify-start items-stretch gap-5">
              {/* Service Tile 4 - Warehousing */}
              <motion.div 
                className="w-[508px] flex flex-col"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="w-full h-[446px] rounded-t-[20px] overflow-hidden bg-[#D9D9D9]">
                  <Image 
                    src="/images/services/Rectangle 40-3-min.png" 
                    alt="Warehousing Services" 
                    width={508} 
                    height={446}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col p-6 bg-white gap-6 flex-grow">
                  <div className="w-full text-[#101B21] font-['Clash_Display'] uppercase text-[42px] leading-[50px] font-medium">
                    Warehousing
                  </div>
                  <p className="text-[#707C83] font-['Satoshi'] text-[18px] font-medium leading-[24px]">
                    Short/long-term storage matched to your needs.
                  </p>
                </div>
              </motion.div>
              
              {/* Service Tile 5 - Transloading */}
              <motion.div 
                className="w-[508px] flex flex-col"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="w-full h-[446px] rounded-t-[20px] overflow-hidden">
                  <Image 
                    src="/images/services/image.png" 
                    alt="Transloading Services" 
                    width={508} 
                    height={446}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col p-6 bg-white gap-6 flex-grow">
                  <div className="w-full text-[#101B21] font-['Clash_Display'] uppercase text-[42px] leading-[50px] font-medium">
                    Transloading
                  </div>
                  <p className="text-[#707C83] font-['Satoshi'] text-[18px] font-medium leading-[24px]">
                    Seamless transfers from container to trailer minimizing dwell time and keeping freight on schedule.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Mobile view - Only visible on screens smaller than md */}
          <motion.div 
            className="md:hidden w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Mobile service carousel/scrollable area - Improved scrolling */}
            <div className="overflow-x-auto pb-8 -mx-4 px-4">
              <div className="flex flex-nowrap gap-4 min-w-full">
                {/* Mobile Service Tile 1 - Full Truckload */}
                <motion.div 
                  className="flex-none w-[75%] max-w-[300px]"
                  variants={cardVariants}
                >
                  <div className="flex flex-col rounded-[15px] overflow-hidden shadow-sm h-full">
                    <div className="h-[180px] xs:h-[220px] overflow-hidden rounded-t-[15px]">
                      <Image 
                        src="/images/services/Rectangle 40-min.png" 
                        alt="Full Truckload Services" 
                        width={508} 
                        height={446}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col p-4 sm:p-5 bg-white gap-3 sm:gap-4 flex-grow">
                      <div className="w-full">
                        <span className="text-[#101B21] font-['Clash_Display'] uppercase text-lg xs:text-[22px] leading-[28px] font-medium">Full Truckload</span><br />
                        <span className="text-[#B1B6BA] font-['Clash_Display'] uppercase text-lg xs:text-[22px] leading-[28px] font-medium">(FTL)</span>
                      </div>
                      <p className="text-[#707C83] font-['Satoshi'] text-sm font-medium leading-[20px]">
                        Dry van, reefer, flatbed. Coast to coast or regional.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Mobile Service Tile 2 - Intermodal */}
                <motion.div 
                  className="flex-none w-[75%] max-w-[300px]"
                  variants={cardVariants}
                >
                  <div className="flex flex-col rounded-[15px] overflow-hidden shadow-sm h-full">
                    <div className="h-[180px] xs:h-[220px] overflow-hidden rounded-t-[15px]">
                      <Image 
                        src="/images/services/Rectangle 40-1-min.png" 
                        alt="Intermodal & Drayage Services" 
                        width={508} 
                        height={446}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col p-4 sm:p-5 bg-white gap-3 sm:gap-4 flex-grow">
                      <div className="w-full text-[#101B21] font-['Clash_Display'] uppercase text-lg xs:text-[22px] leading-[28px] font-medium">
                        Intermodal & Drayage
                      </div>
                      <p className="text-[#707C83] font-['Satoshi'] text-sm font-medium leading-[20px]">
                        Container pickups & deliveries with urgency and coordination.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Mobile Service Tile 3 - LTL */}
                <motion.div 
                  className="flex-none w-[75%] max-w-[300px]"
                  variants={cardVariants}
                >
                  <div className="flex flex-col rounded-[15px] overflow-hidden shadow-sm h-full">
                    <div className="h-[180px] xs:h-[220px] overflow-hidden rounded-t-[15px]">
                      <Image 
                        src="/images/services/Rectangle 40-2-min.png" 
                        alt="Less Than Truckload Services" 
                        width={508} 
                        height={446}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col p-4 sm:p-5 bg-white gap-3 sm:gap-4 flex-grow">
                      <div className="w-full">
                        <span className="text-[#101B21] font-['Clash_Display'] uppercase text-lg xs:text-[22px] leading-[28px] font-medium">Less Than Truckload </span>
                        <span className="text-[#B1B6BA] font-['Clash_Display'] uppercase text-lg xs:text-[22px] leading-[28px] font-medium">(LTL)</span>
                      </div>
                      <p className="text-[#707C83] font-['Satoshi'] text-sm font-medium leading-[20px]">
                        Dry van, reefer, flatbed. Coast to coast or regional.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Mobile Service Tile 4 - Warehousing */}
                <motion.div 
                  className="flex-none w-[75%] max-w-[300px]"
                  variants={cardVariants}
                >
                  <div className="flex flex-col rounded-[15px] overflow-hidden shadow-sm h-full">
                    <div className="h-[180px] xs:h-[220px] overflow-hidden rounded-t-[15px] bg-[#D9D9D9]">
                      <Image 
                        src="/images/services/Rectangle 40-3-min.png" 
                        alt="Warehousing Services" 
                        width={508} 
                        height={446}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col p-4 sm:p-5 bg-white gap-3 sm:gap-4 flex-grow">
                      <div className="w-full text-[#101B21] font-['Clash_Display'] uppercase text-lg xs:text-[22px] leading-[28px] font-medium">
                        Warehousing
                      </div>
                      <p className="text-[#707C83] font-['Satoshi'] text-sm font-medium leading-[20px]">
                        Short/long-term storage matched to your needs.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Mobile Service Tile 5 - Transloading */}
                <motion.div 
                  className="flex-none w-[75%] max-w-[300px]"
                  variants={cardVariants}
                >
                  <div className="flex flex-col rounded-[15px] overflow-hidden shadow-sm h-full">
                    <div className="h-[180px] xs:h-[220px] overflow-hidden rounded-t-[15px]">
                      <Image 
                        src="/images/services/image.png" 
                        alt="Transloading Services" 
                        width={508} 
                        height={446}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col p-4 sm:p-5 bg-white gap-3 sm:gap-4 flex-grow">
                      <div className="w-full text-[#101B21] font-['Clash_Display'] uppercase text-lg xs:text-[22px] leading-[28px] font-medium">
                        Transloading
                      </div>
                      <p className="text-[#707C83] font-['Satoshi'] text-sm font-medium leading-[20px]">
                        Seamless transfers from container to trailer minimizing dwell time.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Mobile scroll indicator */}
            <div className="flex justify-center items-center mt-4">
              <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How We Back It Up Section - Improved mobile layout */}
      <section className="w-full bg-[#f7f7f7] py-12 sm:py-16 md:py-24 overflow-x-hidden">
        <div className="w-full max-w-[1564px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-start gap-10 sm:gap-16 md:gap-[64px]">
          <h2 className="text-[#101B21] text-[32px] xs:text-[36px] sm:text-[50px] md:text-[64px] font-medium font-['Clash_Display'] uppercase w-full">
            HOW WE BACK IT UP
          </h2>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 w-full">
            {/* Cards with improved mobile spacing */}
            <motion.div 
              className="flex flex-col items-center p-5 sm:p-6 md:p-10 bg-white rounded-xl shadow-sm h-full hover:shadow-md transition-shadow duration-300"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-12 sm:w-14 md:w-20 h-12 sm:h-14 md:h-20 flex items-center justify-center mb-4 sm:mb-6 md:mb-8 text-[#101B21]">
                <RadicalOwnershipIcon />
              </div>
              <h3 className="font-['Clash_Display'] font-medium text-center text-[16px] sm:text-[18px] md:text-[20px] mb-2 sm:mb-3">Real-time tracking & alerts.</h3>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center p-5 sm:p-6 md:p-10 bg-white rounded-xl shadow-sm h-full hover:shadow-md transition-shadow duration-300"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-12 sm:w-14 md:w-20 h-12 sm:h-14 md:h-20 flex items-center justify-center mb-4 sm:mb-6 md:mb-8 text-[#101B21]">
                <HumanSupportIcon />
              </div>
              <h3 className="font-['Clash_Display'] font-medium text-center text-[16px] sm:text-[18px] md:text-[20px] mb-2 sm:mb-3">24/7 access to a responsive team.</h3>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center p-5 sm:p-6 md:p-10 bg-white rounded-xl shadow-sm h-full hover:shadow-md transition-shadow duration-300"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-12 sm:w-14 md:w-20 h-12 sm:h-14 md:h-20 flex items-center justify-center mb-4 sm:mb-6 md:mb-8 text-[#101B21]">
                <CarrierFirstIcon />
              </div>
              <h3 className="font-['Clash_Display'] font-medium text-center text-[16px] sm:text-[18px] md:text-[20px] mb-2 sm:mb-3">Vetted carriers with strict compliance checks.</h3>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center p-5 sm:p-6 md:p-10 bg-white rounded-xl shadow-sm h-full hover:shadow-md transition-shadow duration-300"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-12 sm:w-14 md:w-20 h-12 sm:h-14 md:h-20 flex items-center justify-center mb-4 sm:mb-6 md:mb-8 text-[#101B21]">
                <ZeroGhostingIcon />
              </div>
              <h3 className="font-['Clash_Display'] font-medium text-center text-[16px] sm:text-[18px] md:text-[20px] mb-2 sm:mb-3">Proud members of TIA and BBB.</h3>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}



