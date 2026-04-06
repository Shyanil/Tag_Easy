import React from 'react';
import { NavLink } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 w-full pointer-events-none">
      <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-lg">Tag Easy</span>
          </NavLink>
          <div className="hidden md:flex items-center gap-6 ml-8">
            {[
              { name: 'Services', href: '/services' },
              { name: 'Case Studies', href: '/case-studies' },
              { name: 'About', href: '/about' },
              { name: 'Heritage', href: '/heritage' },
              { name: 'Contact', href: '/contact' }
            ].map((item) => (
              <NavLink 
                key={item.name} 
                to={item.href} 
                className={({ isActive }) => cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-white text-sm font-medium hover:text-white/80 transition-colors">Get a call</button>
          <a 
            href="https://adamsalve.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Try Adamsalve
          </a>
        </div>
      </div>
    </nav>
  );
}
