"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TruckAnimation from '@/lib/react-bits/TruckAnimation';
import Link from 'next/link';

/**
 * HomeMobileBanner - Specialized mobile version of the three images and no bots banner
 * Optimized for xs and sm screens with enhanced visual presentation and animations
 */
const HomeMobileBanner = () => {
  // Animation variants for the image cards
  const cardVariants = {
    offscreen: {
      y: 20,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.8
      }
    }
  };

  // Cards appear with a staggered delay
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="pt-[8px]">
      {/* Three Images Section - Mobile Optimized */}
      <section className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">FREIGHT SOLUTIONS</h2>
            <p className="text-sm text-gray-600">Full-service logistics solutions</p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="text-center">
              <Image
                src="/images/home/home1.png"
                alt="Port Logistics"
                width={300}
                height={200}
                className="mx-auto rounded-lg shadow-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Port Logistics</h3>
              <p className="text-sm text-gray-600 px-4">Container handling & port operations</p>
            </div>
            <div className="text-center">
              <Image
                src="/images/home/home2.png"
                alt="Rail Transport"
                width={300}
                height={200}
                className="mx-auto rounded-lg shadow-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Rail Transport</h3>
              <p className="text-sm text-gray-600 px-4">Efficient rail freight solutions</p>
            </div>
            <div className="text-center">
              <Image
                src="/images/home/home3.png"
                alt="Air Freight"
                width={300}
                height={200}
                className="mx-auto rounded-lg shadow-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Air Freight</h3>
              <p className="text-sm text-gray-600 px-4">Expedited air cargo services</p>
            </div>
          </div>
        </div>
      </section>

      {/* No Bots Banner - Mobile Optimized */}
      <div className="bg-white w-full overflow-hidden mt-6 sm:mt-10">
        {/* Improved Scrolling Text Banner */}
        <div className="relative overflow-hidden py-3 bg-gray-50">
          <div className="whitespace-nowrap animate-marquee-slower inline-block">
            <div className="inline-flex items-center text-[18px] sm:text-[22px] font-bold tracking-tight leading-none font-clash">
              <span className="text-[#1A1A1A]">NO BOTS.&nbsp;</span>
              <span className="text-[#A0A0A0]">NO GUESSWORK.&nbsp;</span>
              <span className="text-[#1A1A1A]">FREIGHT DONE RIGHT&nbsp;&nbsp;&nbsp;</span>
              <span className="text-[#1A1A1A]">NO BOTS.&nbsp;</span>
              <span className="text-[#A0A0A0]">NO GUESSWORK.&nbsp;</span>
              <span className="text-[#1A1A1A]">FREIGHT DONE RIGHT&nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>
        </div>

        {/* Content Section with Truck and Benefits */}
        <div className="px-5 sm:px-8 relative pb-10 pt-5">
          {/* Enhanced Truck Animation for Mobile */}
          <div className="relative w-full h-[170px] mb-5">
            <TruckAnimation
              src="/truck.png"
              alt="Dadson Logistics Truck"
              width={600}
              height={300}
              className="absolute left-[-8%] bottom-[-10px] w-[125%]"
              priority
              delay={0.3}
            />
          </div>

          {/* Title and Description - improved for mobile */}
          <div className="mb-5">
            <motion.h2 
              className="text-2xl sm:text-3xl font-semibold mb-2 uppercase font-clash tracking-tight leading-tight"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              WE DON'T JUST<br />
              BOOK LOADS.<br />
              BUILD TRUST.
            </motion.h2>
            <motion.h3 
              className="text-lg sm:text-xl font-medium mb-3 font-satoshi"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Certified. Vetted. Verified.
            </motion.h3>
            <motion.p 
              className="text-gray-700 text-sm sm:text-base font-satoshi"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              At Dadson Logistics, every load is managed like it matters—because it does.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-2 mb-7"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/quote" 
              className="w-full px-6 py-3 bg-[#00B4E1]/90 hover:bg-[#00B4E1] rounded-md shadow-[0px_4px_34px_0px_rgba(0,180,225,0.15)] shadow-[inset_0px_-5px_12px_0px_rgba(255,255,255,0.15)] backdrop-blur-xl flex justify-center items-center"
            >
              <span className="text-white text-lg font-semibold font-clash">GET A QUOTE</span>
            </Link>
            <Link 
              href="/carriers" 
              className="w-full px-6 py-3 bg-white/10 hover:bg-white/15 rounded-md outline outline-1 outline-[#00B4E1]/30 backdrop-blur-xl flex justify-center items-center"
            >
              <span className="text-[#00B4E1] text-lg font-semibold font-clash">BECOME A CARRIER</span>
            </Link>
          </motion.div>

          {/* Benefits - Enhanced Card-like presentation for mobile */}
          <motion.div 
            className="flex flex-col gap-2 sm:gap-4 font-satoshi"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { title: "AI-Based Carrier Vetting", desc: "Smarter safety, fewer surprises" },
              { title: "Live Load Visibility", desc: "GPS tracking with predictive ETA" },
              { title: "Carrier First Culture", desc: "Loyal carriers mean dependable coverage" },
              { title: "Radical Ownership", desc: "We treat every load like it's our own" },
              { title: "Zero Ghosting", desc: "We don't disappear when things get tough" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-start p-4 rounded-lg border-l-4 border-[#00B4E1] bg-[#F8F9FA]"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div>
                  <h4 className="font-medium text-base sm:text-lg">{item.title}</h4>
                  <p className="font-normal text-gray-600 text-xs sm:text-sm mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeMobileBanner; 