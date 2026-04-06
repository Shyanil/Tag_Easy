import React from 'react';
import { cn } from '../lib/utils';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  href, 
  onClick,
  ...props 
}) => {
  const baseStyles = "px-7 py-3 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-[#051A24] text-white hover:bg-[#0D212C] shadow-[0_4px_14px_0_rgba(5,26,36,0.39)] hover:shadow-[0_6px_20px_rgba(5,26,36,0.23)]",
    secondary: "bg-white text-[#051A24] border border-[#051A24]/10 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:bg-zinc-50",
    tertiary: "bg-white text-[#051A24] shadow-[inset_0_0_0_1px_rgba(5,26,36,0.1)] hover:bg-zinc-50"
  };

  const Component = href ? 'a' : 'button';
  const commonProps = {
    className: cn(baseStyles, variants[variant], className),
    onClick,
    ...props
  };

  if (href) {
    return <a href={href} {...commonProps}>{children}</a>;
  }

  return <button {...commonProps}>{children}</button>;
};

export default Button;
