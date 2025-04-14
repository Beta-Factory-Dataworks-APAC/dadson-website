import React from 'react';

const Logo = () => {
  return (
    <div className="relative h-8 w-8">
      <div className="absolute inset-0 bg-primary-blue rounded-md"></div>
      <div className="absolute inset-[3px] bg-primary-blue flex justify-center items-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M3 3H7V7H3V3Z"
            fill="currentColor"
          />
          <path
            d="M10 3H14V7H10V3Z"
            fill="currentColor"
          />
          <path
            d="M21 3H17V7H21V3Z"
            fill="currentColor"
          />
          <path
            d="M3 10H7V14H3V10Z"
            fill="currentColor"
          />
          <path
            d="M17 10H21V14H17V10Z"
            fill="currentColor"
          />
          <path
            d="M3 17H7V21H3V17Z"
            fill="currentColor"
          />
          <path
            d="M10 17H14V21H10V17Z"
            fill="currentColor"
          />
          <path
            d="M17 17H21V21H17V17Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default Logo; 