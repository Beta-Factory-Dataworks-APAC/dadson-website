"use client";

import React from 'react';
import ImageCarousel from './ImageCarousel';

const CarouselSection = () => {
  return (
    <section className="w-full relative py-12 md:py-16 bg-white overflow-hidden">
      <ImageCarousel />
    </section>
  );
};

export default CarouselSection; 