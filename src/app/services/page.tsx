'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Services.module.css';

// SVG Icons used in About page
const RadicalOwnershipIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27.5 14.5L27.5 33.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.5 14.5L20.5 33.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M44 24H30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 24H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 13L35 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 35L35 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 13L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 35L13 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HumanSupportIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M36.46 36.46L42 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 42L11.54 36.46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36.46 12.36L42 6.82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6.82L11.54 12.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 24.5C32 28.64 28.64 32 24.5 32C20.36 32 17 28.64 17 24.5C17 20.36 20.36 17 24.5 17C28.64 17 32 20.36 32 24.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CarrierFirstIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.41 34.59C25.05 34.95 24.55 35.15 24.02 35.15C23.49 35.15 22.99 34.95 22.63 34.59L13.41 25.37C13.05 25.01 12.85 24.51 12.85 23.98C12.85 23.45 13.05 22.95 13.41 22.59L22.63 13.37C22.99 13.01 23.49 12.81 24.02 12.81C24.55 12.81 25.05 13.01 25.41 13.37L34.63 22.59C34.99 22.95 35.19 23.45 35.19 23.98C35.19 24.51 34.99 25.01 34.63 25.37L25.41 34.59Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 12V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36 12H41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M38.5 12V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 36H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 41V36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36 36H41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M38.5 41V36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ZeroGhostingIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40C32.84 40 40 32.84 40 24C40 15.16 32.84 8 24 8C15.16 8 8 15.16 8 24C8 32.84 15.16 40 24 40Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 24L21 30L33 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProblemSolverIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M41.12 14L24 24L6.88 14L24 4L41.12 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 24V44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M41 14V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 14V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M34 44V31L24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 44V31L24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Services() {
  return (
    <div className={styles.servicesPage}>
      {/* Hero Section */}
      <section className="relative w-full bg-zinc-950 py-16 md:py-24">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row justify-between items-start gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start items-start">
            <div className="flex flex-col justify-start items-start gap-2 mb-3">
              <div className="text-primary-blue text-base font-medium font-satoshi">Our Services</div>
            </div>
              
            <h1 className="tracking-wide w-full mb-6">
              <span className="text-white text-5xl md:text-6xl font-medium font-clash uppercase block leading-[1.15]">WE KEEP</span>
              <span className="text-white text-5xl md:text-6xl font-medium font-clash uppercase block leading-[1.15]">FREIGHT</span>
              <span className="text-white text-5xl md:text-6xl font-medium font-clash uppercase block leading-[1.15]">MOVING SAFELY,</span>
              <span className="text-white text-5xl md:text-6xl font-medium font-clash uppercase block leading-[1.15]">EFFICIENTLY</span>
              <span className="text-gray-500 text-5xl md:text-6xl font-medium font-clash uppercase block leading-[1.15] mt-1">AND</span>
              <span className="text-gray-500 text-5xl md:text-6xl font-medium font-clash uppercase block leading-[1.15]">WITHOUT THE</span>
              <span className="text-gray-500 text-5xl md:text-6xl font-medium font-clash uppercase block leading-[1.15]">USUAL</span>
              <span className="text-gray-500 text-5xl md:text-6xl font-medium font-clash uppercase block leading-[1.15]">FRICTION.</span>
            </h1>
            
            <p className="text-gray-500 text-lg font-medium font-satoshi leading-normal mb-8">
              From port drayage to cross-country truckload,<br />
              Dadson delivers consistent coverage and transparent communication.
            </p>
            
            <div className="flex space-x-4 mb-8">
              <a href="/contact" className="inline-block px-6 py-3 bg-primary-blue rounded-md text-white text-sm font-semibold font-clash uppercase">
                GET A QUOTE
              </a>
              <a href="#" className="inline-block px-6 py-3 bg-zinc-800 rounded-md text-white text-sm font-semibold font-clash uppercase">
                BECOME A CARRIER
              </a>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="w-full lg:w-5/12 h-[340px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl">
            <Image 
              src="/images/services/Rectangle 37-min.png" 
              alt="Freight Services" 
              width={765} 
              height={641}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className={styles.offerSection}>
        <h2 className={`${styles.sectionTitle} font-clash uppercase text-4xl md:text-5xl font-medium text-center mb-16`}>What We Offer</h2>
        
        <div className={styles.servicesWrapper}>
          <div className={styles.topRowServices}>
            {/* Service Card 1 - Full Truckload */}
            <div className={`${styles.serviceCard} ${styles.animateCard1}`}>
              <Image 
                src="/images/services/Rectangle 40-min.png" 
                alt="Full Truckload Services" 
                width={400} 
                height={220}
                className={styles.serviceImage}
              />
              <div className={styles.serviceContent}>
                <h3 className={`${styles.serviceTitle} font-clash uppercase`}>
                  FULL TRUCKLOAD <span className={styles.serviceTitleSecondary}>(FTL)</span>
                </h3>
                <p className={`${styles.serviceDesc} font-satoshi`}>
                  Dedicated capacity for your shipments with direct transit from origin to destination. 
                  Our FTL service offers maximum security, faster delivery times, and competitive rates 
                  for loads that require an entire trailer.
                </p>
              </div>
            </div>
            
            {/* Service Card 2 - Intermodal */}
            <div className={`${styles.serviceCard} ${styles.animateCard2}`}>
              <Image 
                src="/images/services/Rectangle 40-1-min.png" 
                alt="Intermodal & Drayage Services" 
                width={400} 
                height={220}
                className={styles.serviceImage}
              />
              <div className={styles.serviceContent}>
                <h3 className={`${styles.serviceTitle} font-clash uppercase`}>
                  INTERMODAL <span className={styles.serviceTitleSecondary}>& DRAYAGE</span>
                </h3>
                <p className={`${styles.serviceDesc} font-satoshi`}>
                  Combine the efficiency of rail with the flexibility of trucking. Our intermodal 
                  solutions provide cost-effective transportation for long-haul shipments while 
                  reducing your carbon footprint and offering reliable capacity.
                </p>
              </div>
            </div>
            
            {/* Service Card 3 - LTL */}
            <div className={`${styles.serviceCard} ${styles.animateCard3}`}>
              <Image 
                src="/images/services/Rectangle 40-2-min.png" 
                alt="Less Than Truckload Services" 
                width={400} 
                height={220}
                className={styles.serviceImage}
              />
              <div className={styles.serviceContent}>
                <h3 className={`${styles.serviceTitle} font-clash uppercase`}>
                  LESS THAN TRUCKLOAD <span className={styles.serviceTitleSecondary}>(LTL)</span>
                </h3>
                <p className={`${styles.serviceDesc} font-satoshi`}>
                  Cost-effective shipping for smaller freight volumes. Our LTL service combines your 
                  shipment with others headed in the same direction, providing economical 
                  transportation without requiring a full trailer.
                </p>
              </div>
            </div>
          </div>
          
          <div className={styles.bottomRowServices}>
            {/* Service Card 4 - Warehousing */}
            <div className={`${styles.serviceCard} ${styles.animateCard4}`}>
              <Image 
                src="/images/services/Rectangle 40-3-min.png" 
                alt="Warehousing Services" 
                width={400} 
                height={220}
                className={styles.serviceImage}
              />
              <div className={styles.serviceContent}>
                <h3 className={`${styles.serviceTitle} font-clash uppercase`}>
                  WAREHOUSING <span className={styles.serviceTitleSecondary}>& DISTRIBUTION</span>
                </h3>
                <p className={`${styles.serviceDesc} font-satoshi`}>
                  Strategic storage and inventory management solutions to streamline your supply chain. 
                  Our warehousing services include cross-docking, fulfillment, and distribution 
                  capabilities to keep your products moving efficiently.
                </p>
              </div>
            </div>
            
            {/* Service Card 5 - Transloading */}
            <div className={`${styles.serviceCard} ${styles.animateCard5}`}>
              <Image 
                src="/images/services/image.png" 
                alt="Transloading Services" 
                width={400} 
                height={220}
                className={styles.serviceImage}
              />
              <div className={styles.serviceContent}>
                <h3 className={`${styles.serviceTitle} font-clash uppercase`}>
                  TRANSLOADING <span className={styles.serviceTitleSecondary}>SERVICES</span>
                </h3>
                <p className={`${styles.serviceDesc} font-satoshi`}>
                  Efficient transfer of products between different transportation modes. Our transloading 
                  solutions help you navigate multimodal logistics challenges, providing seamless transfers 
                  between rail, truck, and container shipments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How We Back It Up Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20">
        <h2 className="text-center font-clash uppercase text-4xl md:text-5xl font-medium mb-16">How We Back It Up</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="text-primary-blue mb-4">
              <RadicalOwnershipIcon />
            </div>
            <p className="text-gray-700 font-medium font-satoshi">Real-time tracking & alerts.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="text-primary-blue mb-4">
              <HumanSupportIcon />
            </div>
            <p className="text-gray-700 font-medium font-satoshi">24/7 access to a responsive team.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="text-primary-blue mb-4">
              <CarrierFirstIcon />
            </div>
            <p className="text-gray-700 font-medium font-satoshi">Vetted carriers with strict compliance checks.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="text-primary-blue mb-4">
              <ZeroGhostingIcon />
            </div>
            <p className="text-gray-700 font-medium font-satoshi">Proud members of TIA and BBB.</p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <Image 
            src="/images/dadson-footer.png" 
            alt="Footer Background" 
            width={1689} 
            height={1185} 
            className={styles.footerVector} 
          />
          
          <div className={styles.footerOverlay} />
          
          <div className={styles.footerButtons}>
            <div className={styles.primaryButton}>
              <div className={styles.buttonText}>Schedule A 15 Min Call</div>
            </div>
            <div className={styles.secondaryButton}>
              <div className={styles.buttonText}>Request A Quote</div>
            </div>
          </div>
          
          <div className={styles.footerInfoSection}>
            <div className={styles.iconTextGroup}>
              <Image 
                src="/subtract.svg" 
                alt="Icon" 
                width={20} 
                height={20} 
              />
              <div className={styles.contactText}>Contact us</div>
            </div>
            <div className={styles.quoteText}>
              <span>Your next shipment deserves a partner. </span>
              <span className={styles.quoteHighlight}>not a vendor.</span>
            </div>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.contactInfo}>
              <div className={styles.contactLabel}>Contact us at</div>
              <div className={styles.emailContainer}>
                <div className={styles.emailText}>support@dadson.us</div>
                <Image 
                  src="/subtract.svg" 
                  alt="Email Icon" 
                  width={24} 
                  height={24} 
                />
              </div>
            </div>
            
            <div className={styles.navLinks}>
              <div className={styles.navLink}>Services</div>
              <div className={styles.navLink}>Shippers</div>
              <div className={styles.navLink}>Carriers</div>
              <div className={styles.navLink}>Contact</div>
              <div className={styles.navLink}>Careers</div>
            </div>
          </div>
          
          <div className={styles.copyright}>
            2024 Dadson Logistics. All rights reserved.
          </div>
          
          <div className={styles.socialLinks}>
            <div className={styles.socialLink}>Linkedin</div>
          </div>
        </div>
      </div>
    </div>
  );
}



