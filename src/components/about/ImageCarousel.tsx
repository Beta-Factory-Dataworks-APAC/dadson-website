"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimationControls, useMotionValue } from 'framer-motion';

// Custom image tiles data
const imageTiles = [
  {
    id: 1,
    src: "/images/about/image1.jpeg",
    alt: "Logistics warehouse facility",
    width: 466,
    height: 350,
    containerStyles: "mr-4"
  },
  {
    id: 2,
    src: "/images/about/image2.jpeg", 
    alt: "Container port with cranes",
    width: 400,
    height: 350,
    containerStyles: "mx-4"
  },
  {
    id: 3,
    src: "/images/about/image3.jpeg",
    alt: "Aerial view of logistics operation",
    width: 600,
    height: 350,
    containerStyles: "mx-4"
  },
  {
    id: 4,
    src: "/images/about/image4.jpeg",
    alt: "Freight trucks on the road",
    width: 534,
    height: 350,
    containerStyles: "ml-4"
  }
];

// Duplicate tiles for the continuous scrolling effect
const allTiles = [...imageTiles, ...imageTiles.map(tile => ({...tile, id: `duplicate-${tile.id}`}))];

const ImageCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const controls = useAnimationControls();
  
  useEffect(() => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const viewportWidth = carouselRef.current.offsetWidth;
      setWidth(scrollWidth - viewportWidth);
    }
  }, []);

  useEffect(() => {
    if (width > 0) {
      const animateCarousel = async () => {
        await controls.start({
          x: -width / 2,
          transition: {
            duration: 40, // Slower for better viewing
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      };
      
      animateCarousel();
    }
  }, [width, controls]);

  return (
    <div className="overflow-hidden w-full px-6 md:px-12" ref={carouselRef}>
      <motion.div 
        className="flex flex-nowrap"
        animate={controls}
        style={{ x }}
      >
        {allTiles.map((tile) => (
          <div 
            key={tile.id} 
            className={`relative flex-shrink-0 overflow-hidden ${tile.containerStyles}`}
            style={{ 
              width: `${tile.width}px`,
              height: `${tile.height}px`,
              borderRadius: '20px',
              overflow: 'hidden'
            }}
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className={`object-cover`}
              style={{
                transition: 'filter 1.2s ease',
                borderRadius: '20px'
              }}
              onMouseEnter={(e) => {
                // Apply only filter effects without scaling
                const target = e.target as HTMLImageElement;
                // Apply image-specific filter adjustments
                if (tile.id === 1 || tile.id === 'duplicate-1') {
                  target.style.filter = 'brightness(1.1)';
                } else if (tile.id === 2 || tile.id === 'duplicate-2') {
                  target.style.filter = 'contrast(1.1)';
                } else if (tile.id === 3 || tile.id === 'duplicate-3') {
                  target.style.filter = 'saturate(1.1)';
                } else {
                  target.style.filter = 'brightness(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.filter = 'none';
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageCarousel; 