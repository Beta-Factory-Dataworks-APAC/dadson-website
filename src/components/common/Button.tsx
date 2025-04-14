import React from 'react';
import Link from 'next/link';

/**
 * Button - A reusable button component
 * 
 * @param {Object} props
 * @param {string} props.variant - Button style variant ('primary', 'secondary', 'outline', etc.)
 * @param {string} props.size - Button size ('sm', 'md', 'lg')
 * @param {string} props.href - If provided, renders as a Link component
 * @param {function} props.onClick - Click handler
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {React.ReactNode} props.children - Button content
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  fullWidth = false,
  children,
  ...props
}: {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  // Base button styles
  const baseStyles = 'font-medium rounded-md transition-colors duration-300 inline-flex items-center justify-center';
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-[#00B2E3] hover:bg-[#009ac4] text-white',
    secondary: 'bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm',
    outline: 'border border-[#00B2E3] text-[#00B2E3] hover:bg-[#00B2E3]/10',
    ghost: 'text-[#00B2E3] hover:bg-[#00B2E3]/10',
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };
  
  // Combine styles
  const buttonStyles = `
    ${baseStyles}
    ${variantStyles[variant] || variantStyles.primary}
    ${sizeStyles[size] || sizeStyles.md}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;
  
  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={buttonStyles} {...props}>
        {children}
      </Link>
    );
  }
  
  // Otherwise render as button
  return (
    <button className={buttonStyles} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button; 