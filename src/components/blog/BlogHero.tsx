'use client';

import Image from 'next/image';
import Link from 'next/link';
import AnimatedHeading from '@/components/shared/AnimatedHeading';

// Section icon component (same as services)
const SectionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6">
    <rect x="2" y="2" width="8" height="8" rx="1" fill="#00B4E1"/>
    <rect x="14" y="2" width="8" height="8" rx="1" fill="#00B4E1"/>
    <rect x="2" y="14" width="8" height="8" rx="1" fill="#00B4E1"/>
    <rect x="14" y="14" width="8" height="8" rx="1" fill="#00B4E1"/>
  </svg>
);

interface BlogHeroProps {
  totalArticles?: number;
}

export default function BlogHero({ totalArticles = 0 }: BlogHeroProps) {
  return (
    <section id="blog-hero" data-index="1" className="relative w-full bg-zinc-950 py-12 sm:py-16 md:py-24 lg:py-32 overflow-x-hidden">
      <div className="w-full max-w-1440 mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="px-3 sm:px-6 md:px-12 lg:px-16 py-10 sm:py-12 md:py-16 lg:py-20">
          {/* Blog Banner Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Text Content - Takes up full width on small screens, 1 col on md screens */}
            <div className="col-span-1 flex flex-col justify-start items-start h-auto sm:h-[350px] md:h-[500px]">
              <div className="flex flex-col justify-start items-start gap-2 mb-2 pt-2 md:pt-4">
                <div className="flex items-center gap-2">
                  <SectionIcon />
                  <div className="justify-start text-cyan-500 text-base font-medium font-['Satoshi'] leading-loose">Insights & News</div>
                </div>
              </div>
                
              <div className="tracking-wide w-full mb-4">
                <AnimatedHeading 
                  size="h1" 
                  animationType="fade" 
                  className="leading-tight md:leading-none text-[28px] xs:text-[32px] sm:text-[40px] md:text-[50px] lg:text-[65px]"
                >
                  <div className="flex flex-wrap self-stretch justify-start">
                    <span className="text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-medium font-['Clash_Display'] uppercase">Stay informed with logistics </span>
                    <span className="text-gray-400 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-medium font-['Clash_Display'] uppercase">insights and industry trends.</span>
                  </div>
                </AnimatedHeading>
              </div>
              
              <p className="w-full md:w-[685px] justify-start text-gray-500 text-sm sm:text-base md:text-lg font-medium font-['Satoshi'] leading-normal mb-6">
                Expert analysis, industry news, and strategic insights<br className="hidden sm:block" />
                to help you navigate the evolving logistics landscape.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-4 w-full sm:w-auto mt-4 sm:mt-auto">
                <Link 
                  href="#blog-content" 
                  className="w-full sm:w-52 px-5 py-2 sm:py-3 bg-cyan-500/90 hover:bg-cyan-500 rounded-md shadow-[0px_4px_34px_0px_rgba(0,180,225,0.15)] text-white text-sm sm:text-lg font-semibold font-['Clash_Display'] uppercase text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('blog-content')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  EXPLORE ARTICLES
                </Link>
              </div>
            </div>
            
            {/* Image - Takes 1 column on md screens */}
            <div className="col-span-1 h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-xl sm:rounded-2xl mt-4 sm:mt-6 md:mt-0">
              <Image 
                src="/images/about/truck-logistics.jpeg" 
                alt="Logistics Industry Insights" 
                width={765} 
                height={641}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}