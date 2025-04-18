'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Client component for carousel will be imported separately
import CarouselSection from '@/components/about/CarouselSection';

// SVG components for the Operating Model section
const RadicalOwnershipIcon = () => (
  <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.16602 29.75V22.2234M6.16602 22.2234C14.4084 15.7784 20.5903 28.668 28.8327 22.2231V6.11076C20.5903 12.5557 14.4084 -0.33448 6.16602 6.11046V22.2234Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HumanSupportIcon = () => (
  <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27.4167 15.5833C27.4167 10.1065 22.9768 5.66663 17.5 5.66663C12.0232 5.66663 7.58333 10.1065 7.58333 15.5833M23.1667 20.5416V23.375C23.1667 24.0332 23.1667 24.3624 23.2211 24.636C23.4447 25.76 24.3233 26.6391 25.4473 26.8627C25.721 26.9171 26.0501 26.9171 26.7083 26.9171C27.3666 26.9171 27.6957 26.9171 27.9694 26.8627C29.0934 26.6391 29.9718 25.76 30.1954 24.636C30.2498 24.3624 30.25 24.0332 30.25 23.375V20.5416C30.25 19.8834 30.2498 19.5536 30.1954 19.2799C29.9718 18.156 29.0934 17.278 27.9694 17.0544C27.6957 17 27.3666 17 26.7083 17C26.0501 17 25.721 17 25.4473 17.0544C24.3233 17.278 23.4447 18.156 23.2211 19.2799C23.1667 19.5536 23.1667 19.8834 23.1667 20.5416ZM11.8333 20.5416V23.375C11.8333 24.0332 11.8331 24.3624 11.7787 24.636C11.5551 25.76 10.6767 26.6391 9.55269 26.8627C9.279 26.9171 8.94998 26.9171 8.29173 26.9171C7.63347 26.9171 7.30434 26.9171 7.03064 26.8627C5.90668 26.6391 5.02801 25.76 4.80444 24.636C4.75 24.3624 4.75 24.0332 4.75 23.375V20.5416C4.75 19.8834 4.75 19.5536 4.80444 19.2799C5.02801 18.156 5.90668 17.278 7.03064 17.0544C7.30434 17 7.63347 17 8.29173 17C8.94999 17 9.279 17 9.55269 17.0544C10.6767 17.278 11.5551 18.156 11.7787 19.2799C11.8331 19.5536 11.8333 19.8834 11.8333 20.5416Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CarrierFirstIcon = () => (
  <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5008 19.832H18.9175C20.4758 19.832 21.7508 18.557 21.7508 16.9987V2.83203H9.00079C6.87579 2.83203 5.01997 4.00785 4.05664 5.73618" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.33203 24.082C3.33203 26.4337 5.23036 28.332 7.58203 28.332H8.9987C8.9987 26.7737 10.2737 25.4987 11.832 25.4987C13.3904 25.4987 14.6654 26.7737 14.6654 28.332H20.332C20.332 26.7737 21.607 25.4987 23.1654 25.4987C24.7237 25.4987 25.9987 26.7737 25.9987 28.332H27.4154C29.767 28.332 31.6654 26.4337 31.6654 24.082V19.832H27.4154C26.6362 19.832 25.9987 19.1945 25.9987 18.4154V14.1654C25.9987 13.3862 26.6362 12.7487 27.4154 12.7487H29.2428L26.8204 8.51288C26.3104 7.63455 25.3754 7.08203 24.3554 7.08203H21.7487V16.9987C21.7487 18.557 20.4737 19.832 18.9154 19.832H17.4987" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.8333 31.1667C13.3981 31.1667 14.6667 29.8981 14.6667 28.3333C14.6667 26.7685 13.3981 25.5 11.8333 25.5C10.2685 25.5 9 26.7685 9 28.3333C9 29.8981 10.2685 31.1667 11.8333 31.1667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23.1654 31.1667C24.7302 31.1667 25.9987 29.8981 25.9987 28.3333C25.9987 26.7685 24.7302 25.5 23.1654 25.5C21.6006 25.5 20.332 26.7685 20.332 28.3333C20.332 29.8981 21.6006 31.1667 23.1654 31.1667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M31.6667 17V19.8333H27.4167C26.6375 19.8333 26 19.1958 26 18.4167V14.1667C26 13.3875 26.6375 12.75 27.4167 12.75H29.2441L31.6667 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ZeroGhostingIcon = () => (
  <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 31.3334C6.96568 31.3334 6.96568 30.1015 8.43136 30.1015C9.89705 30.1015 9.89705 31.3334 11.3627 31.3334C12.8261 31.3334 12.8261 30.1015 14.2894 30.1015C15.7523 30.1015 15.7523 31.3334 17.2153 31.3334C18.678 31.3334 18.678 30.1015 20.1408 30.1015C21.6019 30.1015 21.6019 31.3334 23.063 31.3334C24.5221 31.3334 24.5221 30.1015 25.9813 30.1015C27.4436 30.1015 27.4436 31.3334 28.9058 31.3334L28.1197 25.8302C27.8229 23.7528 27.6739 21.657 27.6739 19.5585V13.8297C27.6739 8.25265 23.4654 3.38298 17.9 3.02261C11.8014 2.62771 6.73189 7.45729 6.73189 13.471V19.5585C6.73189 21.657 6.58294 23.7528 6.28617 25.8302L5.5 31.3334Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.5066 15.3187C13.8467 15.3187 14.1225 14.4914 14.1225 13.4709C14.1225 12.4503 13.8467 11.623 13.5066 11.623C13.1664 11.623 12.8906 12.4503 12.8906 13.4709C12.8906 14.4914 13.1664 15.3187 13.5066 15.3187Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.8991 15.3187C21.2393 15.3187 21.5151 14.4914 21.5151 13.4709C21.5151 12.4503 21.2393 11.623 20.8991 11.623C20.559 11.623 20.2832 12.4503 20.2832 13.4709C20.2832 14.4914 20.559 15.3187 20.8991 15.3187Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProblemSolverIcon = () => (
  <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28.8333 9.91667H25.7856C25.0808 9.91667 24.5833 9.2048 24.5833 8.5C24.5833 6.15279 22.6805 4.25 20.3333 4.25C17.9861 4.25 16.0833 6.15279 16.0833 8.5C16.0833 9.2048 15.5859 9.91667 14.8811 9.91667H11.8333C11.0509 9.91667 10.4167 10.5509 10.4167 11.3333V14.3811C10.4167 15.0859 9.7048 15.5833 9 15.5833C6.65279 15.5833 4.75 17.4861 4.75 19.8333C4.75 22.1805 6.65279 24.0833 9 24.0833C9.7048 24.0833 10.4167 24.5808 10.4167 25.2856V28.3333C10.4167 29.1157 11.0509 29.75 11.8333 29.75L28.8333 29.75C29.6157 29.75 30.25 29.1157 30.25 28.3333V25.2856C30.25 24.5808 29.5381 24.0833 28.8333 24.0833C26.4861 24.0833 24.5833 22.1805 24.5833 19.8333C24.5833 17.4861 26.4861 15.5833 28.8333 15.5833C29.5381 15.5833 30.25 15.0859 30.25 14.3811L30.25 11.3333C30.25 10.5509 29.6157 9.91667 28.8333 9.91667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AboutPage = () => {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full bg-white pt-[80px] sm:pt-[100px] md:pt-32 lg:pt-36 pb-6 sm:pb-8 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-3 md:gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-[#00B4E1] font-satoshi font-medium text-sm md:text-base"
            >
              <span>←</span>
              <span>About us</span>
            </Link>
            
            <div className="flex items-center gap-3 mb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6">
                <rect x="2" y="2" width="8" height="8" rx="1" fill="#00B4E1"></rect>
                <rect x="14" y="2" width="8" height="8" rx="1" fill="#00B4E1"></rect>
                <rect x="2" y="14" width="8" height="8" rx="1" fill="#00B4E1"></rect>
                <rect x="14" y="14" width="8" height="8" rx="1" fill="#00B4E1"></rect>
              </svg>
              <h2 className="font-clash font-semibold text-[#101B21] text-xl md:text-2xl">ABOUT US</h2>
            </div>
            
            <div className="font-clash font-semibold text-[28px] xs:text-[32px] sm:text-[42px] md:text-[60px] lg:text-[80px] leading-[1.125] uppercase max-w-4xl">
              <div className="text-[#101B21]">WE&apos;RE NOT JUST MOVING FREIGHT.</div>
              <div className="text-[#A9A9A9]">WE&apos;RE BUILDING TRUST.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Carousel - Now using client component wrapper */}
      <CarouselSection />

      {/* Mission & Responsibility Section */}
      <section className="w-full py-8 sm:py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-16 max-w-4xl">
            {/* Mission */}
            <div className="flex-1 flex flex-col gap-3 md:gap-4 p-5 md:p-6 lg:p-8 bg-white rounded-lg border border-gray-100 shadow-sm">
              <h2 className="font-clash font-semibold text-[20px] sm:text-[24px] md:text-[32px] uppercase text-[#101B21]">MISSION</h2>
              <p className="font-satoshi font-medium text-[14px] sm:text-[16px] md:text-[18px] leading-[1.5] text-[#707C83]">
                To become a trusted partner in freight by delivering consistent results, proactive communication, and long-term reliability for both shippers and carriers.
              </p>
            </div>
            
            {/* Responsibility */}
            <div className="flex-1 flex flex-col gap-3 md:gap-4 p-5 md:p-6 lg:p-8 bg-white rounded-lg border border-gray-100 shadow-sm mt-6 md:mt-0">
              <h2 className="font-clash font-semibold text-[20px] sm:text-[24px] md:text-[32px] uppercase text-[#101B21]">RESPONSIBILITY</h2>
              <p className="font-satoshi font-medium text-[14px] sm:text-[16px] md:text-[18px] leading-[1.5] text-[#707C83]">
                In an industry where silence, excuses, and short-term thinking win the norm, we stand for radical accountability, relationship-driven execution, and a carrier-first culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Model Section */}
      <section className="w-full py-8 sm:py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-clash font-semibold text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] uppercase text-[#101B21] mb-6 sm:mb-8 md:mb-16 text-center">
            OPERATING MODEL
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {/* Model Pillars */}
            <div className="flex flex-col items-center p-4 md:p-8 bg-white rounded-lg shadow-sm h-full hover:shadow-md transition-shadow duration-300">
              <div className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 text-[#101B21]">
                <RadicalOwnershipIcon />
              </div>
              <h3 className="font-clash font-semibold text-center text-[14px] sm:text-[16px] md:text-[18px] mb-2">Radical Ownership</h3>
            </div>
            
            <div className="flex flex-col items-center p-4 md:p-8 bg-white rounded-lg shadow-sm h-full hover:shadow-md transition-shadow duration-300">
              <div className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 text-[#101B21]">
                <HumanSupportIcon />
              </div>
              <h3 className="font-clash font-semibold text-center text-[14px] sm:text-[16px] md:text-[18px] mb-2">24/7 Human Support</h3>
            </div>
            
            <div className="flex flex-col items-center p-4 md:p-8 bg-white rounded-lg shadow-sm h-full hover:shadow-md transition-shadow duration-300">
              <div className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 text-[#101B21]">
                <CarrierFirstIcon />
              </div>
              <h3 className="font-clash font-semibold text-center text-[14px] sm:text-[16px] md:text-[18px] mb-2">Carrier-First Culture</h3>
            </div>
            
            <div className="flex flex-col items-center p-4 md:p-8 bg-white rounded-lg shadow-sm h-full hover:shadow-md transition-shadow duration-300">
              <div className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 text-[#101B21]">
                <ZeroGhostingIcon />
              </div>
              <h3 className="font-clash font-semibold text-center text-[14px] sm:text-[16px] md:text-[18px] mb-2">Zero Ghosting Policy</h3>
            </div>
            
            <div className="flex flex-col items-center p-4 md:p-8 bg-white rounded-lg shadow-sm h-full hover:shadow-md transition-shadow duration-300">
              <div className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 text-[#101B21]">
                <ProblemSolverIcon />
              </div>
              <h3 className="font-clash font-semibold text-center text-[14px] sm:text-[16px] md:text-[18px] mb-2">Problem Solvers, Not excuse givers.</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage; 