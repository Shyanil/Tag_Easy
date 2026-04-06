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
  const baseStyles = "px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-500 whitespace-nowrap inline-flex items-center justify-center gap-2 group active:scale-95";
  
  const variants = {
    primary: "bg-white text-black hover:bg-white/90 hover:scale-[1.03] hover:neon-white-glow shadow-xl",
    secondary: "liquid-glass text-white border border-white/10 hover:border-red-500/50 hover:neon-red-glow hover:scale-[1.03]",
    tertiary: "text-white/60 hover:text-white transition-opacity font-semibold"
  };

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
