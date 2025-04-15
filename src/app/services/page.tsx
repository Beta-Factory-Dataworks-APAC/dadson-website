import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Services.module.css';

const FreightIcon = () => (
  <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 md:w-20 md:h-20 lg:w-[88px] lg:h-[88px]">
    <g clipPath="url(#clip0_2601_2)">
      <path d="M44 88C68.3005 88 88 68.3005 88 44C88 19.6995 68.3005 0 44 0C19.6995 0 0 19.6995 0 44C0 68.3005 19.6995 88 44 88Z" fill="#F4F7FB"/>
      <path d="M48.5605 56.6567V54.3317C48.5605 52.8187 49.6655 51.5667 51.1305 51.3897L60.5505 50.0467C61.8425 49.8917 62.9455 51.1097 62.9455 52.4137V56.0817C62.9455 57.3167 61.9685 58.2937 60.7335 58.2937H50.0225C49.1995 58.2937 48.5605 57.4797 48.5605 56.6567Z" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M65.6558 56.0816C65.6558 57.3166 64.6788 58.2936 63.4438 58.2936H60.7338C61.9688 58.2936 62.9458 57.3166 62.9458 56.0816V52.4136C62.9458 51.1096 61.8428 49.8916 60.5508 50.0466C62.1618 49.8696 65.6558 49.4066 65.6558 49.4066V56.0816Z" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M53.0605 58.293V60.618C53.0605 62.131 54.1655 63.383 55.6305 63.56L65.0505 64.903C66.3425 65.058 67.4455 63.84 67.4455 62.536V58.868C67.4455 57.633 66.4685 56.656 65.2335 56.656H54.5225C53.6995 56.656 53.0605 57.47 53.0605 58.293Z" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M70.1553 58.8679C70.1553 60.1029 69.1783 61.0799 67.9433 61.0799H65.2333C66.4683 61.0799 67.4453 60.1029 67.4453 58.8679V62.5359C67.4453 63.8399 66.3423 65.0579 65.0503 64.9029C66.6613 65.0799 70.1553 65.5429 70.1553 65.5429V58.8679Z" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M36.7061 62.4473H64.5721" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M36.7061 58.293H44.377" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M36.7061 54.1387H44.377" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M36.7061 49.9844H44.377" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M35.0303 35.9472L38.0952 43.6032H40.1931L42.9921 38.7462" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24.3955 42.1784C25.6185 41.7264 26.9195 42.0954 27.7555 43.0284L30.9335 46.5884C31.4075 47.1184 32.1635 47.3284 32.8415 47.0814L39.0395 44.8284" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M46.0938 39.8472L44.3738 43.6032H46.9278L50.3598 37.3672" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M53.0986 33.5842L55.4456 29.0312" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M43.0889 67H25.1519C23.2399 67 21.4649 65.89 20.6949 64.142L17.2969 56.485C16.9439 55.72 16.7539 54.89 16.7419 54.043L16.5479 31.778C16.5309 30.118 17.4909 28.59 19.0049 27.883L34.8479 20.758C37.5019 19.508 40.5909 19.508 43.2449 20.758L59.0879 27.883C60.6009 28.59 61.5619 30.118 61.5449 31.778L61.3509 54.043C61.3389 54.89 61.1479 55.72 60.7949 56.485L57.3979 64.142C56.6279 65.89 54.8539 67 52.9419 67H35.0049" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M39.0469 25.0923V30.2253" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M25.1479 28.7598L34.1529 23.9688" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M52.9416 28.7598L43.9366 23.9688" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_2601_2">
        <rect width="88" height="88" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const CrossDockIcon = () => (
  <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 md:w-20 md:h-20 lg:w-[88px] lg:h-[88px]">
    <g clipPath="url(#clip0_2601_23)">
      <path d="M44 88C68.3005 88 88 68.3005 88 44C88 19.6995 68.3005 0 44 0C19.6995 0 0 19.6995 0 44C0 68.3005 19.6995 88 44 88Z" fill="#F4F7FB"/>
      <path d="M26.8115 41.4355H22.6475C19.1485 41.4355 17.3295 39.9684 17.3295 35.5342C17.3295 31.1 19.1485 29.6328 22.6475 29.6328H26.8115" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M60.2266 41.4355H64.3906C67.8895 41.4355 69.7086 39.9684 69.7086 35.5342C69.7086 31.1 67.8895 29.6328 64.3906 29.6328H60.2266" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.32 35.4414H60.31" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32.9512 35.4414V56.7774" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M43.9844 35.4414V48.6774" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M54.1016 35.4414V56.7774" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M37.7832 56.7773H49.1212" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26.8945 48.6777H37.7845" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M49.1211 48.6777H60.2251" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M43.5156 67.0684V61.5244" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M38.0185 61.5244H49.0125" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M41.2012 29.3242V21.8702" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M46.2324 29.3242V23.9242" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M38.0195 29.3242H49.0195" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_2601_23">
        <rect width="88" height="88" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const WarehouseIcon = () => (
  <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 md:w-20 md:h-20 lg:w-[88px] lg:h-[88px]">
    <g clipPath="url(#clip0_2601_48)">
      <path d="M44 88C68.3005 88 88 68.3005 88 44C88 19.6995 68.3005 0 44 0C19.6995 0 0 19.6995 0 44C0 68.3005 19.6995 88 44 88Z" fill="#F4F7FB"/>
      <path d="M23.9766 47.3633H63.1006" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M63.1001 47.3633V65.2913" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23.9766 47.3633V65.2913" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23.9766 65.2969H37.3286V47.3609" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M37.3281 65.2969H49.7541V47.3609" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M49.75 65.2969H63.102V47.3609" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M43.5385 30.8008L63.1025 47.3568" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23.9766 47.3568L43.5386 30.8008L47.0716 33.8978" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M41.2856 36.3551H45.7946V41.4341H41.2856V36.3551Z" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M31.4648 59.3672H29.8548V56.1462H31.4648V59.3672Z" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M43.8467 59.3672H42.2367V56.1462H43.8467V59.3672Z" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M57.2183 59.3672H55.6083V56.1462H57.2183V59.3672Z" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.7773 65.293H66.3053" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M47.0762 33.8945L49.9702 22.7695L52.9842 23.6365L49.8332 35.5195" stroke="#01133E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_2601_48">
        <rect width="88" height="88" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export const metadata = {
  title: 'Our Services - Dadson Logistics',
  description: 'Discover our comprehensive logistics services, including freight brokerage, cross-docking, and warehousing solutions.',
};

export default function ServicesPage() {
  return (
    <div className={styles.servicesPage}>
      {/* Background Image with Overlay */}
      <Image 
        src="/images/hero-truck-highway.jpg" 
        alt="Logistics background" 
        className={styles.backgroundImage} 
        width={1920} 
        height={1022} 
        priority
      />
      <div className={styles.overlay} />
      
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Image 
          src="/images/dadson-logo-white.svg" 
          alt="Dadson Logistics" 
          width={104} 
          height={72} 
        />
      </div>
      
      {/* Navigation */}
      <div className={styles.navigation}>
        <div className={styles.navItem}>
          <div className={styles.navText}>HOME</div>
        </div>
        <div className={styles.navItemActive}>
          <div className={styles.navText}>SERVICES</div>
        </div>
        <div className={styles.navItem}>
          <div className={styles.navText}>ABOUT US</div>
        </div>
      </div>
      
      {/* Contact Us Button */}
      <div className={styles.contactButton}>
        <div className={styles.buttonText}>CONTACT US</div>
      </div>
      
      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.heroTextContainer}>
          <div className={styles.iconTextGroup}>
            <Image 
              src="/subtract.svg" 
              alt="Icon" 
              width={20} 
              height={20} 
              className={styles.subtractIcon} 
            />
            <div className={styles.labelText}>Our Services</div>
          </div>
          <div className={styles.mainHeading}>
            <span>We keep freight moving safely, efficiently </span>
            <span className={styles.highlightedText}>and without the usual friction.</span>
          </div>
          <div className={styles.subHeading}>
            <p>From port drayage to cross-country truckload,</p>
            <p>Dadson delivers consistent coverage and transparent communication.</p>
          </div>
        </div>
        
        <div className={styles.ctaButtons}>
          <div className={styles.primaryButton}>
            <div className={styles.buttonText}>GET A QUOTE</div>
          </div>
          <div className={styles.secondaryButton}>
            <div className={styles.buttonText}>BECOME A CARRIER</div>
          </div>
        </div>
      </div>
      
      {/* Hero Image */}
      <Image 
        src="/images/home/hero-truck-highway.jpg" 
        alt="Logistics truck on highway" 
        className={styles.heroImage} 
        width={765} 
        height={641} 
      />
      
      {/* What We Offer Section */}
      <div className={styles.offerSection}>
        <div className={styles.sectionTitle}>What We Offer</div>
        
        <div className={styles.serviceGrid}>
          <div className={styles.serviceRow}>
            {/* Full Truckload (FTL) */}
            <div className={styles.serviceCard}>
              <Image 
                src="/truck.png" 
                alt="Full Truckload Service" 
                className={styles.serviceImage} 
                width={500} 
                height={446} 
              />
              <div className={styles.serviceContent}>
                <div className={styles.serviceTitle}>
                  <p>Full Truckload</p>
                  <p className={styles.serviceSubtitle}>(FTL)</p>
                </div>
                <div className={styles.serviceDescription}>
                  Dry van, reefer, flatbed. Coast to coast or regional.
                </div>
              </div>
            </div>
            
            {/* Intermodal & Drayage */}
            <div className={styles.serviceCard}>
              <Image 
                src="/truck.png" 
                alt="Intermodal & Drayage" 
                className={styles.serviceImage} 
                width={500} 
                height={446} 
              />
              <div className={styles.serviceContent}>
                <div className={styles.serviceTitle}>Intermodal & Drayage</div>
                <div className={styles.serviceDescription}>
                  We handle container pickups and deliveries to and from ports and rail ramps with urgency and coordination.
                </div>
              </div>
            </div>
            
            {/* Less Than Truckload (LTL) */}
            <div className={styles.serviceCard}>
              <Image 
                src="/truck.png" 
                alt="Less Than Truckload Service" 
                className={styles.serviceImage} 
                width={500} 
                height={446} 
              />
              <div className={styles.serviceContent}>
                <div className={styles.serviceTitle}>
                  <span>Less Than Truckload </span>
                  <span className={styles.serviceSubtitle}>(LTL)</span>
                </div>
                <div className={styles.serviceDescription}>
                  Dry van, reefer, flatbed. Coast to coast or regional.
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.serviceRowSmall}>
            {/* Warehousing */}
            <div className={styles.serviceCard}>
              <Image 
                src="/truck.png" 
                alt="Warehousing" 
                className={styles.serviceImage} 
                width={500} 
                height={446} 
              />
              <div className={styles.serviceContent}>
                <div className={styles.serviceTitle}>Warehousing</div>
                <div className={styles.serviceDescription}>
                  Short/long-term storage matched to your needs.
                </div>
              </div>
            </div>
            
            {/* Transloading */}
            <div className={styles.serviceCard}>
              <Image 
                src="/images/carrier.png" 
                alt="Transloading" 
                className={styles.serviceImage} 
                width={500} 
                height={446} 
              />
              <div className={styles.serviceContent}>
                <div className={styles.serviceTitle}>Transloading</div>
                <div className={styles.serviceDescription}>
                  Seamless transfers from container to trailer minimizing dwell time and keeping freight on schedule.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* How We Back It Up Section */}
      <div className={styles.backItUpSection}>
        <div className={styles.sectionTitle}>How We Back It Up</div>
        
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureContent}>
              <Image 
                src="/images/service-freight.svg" 
                alt="Flag Icon" 
                width={34} 
                height={34} 
                className={styles.featureIcon} 
              />
              <div className={styles.featureText}>Real-time tracking & alerts.</div>
            </div>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureContent}>
              <Image 
                src="/images/service-supply.svg" 
                alt="Headphones Icon" 
                width={34} 
                height={34} 
                className={styles.featureIcon} 
              />
              <div className={styles.featureText}>24/7 access to a responsive team.</div>
            </div>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureContent}>
              <Image 
                src="/images/service-warehouse.svg" 
                alt="Truck Fast Icon" 
                width={34} 
                height={34} 
                className={styles.featureIcon} 
              />
              <div className={styles.featureText}>Vetted carriers with strict compliance checks.</div>
            </div>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureContent}>
              <Image 
                src="/images/service-express.svg" 
                alt="Puzzle Icon" 
                width={34} 
                height={34} 
                className={styles.featureIcon} 
              />
              <div className={styles.featureText}>Proud members of TIA and BBB.</div>
            </div>
          </div>
        </div>
      </div>
      
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
            <div className={styles.socialLink}>Twitter</div>
            <div className={styles.socialLink}>Facebook</div>
          </div>
        </div>
      </div>
    </div>
  );
}

