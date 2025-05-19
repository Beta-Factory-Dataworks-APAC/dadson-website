'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import UncompromisedSection from '@/components/home/UncompromisedSection';
import ThreeImageSection from '@/components/home/ThreeImageSection';
import NoBotsBanner from '@/components/home/NoBotsBanner';
import MetricsSection from '@/components/home/MetricsSection';
import ShippersCarriersSection from '@/components/home/ShippersCarriersSection';
import HomeMobileBanner from '@/components/home/HomeMobileBanner';
import Testimonial from '@/components/testimonials/Testimonial';
import CoreServices from '@/components/home/CoreServices';

const testimonialData = [
  {
    id: 1,
    quote: "During peak season, they helped us recover a critical shipment that was about to miss delivery. With just two hours' notice, they pulled it off. That's the kind of team you want on your side.",
    author: {
      name: "Mike H.",
      title: "Retail Supply Chain Director",
      image: "https://placehold.co/64x64"
    }
  },
  {
    id: 2,
    quote: "They understood the pressure I was under from day one. I never looked back.",
    author: {
      name: "Alicia M.",
      title: "Midwest Logistics Ops Lead",
      image: "https://placehold.co/64x64"
    }
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen w-full">
      {/* Hero section with its own margin container */}
      <section id="hero" data-index="1" className="bg-white">
        <div className="mx-[10px] md:mx-[20px]">
          <HeroSection />
        </div>
      </section>
      
      {/* Rest of the content */}
      <div className="w-full">
        <section id="uncompromised" data-index="2" className="min-h-screen 2xl:min-h-fit bg-white">
          <div className="mt-[20px] xs:mt-[30px] sm:mt-[40px] md:mt-[60px] 2xl:mt-[65px] 3xl:mt-[70px] 4xl:mt-[75px]">
            <UncompromisedSection />
          </div>
        </section>
        
        {/* Desktop content - only visible on md screens and up */}
        <div className="hidden md:block">
          <section id="freight-solutions" data-index="3" className="min-h-screen 2xl:min-h-fit 3xl:min-h-fit 4xl:min-h-fit bg-white">
            <div className="mt-[-10px] md:mt-[-20px] lg:mt-[-30px] 2xl:mt-[-35px] 3xl:mt-[-40px] 4xl:mt-[-45px]">
              <ThreeImageSection />
            </div>
            
            <div className="mt-2 sm:mt-4 md:mt-8 lg:mt-12 2xl:mt-14 3xl:mt-16 4xl:mt-18">
              <NoBotsBanner />
            </div>
          </section>
        </div>
        
        {/* Mobile content - only visible on xs and sm screens */}
        <section id="mobile-freight" data-index="4" className="block md:hidden w-full min-h-screen bg-white">
          <HomeMobileBanner />
        </section>
        
        <section id="metrics" data-index="5" className="min-h-screen 2xl:min-h-fit 3xl:min-h-fit 4xl:min-h-fit bg-white">
          <div className="mt-4 sm:mt-8 md:mt-12 lg:mt-16 2xl:mt-18 3xl:mt-20 4xl:mt-22">
            <MetricsSection />
          </div>
        </section>
        
        <section id="shippers-carriers" data-index="6" className="min-h-screen 2xl:min-h-fit 3xl:min-h-fit 4xl:min-h-fit bg-white">
          <div className="-mt-10 sm:mt-0 2xl:mt-2 3xl:mt-4 4xl:mt-6">
            <ShippersCarriersSection />
          </div>
        </section>
        
        {/* Core Services Section */}
        <section id="core-services" data-index="7" className="min-h-screen 2xl:min-h-fit 3xl:min-h-fit 4xl:min-h-fit bg-white">
          <div className="mt-4 sm:mt-8 md:mt-12 lg:mt-16 2xl:mt-18 3xl:mt-20 4xl:mt-22">
            <CoreServices />
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" data-index="8" className="min-h-screen 2xl:min-h-fit 3xl:min-h-fit 4xl:min-h-fit bg-white">
          <div className="mt-4 sm:mt-8 md:mt-12 lg:mt-16 2xl:mt-18 3xl:mt-20 4xl:mt-22">
            <Testimonial />
          </div>
        </section>
      </div>
      
      {/* Add other sections here as they are implemented */}
    </main>
  );
} 