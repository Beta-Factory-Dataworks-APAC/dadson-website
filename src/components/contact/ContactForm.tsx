"use client";

import React, { useState } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    message: ''
  });
  
  const [messageCount, setMessageCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const MAX_MESSAGE_LENGTH = 120;
  
  const countryCodes = [
    { code: '+1', label: 'US/CA (+1)' },
    { code: '+44', label: 'UK (+44)' },
    { code: '+61', label: 'AU (+61)' },
    { code: '+91', label: 'IN (+91)' },
    { code: '+86', label: 'CN (+86)' },
    { code: '+52', label: 'MX (+52)' },
  ];
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'message') {
      setMessageCount(value.length);
    }
  };
  
  const selectCountryCode = (code: string) => {
    setFormData(prev => ({
      ...prev,
      countryCode: code
    }));
    setDropdownOpen(false);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here we would use SendGrid to send the form data
      console.log('Form submitted:', formData);
      
      // Display success message (in a real app, would use a proper toast/notification)
      alert('Thank you for contacting us! We will get back to you soon.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+1',
        message: ''
      });
      setMessageCount(0);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-[20px] border border-[#E3E3E3] shadow-sm p-6 md:p-8">
      <div className="space-y-4 md:space-y-10">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-clash font-medium text-black uppercase leading-[1.19]">GET IN TOUCH</h2>
          <p className="text-[18px] leading-[1.33] text-[#707C83] font-satoshi font-medium">
            Drop us your query and we will get back to you.
          </p>
        </div>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-full px-[32px] py-[16px] border border-[#E3E3E3] rounded-[6px] text-[18px] font-satoshi font-medium text-[#101B21] leading-[1.33] placeholder:text-[#8B8991] focus:outline-none focus:ring-1 focus:ring-[#00B4E1] focus:border-[#00B4E1]"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="w-full px-[32px] py-[16px] border border-[#E3E3E3] rounded-[6px] text-[18px] font-satoshi font-medium text-[#101B21] leading-[1.33] placeholder:text-[#8B8991] focus:outline-none focus:ring-1 focus:ring-[#00B4E1] focus:border-[#00B4E1]"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-[32px]">
              <EnvelopeIcon className="h-5 w-5 text-[#8B8991]" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full pl-[66px] pr-[32px] py-[16px] border border-[#E3E3E3] rounded-[6px] text-[18px] font-satoshi font-medium text-[#101B21] leading-[1.33] placeholder:text-[#8B8991] focus:outline-none focus:ring-1 focus:ring-[#00B4E1] focus:border-[#00B4E1]"
            />
          </div>
          
          <div className="flex relative">
            <div 
              className="w-[107px] border border-[#E3E3E3] rounded-l-[6px] flex items-center justify-center text-[18px] bg-white cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-[#101B21] font-satoshi font-medium">{formData.countryCode}</span>
              <svg className="ml-1" width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 4L9 1" stroke="#8B8991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="flex-1 px-[32px] py-[16px] border border-[#E3E3E3] border-l-0 rounded-r-[6px] text-[18px] font-satoshi font-medium text-[#101B21] leading-[1.33] placeholder:text-[#8B8991] focus:outline-none focus:ring-1 focus:ring-[#00B4E1] focus:border-[#00B4E1]"
            />
            
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-[180px] max-h-[200px] overflow-y-auto bg-white border border-[#E3E3E3] rounded-[6px] shadow-lg z-10">
                {countryCodes.map((country) => (
                  <div 
                    key={country.code} 
                    className="px-4 py-2 hover:bg-[#F5F5F5] cursor-pointer text-[16px] font-satoshi"
                    onClick={() => selectCountryCode(country.code)}
                  >
                    {country.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help?"
              rows={5}
              maxLength={MAX_MESSAGE_LENGTH}
              required
              className="w-full px-[32px] py-[32px] border border-[#E3E3E3] rounded-[6px] text-[18px] font-satoshi font-medium text-[#101B21] leading-[1.33] placeholder:text-[#8B8991] focus:outline-none focus:ring-1 focus:ring-[#00B4E1] focus:border-[#00B4E1] resize-none"
            ></textarea>
            <div className="absolute bottom-3 right-4">
              <span className="text-[14px] text-[#A9A9A9] font-satoshi">
                {messageCount}/{MAX_MESSAGE_LENGTH}
              </span>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-[rgba(0,180,225,0.9)] text-white font-satoshi font-semibold text-[18px] leading-[1.78] py-[12px] rounded-[6px] transition-colors hover:opacity-90 shadow-[0px_4px_34px_0px_rgba(0,180,225,0.15)]"
          >
            Submit
          </button>
        </form>
      </div>
      
      <div className="text-center mt-8 text-[16px] text-[#707C83] font-satoshi font-normal leading-[1.35]">
        By contacting us you agree to our <a href="#" className="text-[#101B21] underline hover:text-[#00B4E1] transition-colors">Terms of service</a> and <a href="#" className="text-[#101B21] underline hover:text-[#00B4E1] transition-colors">Privacy policy</a>
      </div>
    </div>
  );
};

export default ContactForm; 