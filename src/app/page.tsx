'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import UncompromisedSection from '@/components/home/UncompromisedSection';
import ThreeImageSection from '@/components/home/ThreeImageSection';
import NoBotsBanner from '@/components/home/NoBotsBanner';
import MetricsSection from '@/components/home/MetricsSection';
import ShippersCarriersSection from '@/components/home/ShippersCarriersSection';
import HomeMobileBanner from '@/components/home/HomeMobileBanner';

export default function HomePage() {
  return (
    <main className="min-h-screen w-full">
      {/* Hero section with its own margin container */}
      <section id="hero" data-index="1" className="min-h-screen">
        <div className="mx-[10px] md:mx-[20px]">
          <HeroSection />
        </div>
      </section>
      
      {/* Rest of the content */}
      <div className="w-full">
        <section id="uncompromised" data-index="2" className="">
          <div className="mt-[-10px] xs:mt-[-15px] sm:mt-[-20px] md:mt-[-50px]">
            <UncompromisedSection />
          </div>
        </section>
        
        {/* Desktop content - only visible on md screens and up */}
        <div className="hidden md:block">
          <section id="freight-solutions" data-index="3" className="min-h-screen">
            <div className="mt-[-10px] md:mt-[-20px] lg:mt-[-30px]">
              <ThreeImageSection />
            </div>
            
            <div className="mt-2 sm:mt-4 md:mt-8 lg:mt-12">
              <NoBotsBanner />
            </div>
          </section>
        </div>
        
        {/* Mobile content - only visible on xs and sm screens */}
        <section id="mobile-freight" data-index="4" className="block md:hidden w-full min-h-screen">
          <HomeMobileBanner />
        </section>
        
        <section id="metrics" data-index="5" className="min-h-screen">
          <div className="mt-4 sm:mt-8 md:mt-12 lg:mt-16">
            <MetricsSection />
          </div>
        </section>
        
        <section id="shippers-carriers" data-index="6" className="min-h-screen">
          <div className="-mt-10 sm:mt-0">
            <ShippersCarriersSection />
          </div>
        </section>
      </div>
      
      {/* Add other sections here as they are implemented */}
    </main>
  );
} 