"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// SVG Component for the gauge indicator spokes
const GaugeSpokes = ({ color = "white" }) => (
  <svg width="80" height="80" viewBox="0 0 116 116" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2">
    <rect x="50.7949" width="14.4099" height="116" fill={color}/>
    <rect x="80.7598" y="4.16797" width="14.4099" height="116" transform="rotate(30 80.7598 4.16797)" fill={color}/>
    <rect x="104.627" y="22.7617" width="14.4099" height="116" transform="rotate(60 104.627 22.7617)" fill={color}/>
    <rect x="116" y="50.7952" width="14.4099" height="116" transform="rotate(90 116 50.7952)" fill={color}/>
    <rect x="111.832" y="80.7598" width="14.4099" height="116" transform="rotate(120 111.832 80.7598)" fill={color}/>
    <rect x="93.2383" y="104.629" width="14.4099" height="116" transform="rotate(150 93.2383 104.629)" fill={color}/>
  </svg>
);

// Counter animation component
const CountUpAnimation = ({ endValue, duration = 1.2, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  // Change once to false to allow repeated animations
  const isInView = useInView(countRef, { once: false, amount: 0.5 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Clean up any existing animation
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Reset count to 0 when not in view
    if (!isInView) {
      setCount(0);
      return;
    }
    
    let start = 0;
    let end = parseFloat(endValue);
    
    // For integer values, use integer steps
    const useIntegers = Number.isInteger(end);
    
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;
    
    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / (endTime - startTime));
      
      if (progress === 1) {
        setCount(end);
        clearInterval(timer);
        return;
      }
      
      // Use easeOut effect
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = start + (end - start) * easedProgress;
      
      setCount(useIntegers ? Math.floor(currentCount) : currentCount);
    }, 16);
    
    timerRef.current = timer;
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [endValue, duration, isInView]);
  
  const displayValue = typeof count === 'number' && !isNaN(count) 
    ? (Number.isInteger(count) ? count : count.toFixed(1))
    : '0';
  
  return (
    <span ref={countRef}>{prefix}{displayValue}{suffix}</span>
  );
};

// Metric component for individual stats
const Metric = ({ value, label, bgColor = "from-[#eaeaea]", fillWidth = "35%", showDivider = true }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  // Change once to false to allow repeated animations
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  // Parse value into numeric and text parts
  const parseValue = (val) => {
    if (val === "24/7") return { prefix: "", numeric: "24", suffix: "/7" };
    if (val.endsWith("M+")) return { prefix: "", numeric: val.replace("M+", ""), suffix: "M+" };
    if (val.endsWith("%")) return { prefix: "", numeric: val.replace("%", ""), suffix: "%" };
    return { prefix: "", numeric: val, suffix: "" };
  };
  
  const { prefix, numeric, suffix } = parseValue(value);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, isInView]);

  return (
    <div className="w-full" ref={ref}>
      <div className="flex items-start py-8 md:py-10 relative">
        {/* Metric text */}
        <div className="min-w-[160px] mr-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className="flex flex-col items-start gap-1"
          >
            <div className="text-black text-5xl font-medium font-['Satoshi'] uppercase leading-tight">
              <CountUpAnimation endValue={numeric} prefix={prefix} suffix={suffix} />
            </div>
            <div className="text-[#707C83] text-xl font-medium font-['Satoshi']">
              {label}
            </div>
          </motion.div>
        </div>

        {/* Progress bar style gauge */}
        <div className="h-24 relative overflow-hidden mt-2" style={{ width: fillWidth }}>
          <motion.div
            initial={{ width: 0 }}
            animate={controls}
            variants={{
              hidden: { width: 0 },
              visible: { 
                width: "100%", 
                transition: { duration: 1.2, ease: "easeOut" } 
              }
            }}
            className={`h-full absolute top-0 right-0 rounded-l-[200px] bg-gradient-to-r ${bgColor} to-white/0`}
          >
            {/* White spoke indicators */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={controls}
              variants={{
                hidden: { x: "100%" },
                visible: { 
                  x: "0%", 
                  transition: { duration: 1.2, ease: "easeOut" } 
                }
              }}
              className="h-full relative overflow-hidden"
            >
              <GaugeSpokes />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Divider line */}
      {showDivider && (
        <div className="w-full h-[0.5px] bg-[#e3e3e3]"></div>
      )}
    </div>
  );
};

// Mobile version of the Metric component
const MobileMetric = ({ value, label, showDivider = true }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  // Change once to false to allow repeated animations
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  // Parse value into numeric and text parts
  const parseValue = (val) => {
    if (val === "24/7") return { prefix: "", numeric: "24", suffix: "/7" };
    if (val.endsWith("M+")) return { prefix: "", numeric: val.replace("M+", ""), suffix: "M+" };
    if (val.endsWith("%")) return { prefix: "", numeric: val.replace("%", ""), suffix: "%" };
    return { prefix: "", numeric: val, suffix: "" };
  };
  
  const { prefix, numeric, suffix } = parseValue(value);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, isInView]);

  return (
    <div className="w-full mb-8" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className="text-center"
      >
        <div className="text-black text-4xl font-medium font-['Satoshi'] uppercase leading-tight mb-1">
          <CountUpAnimation endValue={numeric} prefix={prefix} suffix={suffix} />
        </div>
        <div className="text-[#707C83] text-lg font-medium font-['Satoshi']">
          {label}
        </div>
      </motion.div>
      
      {showDivider && (
        <div className="w-full h-[0.5px] bg-[#e3e3e3] mt-8"></div>
      )}
    </div>
  );
};

const MetricsSection = () => {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <section className="w-full py-20 px-6 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-medium font-['Clash_Display'] uppercase text-black mb-20 md:mb-24 max-w-2xl"
        >
          Why Logistics Teams{" "}
          <span className="block md:mt-2">Choose Dadson</span>
        </motion.h2>

        {/* Desktop Version - with progress bars */}
        <div className="hidden md:block w-full">
          <Metric 
            value="98.7%" 
            label="On-Time Rate"
            bgColor="from-[#eaeaea]"
            fillWidth="35%"
          />
          
          <Metric 
            value="24/7" 
            label="Live Support"
            bgColor="from-[#d8f5fa]"
            fillWidth="75%"
          />
          
          <Metric 
            value="3M+" 
            label="Miles Tracked Monthly"
            bgColor="from-[#eaeaea]"
            fillWidth="35%"
            showDivider={false}
          />
        </div>

        {/* Mobile Only Version */}
        <div className="md:hidden w-full">
          <MobileMetric 
            value="98.7%" 
            label="On-Time Rate" 
          />
          
          <MobileMetric 
            value="24/7" 
            label="Live Support" 
          />
          
          <MobileMetric 
            value="3M+" 
            label="Miles Tracked Monthly"
            showDivider={false}
          />
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;