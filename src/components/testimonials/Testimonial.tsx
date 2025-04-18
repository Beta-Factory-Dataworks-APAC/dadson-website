"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonialData = [
  {
    id: 1,
    quote: "Dadson Logistics has transformed our supply chain with their reliable and efficient service. Their commitment to excellence is unmatched in the industry.",
    author: {
      name: "Michael Chen",
      title: "Supply Chain Director",
      image: "/images/avatars/Avatar-1.png"
    }
  },
  {
    id: 2,
    quote: "Working with Dadson has been a game-changer for our business. Their freight solutions are innovative and cost-effective.",
    author: {
      name: "Sarah Johnson",
      title: "Operations Manager",
      image: "/images/avatars/Avatar.png"
    }
  }
];

const Testimonial = () => {
  return (
    <section id="testimonials" className="w-full relative min-h-screen">
      <div className="max-w-[1880px] mx-auto">
        {/* Mobile Header */}
        <div className="md:hidden px-5 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-500 text-xl font-normal font-['Satoshi'] mb-4"
          >
            What our partners say about Dadson.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-black text-4xl font-medium font-['Clash_Display'] uppercase leading-[48px]"
          >
            Real Stories<br />Real Impact
          </motion.div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block px-5 xl:px-[20px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute right-5 xl:right-[20px] top-[107px] text-gray-500 text-2xl font-normal font-['Satoshi']"
          >
            What our partners say about Dadson.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-[475px] text-black text-6xl font-medium font-['Clash_Display'] uppercase leading-[72px]"
          >
            Real Stories<br />Real Impact
          </motion.div>
        </div>
        
        {/* Testimonials Grid */}
        <div className="w-full mt-8 md:mt-[190px] px-5 xl:px-[20px]">
          <div className="flex flex-col md:flex-row gap-5 md:gap-[20px]">
            {/* Main Testimonial */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-[1405px] py-12 md:py-24 bg-gray-50 flex flex-col justify-start items-center gap-8 md:gap-16 overflow-hidden rounded-lg"
            >
              <div className="w-full px-4 md:px-8 max-w-[1280px] flex flex-col justify-start items-center">
                <div className="self-stretch flex flex-col justify-start items-center gap-8 md:gap-10">
                  <div className="self-stretch flex flex-col justify-start items-center gap-8">
                    <div className="inline-flex justify-start items-center gap-3">
                      <div className="w-32 h-8 relative">
                        <Image 
                          src="/images/dadson-logo.svg"
                          alt="Dadson Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="self-stretch text-center text-gray-900 text-2xl md:text-5xl font-medium font-['Satoshi'] leading-[36px] md:leading-[56px]">
                      {testimonialData[0].quote}
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-center gap-4">
                      <div className="w-16 h-16 relative rounded-full overflow-hidden">
                        <Image 
                          src={testimonialData[0].author.image} 
                          alt={`${testimonialData[0].author.name} - ${testimonialData[0].author.title}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="self-stretch flex flex-col justify-start items-center gap-1">
                        <div className="self-stretch text-center text-gray-900 text-lg font-medium font-['Satoshi'] leading-7">
                          {testimonialData[0].author.name}
                        </div>
                        <div className="self-stretch text-center text-gray-500 text-base font-normal font-['Satoshi'] leading-normal">
                          {testimonialData[0].author.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Secondary Testimonial */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full md:w-[455px] py-12 md:py-16 bg-gray-50 flex flex-col justify-between items-center overflow-hidden rounded-lg"
            >
              <div className="w-full px-4 flex-1 flex flex-col justify-between items-center">
                <div className="self-stretch flex flex-col justify-start items-center gap-8 md:gap-10">
                  <div className="self-stretch flex flex-col justify-start items-center gap-8">
                    <div className="inline-flex justify-start items-center gap-3">
                      <div className="w-32 h-8 relative">
                        <Image 
                          src="/images/dadson-logo.svg"
                          alt="Dadson Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="self-stretch text-center text-gray-900 text-xl md:text-3xl font-medium font-['Satoshi'] leading-[30px] md:leading-9">
                      {testimonialData[1].quote}
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-center gap-4">
                      <div className="w-16 h-16 relative rounded-full overflow-hidden">
                        <Image 
                          src={testimonialData[1].author.image} 
                          alt={`${testimonialData[1].author.name} - ${testimonialData[1].author.title}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="self-stretch flex flex-col justify-start items-center gap-1">
                        <div className="self-stretch text-center text-gray-900 text-lg font-medium font-['Satoshi'] leading-7">
                          {testimonialData[1].author.name}
                        </div>
                        <div className="self-stretch text-center text-gray-500 text-base font-normal font-['Satoshi'] leading-normal">
                          {testimonialData[1].author.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial; 