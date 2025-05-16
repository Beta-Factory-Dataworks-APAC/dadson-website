"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const defaultTestimonialData = [
  {
    id: 1,
    quote: "Dadson Logistics has transformed our supply chain with their reliable and efficient service. Their commitment to excellence is unmatched in the industry.",
    author: {
      name: "Sarah Johnson",
      title: "Operations Manager",
      image: "/images/avatars/Avatar-1.png"
    }
  },
  {
    id: 2,
    quote: "Working with Dadson has been a game-changer for our business. Their freight solutions are innovative and cost-effective.",
    author: {
      name: "Michael Chen",
      title: "Supply Chain Director",
      image: "/images/avatars/Avatar.png"
    }
  }
];

type TestimonialProps = {
  testimonials?: {
    id: number;
    quote: string;
    author: {
      name: string;
      title: string;
      image: string;
    };
  }[];
};

const Testimonial = ({ testimonials = defaultTestimonialData }: TestimonialProps) => {
  return (
    <section id="testimonials" className="w-full relative min-h-screen 2xl:min-h-fit py-12 md:py-20 2xl:py-16 3xl:py-14 4xl:py-12">
      {/* Mobile Header */}
      <div className="md:hidden px-5 mb-8 ml-[20%]">
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
          className="absolute ml-[20%] right-5 xl:right-[20%] top-[107px] text-gray-500 text-2xl font-normal font-['Satoshi']"
        >
          What our partners say about Dadson.
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="ml-[20%] w-[475px] text-black text-6xl font-medium font-['Clash_Display'] uppercase leading-[72px]"
        >
          Real Stories<br />Real Impact
        </motion.div>
      </div>
      
      {/* Testimonials Grid */}
      <div className="w-full mt-8 md:mt-[190px]">
        <div className="flex flex-col md:flex-row md:justify-between w-full">
          {/* Main Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-3/4 py-12 md:py-24 bg-gray-50 flex flex-col justify-start items-center gap-8 md:gap-16 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="w-full px-4 md:px-8 flex flex-col justify-start items-center">
              <div className="w-full flex flex-col justify-start items-center gap-8 md:gap-10">
                <div className="w-full flex flex-col justify-start items-center gap-8">
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
                  <div className="w-full text-center text-gray-900 text-2xl md:text-5xl font-medium font-['Satoshi'] leading-[36px] md:leading-[56px] px-4 md:px-8 py-6 md:py-8 bg-gray-50 rounded-lg">
                    {testimonials[0].quote}
                  </div>
                  <div className="w-full flex flex-col justify-start items-center gap-4 mt-4">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-gray-100">
                      <Image 
                        src={testimonials[0].author.image} 
                        alt={`${testimonials[0].author.name} - ${testimonials[0].author.title}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="w-full flex flex-col justify-start items-center gap-1">
                      <div className="text-center text-gray-900 text-lg font-medium font-['Satoshi'] leading-7">
                        {testimonials[0].author.name}
                      </div>
                      <div className="text-center text-gray-500 text-base font-normal font-['Satoshi'] leading-normal">
                        {testimonials[0].author.title}
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
            className="w-full md:w-1/4 py-12 md:py-16 bg-gray-50 flex flex-col justify-between items-center overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 md:ml-5"
          >
            <div className="w-full px-4 flex-1 flex flex-col justify-between items-center">
              <div className="w-full flex flex-col justify-start items-center gap-8 md:gap-10">
                <div className="w-full flex flex-col justify-start items-center gap-8">
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
                  <div className="w-full text-center text-gray-900 text-xl md:text-3xl font-medium font-['Satoshi'] leading-[30px] md:leading-9 px-4 md:px-6 py-6 bg-gray-50 rounded-lg">
                    {testimonials[1]?.quote || testimonials[0].quote}
                  </div>
                  <div className="w-full flex flex-col justify-start items-center gap-4 mt-4">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-gray-100">
                      <Image 
                        src={testimonials[1]?.author.image || testimonials[0].author.image} 
                        alt={`${testimonials[1]?.author.name || testimonials[0].author.name} - ${testimonials[1]?.author.title || testimonials[0].author.title}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="w-full flex flex-col justify-start items-center gap-1">
                      <div className="text-center text-gray-900 text-lg font-medium font-['Satoshi'] leading-7">
                        {testimonials[1]?.author.name || testimonials[0].author.name}
                      </div>
                      <div className="text-center text-gray-500 text-base font-normal font-['Satoshi'] leading-normal">
                        {testimonials[1]?.author.title || testimonials[0].author.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial; 