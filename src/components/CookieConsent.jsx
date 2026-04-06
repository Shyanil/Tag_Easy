import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Button from './Button';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="fixed bottom-10 left-6 right-6 md:left-10 md:right-auto md:max-w-md z-[100]"
                >
                    <div className="liquid-glass p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        
                        <div className="flex items-start gap-6 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center flex-shrink-0 neon-red-glow">
                                <Cookie className="w-6 h-6 text-red-500" />
                            </div>
                            
                            <div className="flex-1">
                                <h4 className="text-white font-instrument text-2xl mb-2 tracking-tighter">Experience Optimization</h4>
                                <p className="text-white/40 text-sm font-light leading-relaxed mb-6">
                                    We use high-performance cookies to architect your journey and ensure the most immersive digital experience possible.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button 
                                        variant="primary" 
                                        className="text-[10px] tracking-[0.2em] py-4 flex-1"
                                        onClick={handleAccept}
                                    >
                                        ACCEPT ALL
                                    </Button>
                                    <button 
                                        className="text-white/20 hover:text-white text-[9px] font-bold uppercase tracking-widest transition-colors px-4"
                                        onClick={() => setIsVisible(false)}
                                    >
                                        REFINE
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => setIsVisible(false)}
                            className="absolute top-6 right-6 text-white/10 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
