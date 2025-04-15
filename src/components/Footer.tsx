"use client";

/**
 * PROGRESS UPDATE - 2024
 * - Enhanced footer background with always-visible blurred overlay
 * - Improved animation performance with GPU acceleration
 * - Fixed SVG rendering issues in the FooterLogo component
 * - Added responsive animation timing for better mobile experience
 */

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FooterLogo from './FooterLogo';

// Optimized Footer Background SVG Component with smooth animations
const FooterBackground = () => {
  const [isVisible, setIsVisible] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure animations start with a staggered approach
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={backgroundRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      {/* Base background layer always visible */}
      <div className="absolute inset-0 bg-black opacity-100 transition-opacity duration-1000"></div>
      
      {/* Optimized blur layers always visible */}
      <div className="absolute inset-0 backdrop-blur-[50px] transition-all duration-1500 ease-in-out opacity-100"></div>
      
      {/* Gradient effects always visible but with subtle animation on load */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 
        backdrop-blur-[40px] mix-blend-multiply 
        transition-all duration-2000 ease-in-out delay-100
        opacity-50 ${isVisible ? 'scale-100' : 'scale-105'}
      `}></div>
      
      <div className={`
        absolute inset-0 bg-gradient-to-tr from-orange-900/5 to-indigo-900/5 
        backdrop-blur-[40px] mix-blend-overlay
        transition-all duration-2000 ease-in-out delay-200
        opacity-40 ${isVisible ? 'scale-100' : 'scale-105'}
      `}></div>
      
      {/* SVG overlay with animation on scroll */}
      <div className={`
        absolute inset-0 mix-blend-screen
        transition-all duration-2000 ease-in-out delay-300
        ${isVisible ? 'opacity-40 blur-xl' : 'opacity-0 blur-none'}
      `}>
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1690 1185" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="xMidYMid slice"
          className="animate-float-gentle transform-gpu will-change-transform"
        >
          <path d="M716.331 0L1689.5 698.5L1480 719.161L984.542 634.72L595.222 1185L0 46.5L716.331 404.5L716.331 0Z" fill="url(#paint0_linear_194_2633)" fillOpacity="0.8"/>
          <defs>
            <linearGradient id="paint0_linear_194_2633" x1="1189.16" y1="791.7" x2="433.828" y2="49.6581" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DC4D00"/>
              <stop offset="0.580534" stopColor="#7200DC"/>
              <stop offset="1" stopColor="#00B4E1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Smooth pulse overlay */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-purple-700/5 to-blue-700/5 
        mix-blend-overlay animate-pulse-smooth
        transition-opacity duration-2000 ease-in-out delay-500
        ${isVisible ? 'opacity-50' : 'opacity-0'}
      `}></div>
    </div>
  );
};

// Email arrow icon component
const EmailArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 inline-block">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM5.64461 7.06675C5.64461 7.48403 5.98288 7.82231 6.40016 7.82231H15.2428L5.8659 17.1992C5.57084 17.4942 5.57084 17.9726 5.8659 18.2677C6.16096 18.5627 6.63936 18.5627 6.93442 18.2677L16.3113 8.89082V17.7334C16.3113 18.1507 16.6495 18.489 17.0668 18.489C17.4841 18.489 17.8224 18.1507 17.8224 17.7334V7.06675V6.3112H17.0668H6.40016C5.98288 6.3112 5.64461 6.64947 5.64461 7.06675Z" fill="white"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isInView, setIsInView] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the footer is visible
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full bg-transparent text-white py-8 md:py-16 rounded-t-[20px] md:rounded-t-[40px] overflow-hidden"
    >
      {/* Background Component - always visible */}
      <FooterBackground />
      
      {/* Footer content container with fade-in animation */}
      <div className={`container mx-auto px-4 md:px-6 lg:px-8 relative z-10 transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        {/* Section 3: Tagline and CTA */}
        <div className="mb-10 md:mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="max-w-full md:max-w-2xl">
              {/* Contact us label */}
              <div className="flex items-center mb-4 md:mb-6">
                <span className="inline-block w-2 h-2 bg-[#00B4E1] rotate-45 mr-2"></span>
                <span className="text-sm text-[#00B4E1]">Contact us</span>
              </div>
              
              {/* Tagline - main part */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight mb-2 md:mb-3">
                Your next shipment deserves a partner.
              </h2>
              
              {/* Tagline - secondary part with different color */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight text-gray-400">
                not a vendor.
              </h2>
            </div>
            
            {/* CTA Buttons */}
            <div className="mt-6 md:mt-8 lg:mt-12 flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
              <Link href="/contact" className="px-4 md:px-6 py-3 bg-[#00B4E1] hover:bg-[#00a0cc] text-white font-medium rounded transition-colors duration-300 text-center min-w-[180px]">
                Schedule A 15 Min Call
              </Link>
              <Link href="/quote" className="px-4 md:px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white font-medium rounded border border-gray-700 transition-colors duration-300 text-center min-w-[180px]">
                Request A Quote
              </Link>
            </div>
          </div>
        </div>
        
        {/* Section 2: Quick links and email */}
        <div className="mb-10 md:mb-20 py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* Contact email */}
            <div className="mb-6 md:mb-0">
              <p className="text-sm mb-1 md:mb-2">Contact us at</p>
              <a href="mailto:support@dadson.us" className="text-white text-base md:text-lg lg:text-xl font-medium hover:text-[#00B4E1] transition-colors duration-300 flex items-center">
                support@dadson.us
                <EmailArrowIcon />
              </a>
            </div>
            
            {/* Navigation links */}
            <div className="w-full md:w-auto">
              <ul className="flex flex-wrap gap-4 md:gap-8 lg:gap-10">
                <li className="w-[calc(50%-8px)] md:w-auto">
                  <Link href="/services" className="text-white hover:text-[#00B4E1] transition-colors duration-300 block py-2 md:py-0">
                    Services
                  </Link>
                </li>
                <li className="w-[calc(50%-8px)] md:w-auto">
                  <Link href="/shippers" className="text-white hover:text-[#00B4E1] transition-colors duration-300 block py-2 md:py-0">
                    Shippers
                  </Link>
                </li>
                <li className="w-[calc(50%-8px)] md:w-auto">
                  <Link href="/carriers" className="text-white hover:text-[#00B4E1] transition-colors duration-300 block py-2 md:py-0">
                    Carriers
                  </Link>
                </li>
                <li className="w-[calc(50%-8px)] md:w-auto">
                  <Link href="/contact" className="text-white hover:text-[#00B4E1] transition-colors duration-300 block py-2 md:py-0">
                    Contact
                  </Link>
                </li>
                <li className="w-[calc(50%-8px)] md:w-auto">
                  <Link href="/careers" className="text-white hover:text-[#00B4E1] transition-colors duration-300 block py-2 md:py-0">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Section 1: Logo and copyright with social media links */}
        <div className="pt-6 md:pt-10">
          {/* Logo - using new FooterLogo component */}
          <div className="w-full max-w-full md:max-w-2xl mx-auto mb-8 md:mb-16">
            <FooterLogo />
          </div>
          
          {/* Copyright and social media links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 mt-6 md:mt-10">
            <p className="text-xs md:text-sm text-gray-400">
              {currentYear} Dadson Logistics. All rights reserved.
            </p>
            
            {/* Social media links */}
            <div className="flex gap-6 md:gap-8">
              <a href="https://www.linkedin.com/company/dadson-logistics" className="text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-300">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add the animation keyframes */}
      <style jsx global>{`
        @keyframes float-gentle {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
          }
          20% {
            transform: translateY(-4px) scale(1.01) rotate(0.5deg);
          }
          40% {
            transform: translateY(-6px) scale(1.02) rotate(0deg);
          }
          60% {
            transform: translateY(-2px) scale(1.005) rotate(-0.5deg);
          }
          80% {
            transform: translateY(-4px) scale(1.01) rotate(0.25deg);
          }
          100% {
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }
        
        @keyframes pulse-smooth {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0.3;
          }
        }
        
        .animate-float-gentle {
          animation: float-gentle 12s ease-in-out infinite;
        }
        
        .animate-pulse-smooth {
          animation: pulse-smooth 6s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer; 