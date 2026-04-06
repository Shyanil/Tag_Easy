import React from 'react';
import { motion } from 'framer-motion';
import { cn, getCalendlyUrl } from '../lib/utils';
import { Terminal, ArrowUpRight, Shield, Globe, Zap } from 'lucide-react';
import Button from '../components/Button';

const SectionContainer = ({ children, className, id }) => (
  <section id={id} className={cn("bg-black relative overflow-hidden px-4 md:px-6 py-20 md:py-40", className)}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const VideoRenderer = ({ project, index }) => {
  const commonClasses = cn(
    "w-full h-full object-cover transition-all duration-700 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
  );

  return (
    <video autoPlay loop muted playsInline preload="metadata" className={commonClasses}>
      <source src={project.video} type="video/mp4" />
    </video>
  );
};

const GlassCard = ({ children, className }) => (
  <div className={cn("liquid-glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 h-full aura-card border border-white/5 hover:border-red-500/50 hover:bg-black/60 hover:backdrop-blur-2xl transition-all duration-700", className)}>
    {children}
  </div>
);

const CaseStudies = () => {
    const projects = [
        { 
            title: "Metropolitan Scale", 
            cat: "Infrastructure", 
            stats: "400% Growth", 
            icon: Globe,
            video: 'https://cdn.pixabay.com/vimeo/849315077/architecture-171887.mp4?width=1280&hash=6d4e8b0b9b3e1b0b9b3e1b0b9b3e1b0b9b3e1b0b'
        },
        { 
            title: "Bespoke Commerce", 
            cat: "Digital Systems", 
            stats: "98% Efficiency", 
            icon: Zap,
            video: 'https://cdn.pixabay.com/vimeo/912128311/code-174883.mp4?width=1280&hash=6d4e8b0b9b3e1b0b9b3e1b0b9b3e1b0b9b3e1b0b'
        },
        { 
            title: "Legacy Migration", 
            cat: "Engineering", 
            stats: "0 Downtime", 
            icon: Shield,
            video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'
        }
    ];

  return (
    <main className="bg-black pt-20">
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none z-50 mix-blend-overlay" />
      
      <header className="pt-24 md:pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
        >
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-8">Our Portfolio</span>
            <h1 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument leading-[0.8] mb-12">
                Architectural <br />
                <span className="text-white/20">Victories</span>
            </h1>
            <p className="text-white/40 text-2xl max-w-2xl mx-auto font-light leading-relaxed hover:text-white/80 transition-colors duration-500">
                Stories of performance, resilience, and digital dominance delivered for global brands.
            </p>
        </motion.div>
      </header>

      <SectionContainer className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div 
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
            >
              <GlassCard className="group flex flex-col justify-between !p-0 overflow-hidden">
                <div className="aspect-[16/10] relative overflow-hidden pointer-events-none border-b border-white/5">
                  <VideoRenderer project={p} index={i} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="p-10 flex-1 flex flex-col justify-between">
                  <div>
                      <span className="text-red-500 text-[10px] uppercase font-semibold tracking-[0.4em] block mb-6">{p.cat}</span>
                      <h3 className="text-4xl text-white font-instrument mb-8 group-hover:translate-x-2 transition-transform duration-500">{p.title}</h3>
                  </div>
                  <div className="flex justify-between items-center mt-10">
                      <span className="text-white text-3xl font-instrument italic tracking-tighter group-hover:text-red-500 transition-colors uppercase">{p.stats}</span>
                      <Button variant="tertiary" className="!p-0">
                          <ArrowUpRight className="w-6 h-6 text-white/20 group-hover:text-red-500 transition-colors" />
                      </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0 pb-40">
        <div className="liquid-glass rounded-[3rem] md:rounded-[5rem] p-12 md:p-24 text-center relative group overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-1000">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          <h2 className="text-4xl md:text-7xl text-white tracking-tighter font-instrument mb-12">
            Build your <span className="text-white/20">legacy</span>
          </h2>
          <Button 
            variant="primary" 
            className="px-16 py-6 text-xs tracking-[0.2em]"
            onClick={() => window.open(getCalendlyUrl(), '_blank')}
          >
            START EXPLORATION
          </Button>
        </div>
      </SectionContainer>
    </main>
  );
};

export default CaseStudies;
