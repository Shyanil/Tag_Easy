import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-white selection:text-black flex flex-col antialiased">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      
      {/* WhatsApp FAB */}
      <a 
        href="#" 
        className="fixed bottom-8 right-8 z-50 bg-red-600 p-4 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(230,57,70,0.4)] hover:scale-110 hover:rotate-3 transition-all spring-transition group"
      >
        <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 text-white font-label text-sm whitespace-nowrap">
          Message Us
        </span>
      </a>
    </div>
  );
};

export default Layout;
