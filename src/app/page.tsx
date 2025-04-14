import React from 'react';
import HeroSection from '../components/home/HeroSection';
import UncompromisedSection from '../components/home/UncompromisedSection';
import ThreeImageSection from '../components/home/ThreeImageSection';
import NoBotsBanner from '../components/home/NoBotsBanner';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="mt-[-50px]">
        <UncompromisedSection />
      </div>
      <div className="mt-[-30px]">
        <ThreeImageSection />
      </div>
      <div className="mt-12">
        <NoBotsBanner />
      </div>
      
      {/* Add other sections here as they are implemented */}
    </main>
  );
} 