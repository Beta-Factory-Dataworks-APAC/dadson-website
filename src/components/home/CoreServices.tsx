'use client';

import { useState, useEffect } from 'react';

// Arrow component for the cards
const ArrowIcon = () => (
  <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white flex items-center justify-center z-20 transition-transform duration-300 transform hover:scale-110 shadow-md">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

// Service Card Component
const ServiceCard = ({ 
  title, 
  image, 
  rotation, 
  offset, 
  zIndex,
  onHover,
  onLeave
}: { 
  title: string; 
  image: string; 
  rotation: 'left' | 'middle' | 'right' | 'none'; 
  offset: string; 
  zIndex: number;
  onHover?: (title: string) => void;
  onLeave?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  // Card rotation and hover effects
  let rotateClass = '';
  let hoverRotateClass = '';
  
  if (rotation === 'left') {
    rotateClass = '-rotate-[8deg]';
    hoverRotateClass = '-rotate-[4deg]';
  } else if (rotation === 'middle') {
    rotateClass = 'rotate-0';
    hoverRotateClass = 'rotate-0';
  } else if (rotation === 'right') {
    rotateClass = 'rotate-[8deg]';
    hoverRotateClass = 'rotate-[4deg]';
  }
  
  // Handle hover state and callbacks
  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover && onHover(title);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave && onLeave();
  };

  const handleTouchStart = () => {
    setIsHovered(true);
    onHover && onHover(title);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsHovered(false);
      onLeave && onLeave();
    }, 500);
  };
  
  return (
    <div 
      className={`relative w-[280px] h-[500px] rounded-2xl overflow-hidden shadow-2xl ${rotateClass} transition-all duration-500 ${isHovered ? `${hoverRotateClass} scale-105` : ''} ${offset}`}
      style={{
        transformStyle: 'preserve-3d',
        zIndex: zIndex,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/70 z-10"></div>
      
      {/* Card Image */}
      <div className="relative w-full h-full">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
        
        {/* Fallback colored background if image fails to load */}
        {imgError && (
          <div 
            className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-700"
            aria-hidden="true"
          />
        )}
      </div>
      
      {/* Card Title */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center z-20">
        <h3 className="text-lg uppercase text-white text-center max-w-[200px] mx-auto leading-tight tracking-wide font-clash font-semibold">
          {title}
        </h3>
      </div>
      
      <ArrowIcon />
    </div>
  );
};

// Mobile Service Card
const MobileServiceCard = ({ 
  title, 
  image, 
  rotation,
  onHover,
  onLeave
}: { 
  title: string; 
  image: string; 
  rotation: 'left' | 'right' | 'none';
  onHover?: (title: string) => void;
  onLeave?: () => void;
}) => {
  const [isActive, setIsActive] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  let rotateClass = '';
  if (rotation === 'left') rotateClass = '-rotate-3';
  else if (rotation === 'right') rotateClass = 'rotate-3';
  
  const handleTouch = () => {
    setIsActive(true);
    onHover && onHover(title);
  };
  
  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsActive(false);
      onLeave && onLeave();
    }, 500);
  };
  
  const handleMouseEnter = () => {
    setIsActive(true);
    onHover && onHover(title);
  };
  
  const handleMouseLeave = () => {
    setIsActive(false);
    onLeave && onLeave();
  };
  
  return (
    <div 
      className={`relative w-full max-w-xs h-[380px] rounded-xl overflow-hidden shadow-lg ${rotateClass} transition-all duration-500 ${isActive ? 'scale-[1.02]' : ''} mb-10`}
      onTouchStart={handleTouch}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/70 z-10"></div>
      <div className="relative w-full h-full">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
        
        {/* Fallback colored background if image fails to load */}
        {imgError && (
          <div 
            className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-700"
            aria-hidden="true"
          />
        )}
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center z-20">
        <h3 className="text-lg uppercase text-white text-center max-w-[180px] mx-auto leading-tight tracking-wide font-clash font-semibold">
          {title}
        </h3>
      </div>
      
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center z-20">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

const CoreServices = () => {
  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimateCards(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Using the exact paths that match the design
  const truckLoadImage = "/images/services/full-truckload-min.png";
  const loadToRideImage = "/images/services/lessthantruckload-min.png";
  const intermodalImage = "/images/services/intermodal-min.png";
  
  // Dynamic background effect functions
  const getBackgroundStyle = () => {
    if (!hoveredCard) return { opacity: 0 };
    
    switch(hoveredCard) {
      case 'FULL TRUCK LOAD':
        return {
          background: 'linear-gradient(120deg, rgba(37, 99, 235, 0.06) 0%, rgba(37, 99, 235, 0) 70%)',
          opacity: 1
        };
      case 'LOAD TO RIDE':
        return {
          background: 'linear-gradient(120deg, rgba(220, 38, 38, 0.06) 0%, rgba(220, 38, 38, 0) 70%)',
          opacity: 1
        };
      case 'INTERMODAL & DRAYAGE':
        return {
          background: 'linear-gradient(120deg, rgba(234, 179, 8, 0.06) 0%, rgba(234, 179, 8, 0) 70%)',
          opacity: 1
        };
      default:
        return { opacity: 0 };
    }
  };
  
  // Border color effect
  const getPatternStyle = () => {
    if (!hoveredCard) return {};
    
    switch(hoveredCard) {
      case 'FULL TRUCK LOAD':
        return { borderColor: 'rgba(37, 99, 235, 0.3)' };
      case 'LOAD TO RIDE':
        return { borderColor: 'rgba(220, 38, 38, 0.3)' };
      case 'INTERMODAL & DRAYAGE':
        return { borderColor: 'rgba(234, 179, 8, 0.3)' };
      default:
        return {};
    }
  };
  
  return (
    <section className="w-full py-24 md:py-36 bg-white relative overflow-hidden">
      {/* Dynamic background that changes based on hovered card */}
      <div 
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={getBackgroundStyle()}
      ></div>
      
      {/* Background pattern with subtle border effect */}
      <div className="absolute inset-0 opacity-40 transition-all duration-700">
        <div 
          className="w-full h-full border-[3px] border-gray-200 transition-duration-700"
          style={getPatternStyle()}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-medium uppercase text-gray-900 mb-4 font-clash">
            OUR CORE SERVICES
          </h2>
          <p className="text-base md:text-lg text-gray-500 font-satoshi mb-8 md:mb-12">
            Backed by D.I.C.E. — Dedication. Integrity. Commitment. Execution.
          </p>
        </div>
        
        {/* Main Content Container */}
        <div className="flex flex-col mt-8 md:mt-14">
          {/* Desktop Layout */}
          <div className="hidden md:flex flex-row items-start">
            {/* Description - Positioned higher than cards */}
            <div className="w-1/4 pr-8 self-start mt-20">
              <p className="text-base text-gray-500 font-medium leading-relaxed font-satoshi">
                Reliable, scalable capacity across the U.S. & Canada — powered by a network of 5,000+ trusted carriers.
              </p>
            </div>
            
            {/* Cards Container - exact positioning to match design */}
            <div className="w-3/4 min-h-[500px] relative" style={{ perspective: '2000px' }}>
              <div className={`flex items-center justify-center transform transition-all duration-1000 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                {/* Card 1 - Full Truck Load - positioned to match reference */}
                <ServiceCard 
                  title="FULL TRUCK LOAD" 
                  image={truckLoadImage}
                  rotation="left"
                  offset="-translate-x-[30px] -translate-y-6"
                  zIndex={10}
                  onHover={setHoveredCard}
                  onLeave={() => setHoveredCard(null)}
                />
                
                {/* Card 2 - Load to Ride - positioned to match reference */}
                <ServiceCard 
                  title="LOAD TO RIDE" 
                  image={loadToRideImage}
                  rotation="middle"
                  offset="translate-x-0 translate-y-12"
                  zIndex={30}
                  onHover={setHoveredCard}
                  onLeave={() => setHoveredCard(null)}
                />
                
                {/* Card 3 - Intermodal & Drayage - positioned to match reference */}
                <ServiceCard 
                  title="INTERMODAL & DRAYAGE" 
                  image={intermodalImage}
                  rotation="right"
                  offset="translate-x-[30px] -translate-y-6"
                  zIndex={20}
                  onHover={setHoveredCard}
                  onLeave={() => setHoveredCard(null)}
                />
              </div>
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Description */}
            <div className="mb-12">
              <p className="text-base text-gray-500 font-medium leading-relaxed text-center font-satoshi">
                Reliable, scalable capacity across the U.S. & Canada — powered by a network of 5,000+ trusted carriers.
              </p>
            </div>
            
            {/* Mobile Cards Container */}
            <div className={`flex flex-col items-center justify-center transform transition-all duration-1000 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <MobileServiceCard 
                title="FULL TRUCK LOAD" 
                image={truckLoadImage}
                rotation="left"
                onHover={setHoveredCard}
                onLeave={() => setHoveredCard(null)}
              />
              
              <MobileServiceCard 
                title="LOAD TO RIDE" 
                image={loadToRideImage}
                rotation="none"
                onHover={setHoveredCard}
                onLeave={() => setHoveredCard(null)}
              />
              
              <MobileServiceCard 
                title="INTERMODAL & DRAYAGE" 
                image={intermodalImage}
                rotation="right"
                onHover={setHoveredCard}
                onLeave={() => setHoveredCard(null)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreServices; 