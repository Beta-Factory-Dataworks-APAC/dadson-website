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
    <section className="w-full py-10 sm:py-16 md:py-24 bg-white overflow-hidden">
      {/* Section Headers - kept centered but with improved mobile spacing */}
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-gray-500 text-base sm:text-lg md:text-2xl font-medium font-clash uppercase tracking-[4px] sm:tracking-[9.6px]">
            Built Around You
          </p>
          <h2 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium font-clash uppercase mt-1 sm:mt-2">
            Shippers & Carriers
          </h2>
        </div>
      </div>
        
      {/* Content Container - full width */}
      <div className="w-full relative">
        {/* Shippers Row - First Row */}
        <div className="mb-12 sm:mb-16 md:mb-24 relative">
          <div className="flex flex-col md:flex-row">
            {/* Left Image */}
            <div className="w-full md:w-1/2 mb-6 sm:mb-8 md:mb-0">
              <div className="h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] w-full md:w-full rounded-tr-[200px] sm:rounded-tr-[300px] md:rounded-tr-[500px] rounded-br-[200px] sm:rounded-br-[300px] md:rounded-br-[500px] overflow-hidden relative">
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
              <div className="max-w-full sm:max-w-[90%] md:max-w-[455px] md:ml-12 px-4 md:px-0">
                <h3 className="text-gray-900 text-2xl sm:text-2xl md:text-3xl font-medium font-satoshi mb-3 sm:mb-4 md:mb-6">Shippers</h3>
                <ul className="text-gray-500 text-base sm:text-lg font-medium font-satoshi space-y-2 md:space-y-3">
                  {shipperBullets.map((bullet, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <span className="text-primary-blue mr-2 mt-1.5">•</span>
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Carriers Row - Second Row */}
        <div className="relative">
          <div className="flex flex-col md:flex-row">
            {/* Left Content */}
            <div className="w-full md:w-1/2 md:flex md:items-center md:justify-end order-last md:order-first">
              <div className="max-w-full sm:max-w-[90%] md:max-w-[457px] md:mr-12 px-4 md:px-0 mb-6 sm:mb-8 md:mb-0">
                <h3 className="text-gray-900 text-2xl sm:text-2xl md:text-3xl font-medium font-satoshi mb-3 sm:mb-4 md:mb-6">Carriers</h3>
                <ul className="text-gray-500 text-base sm:text-lg font-medium font-satoshi space-y-2 md:space-y-3">
                  {carrierBullets.map((bullet, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <span className="text-primary-blue mr-2 mt-1.5">•</span>
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-full md:w-1/2 order-first md:order-last mb-6 sm:mb-8 md:mb-0">
              <div className="h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] w-full md:w-full rounded-tl-[200px] sm:rounded-tl-[300px] md:rounded-tl-[500px] rounded-bl-[200px] sm:rounded-bl-[300px] md:rounded-bl-[500px] overflow-hidden relative">
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