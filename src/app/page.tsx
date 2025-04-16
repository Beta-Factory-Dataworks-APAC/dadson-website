import React from 'react';
import HeroSection from '../components/home/HeroSection';
import UncompromisedSection from '../components/home/UncompromisedSection';
import ThreeImageSection from '../components/home/ThreeImageSection';
import NoBotsBanner from '../components/home/NoBotsBanner';
import MetricsSection from '../components/home/MetricsSection';
import ShippersCarriersSection from '../components/home/ShippersCarriersSection';
import HomeMobileBanner from '../components/home/HomeMobileBanner';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="mt-[-10px] xs:mt-[-15px] sm:mt-[-20px] md:mt-[-50px]">
        <UncompromisedSection />
      </div>
      
      {/* Desktop content - only visible on md screens and up */}
      <div className="hidden md:block">
        <div className="mt-[-10px] md:mt-[-20px] lg:mt-[-30px]">
          <ThreeImageSection />
        </div>
        
        <div className="mt-2 sm:mt-4 md:mt-8 lg:mt-12">
          <NoBotsBanner />
        </div>
      </div>
      
      {/* Mobile content - only visible on xs and sm screens */}
      <div className="block md:hidden">
        <div className="mt-10">
          <HomeMobileBanner />
        </div>
      </div>
      
      <div className="mt-4 sm:mt-8 md:mt-12 lg:mt-16">
        <MetricsSection />
      </div>
      <div className="-mt-10 sm:mt-0">
        <ShippersCarriersSection />
      </div>
      
      {/* Add other sections here as they are implemented */}
    </main>
  );
} 