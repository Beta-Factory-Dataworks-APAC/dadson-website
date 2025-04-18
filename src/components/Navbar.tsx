"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// Define navigation items
const navItems = [
  { href: '/', label: 'HOME', sectionId: 'hero' },
  { href: '/services', label: 'SERVICES' },
  { href: '/about', label: 'ABOUT US' },
  { href: '/contact', label: 'CONTACT US' },
  // { href: '/blog', label: 'BLOG' }, // Uncomment when blog is ready
];

// Add scroll handler for home page sections
const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId?: string) => {
  if (href === '/' && sectionId && window.location.pathname === '/') {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const pathname = usePathname();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Add body overflow control for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle scroll and activity tracking
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const bannerHeight = pathname === '/' ? 580 : 400; // Adjust based on banner heights
      
      // Update scroll direction and visibility
      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      // Update scrolled state based on banner height
      setIsScrolled(currentScrollY > bannerHeight);
      setLastScrollY(currentScrollY);
      
      // Reset activity timer
      setLastActivityTime(Date.now());
    };

    const handleActivity = () => {
      setIsVisible(true);
      setLastActivityTime(Date.now());
    };

    const checkInactivity = () => {
      const inactiveTime = Date.now() - lastActivityTime;
      if (inactiveTime > 1500) { // 1.5 seconds of inactivity
        setIsVisible(false);
      }
      timeoutId = setTimeout(checkInactivity, 1000);
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    timeoutId = setTimeout(checkInactivity, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      clearTimeout(timeoutId);
    };
  }, [lastScrollY, lastActivityTime, pathname]);
  
  // Function to determine if a navigation item should be highlighted
  const isActive = (path: string): boolean => {
    // Check if pathname is null
    if (!pathname) return false;
    
    // Check if we're on the specific route
    if (pathname === path) {
      return true;
    }
    
    // Check if we're on the blog route or a sub-route
    if (path === '/blog' && pathname.startsWith('/blog')) {
      return true;
    }
    
    return false;
  };

  const linkBaseClasses = "font-satoshi font-medium text-[16px] tracking-wide leading-[1.2] px-6 py-2 uppercase transition-all";
  const activeLinkClasses = "text-white font-semibold"; // More visible active state
  const inactiveLinkClasses = "text-white hover:text-white/90"; // Lighter text for inactive

  // About page specific classes
  const aboutPageLinkClasses = "font-satoshi font-medium text-[16px] tracking-wide leading-[1.2] px-6 py-2 uppercase transition-all";
  const aboutPageActiveLinkClasses = "text-[#00B4E1] font-semibold"; // Cyan color for active state
  const aboutPageInactiveLinkClasses = "text-[#101B21] hover:text-[#00B4E1]/80"; // Dark text for inactive

  const contactButtonBaseClasses = "font-clash font-semibold text-[16px] tracking-wide leading-[1.2] rounded-[4px] px-6 py-2 transition-all uppercase";
  const activeContactButtonClasses = "bg-white text-[#101B21]"; // Active state with white background
  const inactiveContactButtonClasses = "bg-white text-[#101B21] hover:bg-white/90"; // White button with dark text

  // About page specific contact button
  const aboutPageContactButtonClasses = "font-clash font-semibold text-[16px] tracking-wide leading-[1.2] rounded-[4px] px-6 py-2 transition-all uppercase";
  const aboutPageActiveContactButtonClasses = "bg-[#00B4E1] text-white"; // Cyan button with white text
  const aboutPageInactiveContactButtonClasses = "bg-[#00B4E1] text-white hover:bg-[#00B4E1]/90"; // Cyan button with white text

  // Determine if we're on the about page or if we've scrolled past banner
  const shouldUseAboutStyles = isScrolled || pathname === '/about' || pathname === '/contact';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        !isVisible ? '-translate-y-full' : 'translate-y-0'} ${
        pathname === '/' ? 'pt-[10px] md:pt-[40px]' : ''} ${
        shouldUseAboutStyles ? 'bg-white py-3 shadow-sm' : 'bg-transparent py-2 md:py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {shouldUseAboutStyles ? (
              <svg width="80" height="70" viewBox="0 0 104 92" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" aria-label="Dadson Logo" className="w-[80px] h-[70px] md:w-[104px] md:h-[92px]">
                <title>Dadson Logo</title>
                <desc>Dadson company logo in blue color</desc>
                <path d="M69.0182 48.8306L26.2195 91.6293H0V0.364258H51.565L18.0888 33.867C12.1828 39.773 10.3819 44.6726 10.4348 49.4662C10.5143 54.2334 12.3417 58.9741 15.8906 62.4965C19.4925 66.1249 24.0743 67.9523 28.8679 68.0053C33.6351 68.0847 38.6407 66.2573 44.5467 60.3248L62.556 42.342C64.251 40.6205 65.4163 40.0908 66.6876 40.1702C67.8529 40.1702 69.0447 40.6734 69.9452 41.6004C70.7662 42.3949 71.1899 43.3484 71.2694 44.3548C71.4018 45.679 70.8456 46.9767 69.0182 48.8306Z" fill="#00B4E1"/>
                <path d="M103.58 45.917C103.58 57.9144 99.1307 68.72 91.8475 76.6918C83.4785 85.8289 71.481 91.523 55.1667 91.523V91.629H48.8899L82.4721 58.0468C87.716 52.8029 89.4639 47.4795 89.0666 42.2621C88.7488 37.8657 86.9214 33.5488 83.6903 30.3442C80.2209 26.8747 75.5332 25.0208 70.713 24.9678C65.9458 24.8884 61.0197 26.6628 56.0672 31.6154L36.6012 51.0814C35.224 52.4586 34.3765 52.9618 33.3966 52.9883C32.2313 53.1207 30.907 52.7499 29.9271 51.77C29.0002 50.8166 28.5499 49.7307 28.5234 48.5654C28.5234 47.4795 29.0002 46.3937 30.4568 44.937L72.5139 2.87988C78.9496 4.94566 84.3525 8.20324 88.8548 12.3348C97.886 20.7303 103.58 32.7277 103.58 45.917Z" fill="#00B4E1"/>
                <path d="M38.4813 91.9997C38.4019 91.9997 38.296 91.9732 38.2165 91.8937C38.0841 91.7613 38.0841 91.523 38.2165 91.364L39.5142 90.0133C39.6731 89.8544 39.9115 89.8544 40.0704 89.9869C40.2028 90.1458 40.2028 90.3841 40.0704 90.543L38.7462 91.8937C38.6932 91.9732 38.5873 91.9997 38.4813 91.9997Z" fill="#03033D"/>
              </svg>
            ) : (
              <svg width="80" height="70" viewBox="0 0 104 92" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" aria-label="Dadson Logo" className="w-[80px] h-[70px] md:w-[104px] md:h-[92px]">
                <title>Dadson Logo</title>
                <desc>Dadson company logo in blue color</desc>
                <path d="M69.0182 48.8306L26.2195 91.6293H0V0.364258H51.565L18.0888 33.867C12.1828 39.773 10.3819 44.6726 10.4348 49.4662C10.5143 54.2334 12.3417 58.9741 15.8906 62.4965C19.4925 66.1249 24.0743 67.9523 28.8679 68.0053C33.6351 68.0847 38.6407 66.2573 44.5467 60.3248L62.556 42.342C64.251 40.6205 65.4163 40.0908 66.6876 40.1702C67.8529 40.1702 69.0447 40.6734 69.9452 41.6004C70.7662 42.3949 71.1899 43.3484 71.2694 44.3548C71.4018 45.679 70.8456 46.9767 69.0182 48.8306Z" fill="#00B4E1"/>
                <path d="M103.58 45.917C103.58 57.9144 99.1307 68.72 91.8475 76.6918C83.4785 85.8289 71.481 91.523 55.1667 91.523V91.629H48.8899L82.4721 58.0468C87.716 52.8029 89.4639 47.4795 89.0666 42.2621C88.7488 37.8657 86.9214 33.5488 83.6903 30.3442C80.2209 26.8747 75.5332 25.0208 70.713 24.9678C65.9458 24.8884 61.0197 26.6628 56.0672 31.6154L36.6012 51.0814C35.224 52.4586 34.3765 52.9618 33.3966 52.9883C32.2313 53.1207 30.907 52.7499 29.9271 51.77C29.0002 50.8166 28.5499 49.7307 28.5234 48.5654C28.5234 47.4795 29.0002 46.3937 30.4568 44.937L72.5139 2.87988C78.9496 4.94566 84.3525 8.20324 88.8548 12.3348C97.886 20.7303 103.58 32.7277 103.58 45.917Z" fill="#00B4E1"/>
                <path d="M38.4813 91.9997C38.4019 91.9997 38.296 91.9732 38.2165 91.8937C38.0841 91.7613 38.0841 91.523 38.2165 91.364L39.5142 90.0133C39.6731 89.8544 39.9115 89.8544 40.0704 89.9869C40.2028 90.1458 40.2028 90.3841 40.0704 90.543L38.7462 91.8937C38.6932 91.9732 38.5873 91.9997 38.4813 91.9997Z" fill="#03033D"/>
              </svg>
            )}
          </Link>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex space-x-12">
              {navItems.slice(0, -1).map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`${shouldUseAboutStyles ? aboutPageLinkClasses : linkBaseClasses} ${
                    isActive(item.href) 
                      ? shouldUseAboutStyles ? aboutPageActiveLinkClasses : activeLinkClasses
                      : shouldUseAboutStyles ? aboutPageInactiveLinkClasses : inactiveLinkClasses
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Contact Button */}
          <div className="hidden md:block">
            <Link 
              href={navItems[navItems.length - 1].href}
              className={`${shouldUseAboutStyles ? aboutPageContactButtonClasses : contactButtonBaseClasses} ${
                isActive(navItems[navItems.length - 1].href)
                  ? shouldUseAboutStyles ? aboutPageActiveContactButtonClasses : activeContactButtonClasses
                  : shouldUseAboutStyles ? aboutPageInactiveContactButtonClasses : inactiveContactButtonClasses
              }`}
            >
              {navItems[navItems.length - 1].label}
            </Link>
          </div>
          
          {/* Mobile Menu Button - with improved accessibility */}
          <div className="md:hidden">
            <button
              type="button"
              className={`p-2 rounded-full transition-colors duration-200 ${
                shouldUseAboutStyles 
                  ? "hover:bg-gray-100 text-[#101B21]" 
                  : "bg-[#00B4E1] hover:bg-[#00B4E1]/90 text-white"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - with improved accessibility and styling */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu"
          className={`md:hidden fixed top-[60px] left-0 right-0 pt-2 pb-4 z-[100] border-t shadow-lg h-[calc(100vh-60px)] overflow-y-auto ${
            shouldUseAboutStyles 
              ? "bg-white border-gray-200" 
              : "bg-[#0F1923]/95 backdrop-blur-lg border-white/10"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`font-satoshi font-medium text-[18px] tracking-wide py-3 px-4 rounded-md flex justify-center items-center uppercase transition-all ${
                    isActive(item.href) 
                      ? shouldUseAboutStyles
                        ? "text-[#00B4E1] font-semibold bg-gray-50"
                        : "text-white font-semibold bg-white/10" 
                      : shouldUseAboutStyles
                        ? "text-[#101B21] hover:text-[#00B4E1] hover:bg-gray-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                  } ${index === navItems.length - 1 
                      ? `mt-2 ${
                         shouldUseAboutStyles 
                           ? "text-white bg-[#00B4E1] hover:bg-[#00B4E1]/90 shadow-sm" 
                           : "text-[#101B21] bg-white hover:bg-white/90 shadow-sm"
                       }` 
                      : ""
                    }`}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, item.href, item.sectionId);
                  }}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 