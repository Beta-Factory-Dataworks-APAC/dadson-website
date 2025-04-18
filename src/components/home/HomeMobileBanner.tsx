"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * HomeMobileBanner - Specialized mobile version of the three images and no bots banner
 * Optimized for xs and sm screens with enhanced visual presentation and animations
 */
const HomeMobileBanner = () => {
  return (
    <div className="w-full">
      {/* Three Images Section - Mobile Optimized */}
      <section className="bg-white py-6">
        <div className="max-w-[100vw] mx-auto">
          <div className="text-center mb-6 px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 font-clash">FREIGHT SOLUTIONS</h2>
            <p className="text-base text-gray-600 font-satoshi">Full-service logistics solutions</p>
          </div>
          <div className="grid grid-cols-1 gap-8 px-6">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              <div className="relative h-[200px] rounded-xl shadow-lg mb-4 overflow-hidden">
                <Image
                  src="/images/home/home1.png"
                  alt="Port Logistics"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-clash">Port Logistics</h3>
              <p className="text-base text-gray-600 px-4 font-satoshi">Container handling & port operations</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <div className="relative h-[200px] rounded-xl shadow-lg mb-4 overflow-hidden">
                <Image
                  src="/images/home/zetong-li-mVqTumQH-c0-unsplash.jpg"
                  alt="Rail Transport"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-clash">Rail Transport</h3>
              <p className="text-base text-gray-600 px-4 font-satoshi">Efficient rail freight solutions</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: false }}
            >
              <div className="relative h-[200px] rounded-xl shadow-lg mb-4 overflow-hidden">
                <Image
                  src="/images/home/home3.png"
                  alt="Air Freight"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-clash">Air Freight</h3>
              <p className="text-base text-gray-600 px-4 font-satoshi">Expedited air cargo services</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* No Bots Banner - Mobile Optimized */}
      <div className="bg-white overflow-hidden mt-8 sm:mt-12">
        {/* Improved Scrolling Text Banner */}
        <div className="relative overflow-hidden py-3 bg-gray-50">
          <div className="whitespace-nowrap animate-marquee-slower inline-block">
            <div className="inline-flex items-center text-[18px] sm:text-[22px] font-bold tracking-tight leading-none font-clash">
              <span className="text-[#1A1A1A]">NO BOTS.&nbsp;</span>
              <span className="text-[#A0A0A0]">NO GUESSWORK.&nbsp;</span>
              <span className="text-[#1A1A1A]">JUST FREIGHT DONE RIGHT&nbsp;&nbsp;&nbsp;</span>
              <span className="text-[#1A1A1A]">NO BOTS.&nbsp;</span>
              <span className="text-[#A0A0A0]">NO GUESSWORK.&nbsp;</span>
              <span className="text-[#1A1A1A]">JUST FREIGHT DONE RIGHT&nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>
        </div>

        {/* Content Section with Truck and Benefits - Animation restored */}
        <div className="relative pb-10 pt-6 px-4">
          {/* Two-column layout container */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Left column: Title, Description and Truck */}
            <div className="w-full sm:w-1/2">
              <motion.h2 
                className="text-2xl leading-tight font-semibold uppercase font-clash tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false }}
              >
                WE DON'T JUST<br />
                BOOK LOADS.<br />
                WE BUILD TRUST.
              </motion.h2>
              <motion.h3 
                className="text-base mt-2 font-medium font-satoshi"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false }}
              >
                Certified. Vetted. Verified.
              </motion.h3>
              <motion.p 
                className="text-sm text-gray-700 font-satoshi mt-2 mb-4 max-w-[95%]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: false }}
              >
                We're proud members of the Transportation Intermediaries Association (TIA) and the Better Business Bureau (BBB)—proof of our commitment to service, safety, and integrity.
              </motion.p>
              
              {/* Static truck image for improved reliability */}
              <div className="relative h-[160px] w-full flex justify-center items-end">
                <img
                  src="/images/truck.png"
                  alt="Dadson Logistics Truck"
                  className="w-[95%] h-auto object-contain max-w-[320px]"
                />
              </div>
            </div>

            {/* Right column: Benefits list */}
            <div className="w-full sm:w-1/2">
              <motion.div 
                className="flex flex-col gap-2 font-satoshi"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: false }}
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
                    className="flex items-start p-3 rounded-md border-l-4 border-[#00B4E1] bg-[#F8F9FA]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    viewport={{ once: false }}
                  >
                    <div className="w-full">
                      <h4 className="font-medium text-base">{item.title}</h4>
                      <p className="font-normal text-gray-600 text-sm mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMobileBanner; 