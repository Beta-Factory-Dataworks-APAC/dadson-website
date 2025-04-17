"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ShippersCarriersSection = () => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Bullet list items for Shippers
  const shipperBullets = [
    "Vetted, safety-scored carriers",
    "Dedicated reps & live updates",
    "Appointment scheduling & compliance",
    "Flat, clear pricing"
  ];
  
  // Bullet list items for Carriers
  const carrierBullets = [
    "Steady freight flow",
    "Fast pay & zero micromanagement",
    "Support that actually picks up the phone",
    "Long-term partnership, not transaction"
  ];

  return (
    <section className="w-full py-[30px] xs:py-[35px] sm:py-[40px] md:py-[50px] lg:py-[60px] bg-white overflow-hidden">
      {/* Section Headers */}
      <div className="w-full text-center mb-[30px] xs:mb-[35px] sm:mb-[40px] md:mb-[50px]">
        <p className="text-gray-500 text-[12px] xs:text-[13px] sm:text-[14px] md:text-[15px] font-medium font-clash uppercase tracking-[3px] xs:tracking-[4px] sm:tracking-[6px] md:tracking-[8px] mb-2 sm:mb-3">
          Built Around You
        </p>
        <h2 className="text-gray-900 text-[28px] xs:text-[30px] sm:text-[32px] md:text-[36px] lg:text-[48px] font-medium font-clash uppercase">
          Shippers & Carriers
        </h2>
      </div>
        
      {/* Content Container */}
      <div className="w-full">
        {/* Shippers Row */}
        <div className="mb-[35px] xs:mb-[40px] sm:mb-[45px] md:mb-[50px] relative">
          <div className="flex flex-col md:flex-row w-full md:items-center">
            {/* Left Image */}
            <div className="w-full md:w-1/2 mb-5 xs:mb-6 sm:mb-7 md:mb-0">
              <div className="h-[200px] xs:h-[220px] sm:h-[240px] md:h-[260px] lg:h-[320px] w-full rounded-tr-[100px] xs:rounded-tr-[150px] sm:rounded-tr-[200px] md:rounded-tr-[250px] rounded-br-[100px] xs:rounded-br-[150px] sm:rounded-br-[200px] md:rounded-br-[250px] overflow-hidden relative">
                <Image 
                  src="/images/carrier.png"
                  alt="Delivery personnel handling packages"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Right Content */}
            <div className="md:w-1/2 md:flex md:items-center">
              <div className="max-w-full sm:max-w-[90%] md:max-w-[520px] lg:max-w-[555px] md:ml-8 lg:ml-12 mt-4 xs:mt-5 sm:mt-6 md:mt-0 px-4 md:px-6">
                <h3 className="text-gray-900 text-[22px] xs:text-[24px] sm:text-[26px] md:text-[28px] font-medium font-satoshi mb-3 xs:mb-4 sm:mb-5">Shippers</h3>
                <ul className="text-gray-500 text-[14px] xs:text-[15px] sm:text-[16px] font-medium font-satoshi space-y-2.5 xs:space-y-3 md:space-y-3.5">
                  {shipperBullets.map((bullet, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <span className="text-primary-blue mr-2.5 text-lg flex-shrink-0 mt-0.5">•</span>
                      <span className="leading-snug">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Carriers Row */}
        <div className="relative">
          <div className="flex flex-col md:flex-row w-full md:items-center">
            {/* Left Content */}
            <div className="w-full md:w-1/2 md:flex md:items-center md:justify-end order-last md:order-first">
              <div className="max-w-full sm:max-w-[90%] md:max-w-[520px] lg:max-w-[557px] md:mr-8 lg:mr-12 mt-4 xs:mt-5 sm:mt-6 md:mt-0 px-4 md:px-6">
                <h3 className="text-gray-900 text-[22px] xs:text-[24px] sm:text-[26px] md:text-[28px] font-medium font-satoshi mb-3 xs:mb-4 sm:mb-5">Carriers</h3>
                <ul className="text-gray-500 text-[14px] xs:text-[15px] sm:text-[16px] font-medium font-satoshi space-y-2.5 xs:space-y-3 md:space-y-3.5">
                  {carrierBullets.map((bullet, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <span className="text-primary-blue mr-2.5 text-lg flex-shrink-0 mt-0.5">•</span>
                      <span className="leading-snug">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-full md:w-1/2 order-first md:order-last mb-5 xs:mb-6 sm:mb-7 md:mb-0">
              <div className="h-[200px] xs:h-[220px] sm:h-[240px] md:h-[260px] lg:h-[320px] w-full rounded-tl-[100px] xs:rounded-tl-[150px] sm:rounded-tl-[200px] md:rounded-tl-[250px] rounded-bl-[100px] xs:rounded-bl-[150px] sm:rounded-bl-[200px] md:rounded-bl-[250px] overflow-hidden relative">
                <Image 
                  src="/images/shipper.png"
                  alt="Warehouse workers with safety vests managing inventory"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippersCarriersSection; 