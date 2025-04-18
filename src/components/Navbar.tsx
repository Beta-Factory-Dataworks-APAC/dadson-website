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
        shouldUseAboutStyles ? 'bg-white py-2 md:py-3 shadow-sm' : 'bg-transparent py-2 md:py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-1 md:py-0">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-40 h-10 md:w-48 md:h-12">
              <Image 
                src="/images/dadson-logo.svg"
                alt="Dadson Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
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
              className={`p-2.5 rounded-lg transition-colors duration-200 ${
                shouldUseAboutStyles 
                  ? "text-[#101B21] hover:text-[#00B4E1]" 
                  : "text-white hover:text-white/80"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
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
          className={`md:hidden fixed top-[72px] left-0 right-0 pt-4 pb-6 z-[100] border-t shadow-lg h-[calc(100vh-72px)] overflow-y-auto ${
            shouldUseAboutStyles 
              ? "bg-white border-gray-200" 
              : "bg-[#101B21] backdrop-blur-sm border-white/10"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`block py-3 px-4 rounded-lg transition-colors duration-200 ${
                    shouldUseAboutStyles
                      ? isActive(item.href)
                        ? "bg-[#00B4E1]/10 text-[#00B4E1]"
                        : "text-[#101B21] hover:bg-[#00B4E1]/5"
                      : isActive(item.href)
                        ? "bg-white/10 text-white"
                        : "text-white/90 hover:bg-white/5"
                  }`}
                  onClick={(e) => {
                    handleNavClick(e, item.href, item.sectionId);
                    setMobileMenuOpen(false);
                  }}
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