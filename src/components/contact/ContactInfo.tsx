import React from 'react';

const ContactInfo = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-2 mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="8" height="8" rx="1" fill="#00B4E1"/>
            <rect x="14" y="2" width="8" height="8" rx="1" fill="#00B4E1"/>
            <rect x="2" y="14" width="8" height="8" rx="1" fill="#00B4E1"/>
            <rect x="14" y="14" width="8" height="8" rx="1" fill="#00B4E1"/>
          </svg>
          <span className="text-[18px] font-satoshi font-medium text-[#00B4E1]">Contact us</span>
        </div>
        <div>
          <div className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[70px] xl:text-[80px] font-clash font-semibold leading-[1.125] uppercase">
            <div className="text-[#101B21]">START MOVING</div>
            <div><span className="text-[#101B21]">FREIGHT </span><span className="text-[#A9A9A9]">WITH</span></div>
            <div><span className="text-[#A9A9A9]">A </span><span className="text-[#A9A9A9]">PARTNER YOU CAN</span></div>
            <div className="text-[#A9A9A9]"> COUNT ON</div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex flex-col md:flex-row md:gap-[32px] md:items-center">
          <div className="space-y-2 mb-4 md:mb-0 flex-1">
            <h4 className="text-[18px] font-satoshi font-medium text-[#B3B0BE]">Email us at</h4>
            <div className="flex items-center">
              <a 
                href="mailto:support@dadson.us" 
                className="text-[18px] font-satoshi font-medium text-[#101B21] hover:text-[#00B4E1] transition-colors flex items-center"
              >
                support@dadson.us
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM5.64461 7.06675C5.64461 7.48403 5.98288 7.82231 6.40016 7.82231H15.2428L5.8659 17.1992C5.57084 17.4942 5.57084 17.9726 5.8659 18.2677C6.16096 18.5627 6.63936 18.5627 6.93442 18.2677L16.3113 8.89082V17.7334C16.3113 18.1507 16.6495 18.489 17.0668 18.489C17.4841 18.489 17.8224 18.1507 17.8224 17.7334V7.06675V6.3112H17.0668H6.40016C5.98288 6.3112 5.64461 6.64947 5.64461 7.06675Z" fill="#00B4E1"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="w-px h-16 hidden md:block bg-[#E3E3E3]" />

          <div className="space-y-2 flex-1">
            <h4 className="text-[18px] font-satoshi font-medium text-[#B3B0BE]">Call us at</h4>
            <div className="flex items-center">
              <a 
                href="tel:+14244257425" 
                className="text-[18px] font-satoshi font-medium text-[#101B21] hover:text-[#00B4E1] transition-colors flex items-center"
              >
                (424) 425-7425
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM5.64461 7.06675C5.64461 7.48403 5.98288 7.82231 6.40016 7.82231H15.2428L5.8659 17.1992C5.57084 17.4942 5.57084 17.9726 5.8659 18.2677C6.16096 18.5627 6.63936 18.5627 6.93442 18.2677L16.3113 8.89082V17.7334C16.3113 18.1507 16.6495 18.489 17.0668 18.489C17.4841 18.489 17.8224 18.1507 17.8224 17.7334V7.06675V6.3112H17.0668H6.40016C5.98288 6.3112 5.64461 6.64947 5.64461 7.06675Z" fill="#00B4E1"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-[#E3E3E3] my-5" />

        <div className="space-y-2">
          <h4 className="text-[18px] font-satoshi font-medium text-[#B3B0BE]">Address</h4>
          <div>
            <p className="text-[18px] font-satoshi font-medium text-[#101B21] leading-[1.33]">
              Dadson Logistics <br />
              3233 Lance Drive, Suite B <br />
              Stockton, CA 95205
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo; 