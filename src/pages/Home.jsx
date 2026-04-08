import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Globe, Instagram, Twitter, ArrowUpRight, 
  Phone, Server, Cpu, Zap, BarChart3, Clock, Linkedin,
  ShieldCheck, LayoutDashboard, Monitor, Brain
} from 'lucide-react';
import { cn, getCalendlyUrl } from '../lib/utils';
import TeamSection from '../components/TeamSection';
import Button from '../components/Button';

// --- Sub-components ---

const SectionContainer = ({ children, className, id }) => (
  <section id={id} className={cn("bg-black relative overflow-hidden px-4 md:px-6 py-16 md:py-24", className)}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const GlassCard = ({ children, className }) => (
  <div className={cn("liquid-glass rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 h-full aura-card", className)}>
    {children}
  </div>
);

// --- Brand Marquee ---

const BrandMarquee = () => {
  const items = [
    "ADAMSALVE", "AI AUTOMATION", "TECHNICAL SEO", 
    "SCALABLE SYSTEMS", "PERFORMANCE ENGINEERING", "ADAMSALVE", 
    "AI AUTOMATION", "TECHNICAL SEO", "SCALABLE SYSTEMS"
  ];
  
  return (
    <div className="bg-black py-16 border-y border-white/5 overflow-hidden">
      <div className="brand-marquee">
        <div className="brand-marquee-content">
          {items.map((item, i) => (
            <span key={i} className="text-white/5 text-5xl md:text-[8rem] font-instrument italic tracking-tighter whitespace-nowrap hover:text-red-500/20 transition-colors duration-700">
              {item}
            </span>
          ))}
        </div>
        <div className="brand-marquee-content" aria-hidden="true">
          {items.map((item, i) => (
            <span key={i} className="text-white/5 text-5xl md:text-[8rem] font-instrument italic tracking-tighter whitespace-nowrap hover:text-red-500/20 transition-colors duration-700">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Hero ---

const Hero = () => {
  const videoRef = useRef(null);
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const fadeDuration = 500;

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const url = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
      
      const response = await fetch(url + '?email=' + encodeURIComponent(email), {
        method: 'POST',
        mode: 'no-cors',
      });

      setSubmitStatus('success');
      setEmail('');
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error("Error submitting email:", error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };


  const animateOpacity = (start, end, duration, callback) => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentOpacity = start + (end - start) * progress;
      setVideoOpacity(currentOpacity);
      if (progress < 1) requestAnimationFrame(animate);
      else if (callback) callback();
    };
    requestAnimationFrame(animate);
  };

  const handleCanPlay = () => {
    videoRef.current?.play();
    animateOpacity(0, 1, fadeDuration);
    
    setTimeout(() => {
      setShowContent(true);
    }, 10000);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const remainingTime = videoRef.current.duration - videoRef.current.currentTime;
    if (remainingTime <= 0.55 && videoOpacity === 1) {
      animateOpacity(1, 0, fadeDuration);
    }
  };

  const handleEnded = () => {
    if (!videoRef.current) return;
    setVideoOpacity(0);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        animateOpacity(0, 1, fadeDuration);
      }
    }, 100);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col bg-black">
      <video
        ref={videoRef}
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        muted autoPlay playsInline preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
        style={{ opacity: videoOpacity, filter: 'brightness(0.85)' }}
      >
        <source src="/Hero Section Tag easy-ezremove.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90 z-[1] pointer-events-none" />

      <div className={cn(
        "relative z-10 flex-1 flex flex-col items-center justify-center px-4 md:px-6 pt-32 md:pt-44 pb-20 text-center transition-all duration-1000",
        showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={showContent ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <span className="text-red-500 text-[10px] uppercase font-semibold tracking-[0.4em] mb-8 block drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            Creative Engineering Lab
          </span>
          <h1 className="text-4xl md:text-7xl lg:text-[7.5rem] text-white tracking-tighter font-instrument mb-12 drop-shadow-2xl leading-[0.85] whitespace-nowrap">
            Know it then all
          </h1>
          <p className="text-white/40 text-xl md:text-2xl font-light max-w-2xl mx-auto mb-16 leading-relaxed hover:text-white/80 transition-colors duration-500">
            We architect high-performance digital ecosystems, Ads Hub dominance, and modular AI integrations for the next wave of global brands.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-md w-full mb-12"
        >
          <div className="relative group/form">
            <form onSubmit={handleSubmit} className={cn(
              "liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3 transition-all duration-500",
              submitStatus === 'error' ? "border-red-500/50 neon-red-glow" : "group-hover/form:neon-red-glow focus-within:neon-red-glow"
            )}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={submitStatus === 'success' ? "Welcome to the network!" : "Join our network"}
                disabled={isSubmitting || submitStatus === 'success'}
                className="bg-transparent flex-1 text-white placeholder:text-white/30 outline-none text-[11px] font-medium uppercase tracking-widest disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className={cn(
                  "rounded-full p-4 transition-all shadow-xl active:scale-95 disabled:opacity-50",
                  submitStatus === 'success' ? "bg-green-500 text-white" : "bg-white text-black hover:scale-105 group-hover/form:neon-white-glow"
                )}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            <AnimatePresence>
              {submitStatus === 'error' && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-6 left-0 right-0 text-red-500 text-[10px] uppercase font-bold tracking-widest text-center"
                >
                  Invalid email or connection error
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Button variant="secondary" onClick={() => window.open(getCalendlyUrl(), '_blank')} className="px-10">
            <Phone className="w-4 h-4" />
            Get a call
          </Button>
          <Button variant="primary" href="https://adamsalve.com" target="_blank" className="px-10">
            Try Adamsalve
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 flex justify-center gap-8 pb-16"
      >
        <a href="https://www.linkedin.com/company/tag-easy/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-red-500 hover:scale-125 transition-all duration-300">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="https://www.instagram.com/lokesh_choudhury_92/" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-red-500 hover:scale-125 transition-all duration-300">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="/" className="text-white/20 hover:text-red-500 hover:scale-125 transition-all duration-300">
          <Globe className="w-5 h-5" />
        </a>
      </motion.div>
    </section>
  );
};

// --- Adamsalve Discovery Mockup ---

const AdamsalveMockup = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionContainer className="bg-black pt-24 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">Flagship Ecosystem</span>
            <h2 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument mb-12 leading-[0.85]">
              The Intelligence <br /><span className="text-white/30">Core</span>
            </h2>
            <p className="text-white/40 text-xl leading-relaxed mb-12 font-light hover:text-white/80 transition-colors duration-500">
              Adamsalve isn't just an assistant; it's a mobile app that reminds us easily with an intelligent reminder system.
            </p>
            <Button variant="secondary" href="https://adamsalve.com" className="px-12 py-5 text-xs tracking-widest">
              LAUNCH DISCOVERY
              <LayoutDashboard className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 flex justify-center"
        >
          <div className="liquid-glass rounded-[3rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.9)] border-[8px] border-white/5 aspect-[9/19] w-full max-w-[340px] flex flex-col group hover:border-red-500/20 transition-all duration-700 relative">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-center border border-white/5">
              <div className="w-1 h-1 rounded-full bg-blue-500/40 ml-auto mr-3" />
            </div>

            {/* Status Bar */}
            <div className="px-8 pt-6 pb-2 flex justify-between items-center text-[10px] text-white/40 font-bold z-10">
              <span>9:41</span>
              <div className="flex gap-1.5 items-center">
                <div className="flex gap-0.5">
                  {[1,2,3,4].map(i => <div key={i} className={cn("w-[2.5px] h-[7px] rounded-full", i < 4 ? "bg-white" : "bg-white/20")} />)}
                </div>
                <Zap className="w-2.5 h-2.5 text-white" />
                <div className="w-5 h-2.5 border border-white/20 rounded-[2px] p-[1px]">
                  <div className="w-full h-full bg-white rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="flex-1 px-6 pt-10 space-y-8 overflow-hidden bg-black/40">
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.2em] text-red-500 font-bold">Today's Protocol</div>
                <h3 className="text-3xl text-white font-instrument italic">Active Reminders</h3>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Client Strategy Sync", time: "10:30 AM", tag: "Ads Hub" },
                  { title: "Modular AI Deployment", time: "02:15 PM", tag: "Automation" },
                  { title: "Brand Identity Review", time: "05:00 PM", tag: "Web Site" }
                ].map((item, i) => (
                  <div key={i} className="liquid-glass p-5 rounded-2xl border border-white/5 aura-card group/item hover:border-red-500/30 transition-all duration-500">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">{item.tag}</span>
                      <span className="text-[9px] text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded-full">{item.time}</span>
                    </div>
                    <div className="text-sm text-white font-medium group-hover/item:text-red-500 transition-colors">{item.title}</div>
                  </div>
                ))}
              </div>

              {/* Quick Add Section */}
              <div className="absolute bottom-10 left-6 right-6">
                <div className="liquid-glass rounded-2xl p-4 flex items-center justify-between border border-white/10 group-hover:neon-red-glow transition-all duration-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">Quick Add Link</span>
                  </div>
                  <div className="w-10 h-1 h-full flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border border-white/20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="px-10 py-8 flex justify-between items-center border-t border-white/5 bg-black/60 backdrop-blur-xl">
              {[LayoutDashboard, Clock, Zap, ShieldCheck].map((Icon, i) => (
                <Icon key={i} className={cn("w-5 h-5 transition-all duration-500", i === 0 ? "text-red-500 scale-110" : "text-white/20 hover:text-white")} />
              ))}
            </div>
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

// --- Progressive Stats Bento ---

const StatsBento = () => {
  const stats = [
    { label: "Efficiency Boost", val: "85%", desc: "Automated business workflows.", size: "lg", icon: Zap },
    { label: "Cost Reduction", val: "40%", desc: "Lowered operational overhead.", size: "sm", icon: ShieldCheck },
    { label: "Daily Active Users", val: "45k", desc: "Scaling across global platforms.", size: "sm", icon: Globe },
    { label: "Engineering Heritage", val: "10Y+", desc: "A decade of performance focus.", size: "md", icon: Clock },
  ];

  return (
    <SectionContainer className="pt-0 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className={cn(
              "group relative",
              s.size === "lg" ? "md:col-span-2 md:row-span-2" : "",
              s.size === "md" ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1"
            )}
          >
            <GlassCard className="flex flex-col justify-between overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-700">
              <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-100 transition-all duration-700 hover:scale-125">
                <s.icon className="w-16 h-16 text-red-500/10" />
              </div>
              <div>
                <span className="text-red-500 text-[10px] uppercase font-semibold tracking-[0.4em] block mb-6">{s.label}</span>
                <p className={cn("text-white tracking-tighter font-instrument mb-6 leading-none", s.size === "lg" ? "text-6xl md:text-8xl" : "text-3xl md:text-6xl")}>
                  {s.val}
                </p>
              </div>
              <p className="text-white/40 text-lg leading-relaxed max-w-[240px] font-light group-hover:text-white/80 transition-colors duration-500">
                {s.desc}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

// --- About ---

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="bg-black pt-24 md:pt-32 pb-16 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.05)_0%,_transparent_70%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-10"
        >
          Our Philosophy
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-7xl lg:text-8xl text-white leading-[0.8] tracking-tighter font-instrument mb-24"
        >
          <span className="text-white/20">Pioneering</span> ideas <br />
          <span className="text-white/20">for</span> minds <br />
          <span className="text-white/20">that lead</span>
        </motion.h2>

        <div className="max-w-2xl">
          <p className="text-white/40 text-2xl leading-relaxed font-light hover:text-white/80 transition-colors duration-500">
            Tag Easy is the architectural foundation for the brands of tomorrow. We specialize in building scalable digital systems where performance and growth are baked into the core.
          </p>
        </div>
      </div>
    </section>
  );
};

// --- Bento Services ---

const BentoServices = () => {
  const services = [
    { tag: "Performance", title: "Ads Hub", icon: Zap, desc: "Intelligent advertising engines built for scaling brand awareness and conversion dominance.", video: "https://www.pexels.com/download/video/8072444/", videoType: "direct" },
    { tag: "Ecosystems", title: "Web Site Development", icon: Monitor, desc: "Intelligent digital ecosystems built to architect scale and engineered for high-performance dominance.", video: "https://www.pexels.com/download/video/2887463/", videoType: "direct" },
    { tag: "Intelligence", title: "AI Automation", icon: Brain, desc: "Intelligent systems built to automate logic and scale business intelligence.", video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4", videoType: "direct" }
  ];

  const VideoRenderer = ({ service, index }) => {
    const isFeatured = index === 0;
    const commonClasses = cn(
      "w-full h-full object-cover transition-all duration-700",
      isFeatured ? "opacity-90 scale-100 group-hover:scale-105" : "grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
    );

    if (service.videoType === 'youtube') {
      const videoId = service.video.split('/').pop().split('?')[0];
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0`}
          className={cn(commonClasses, "scale-[1.5] pointer-events-none")}
          allow="autoplay; encrypted-media"
          title={service.title}
        />
      );
    }
    if (service.videoType === 'vimeo') {
      const videoId = service.video.split('/').pop();
      return (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&background=1&loop=1`}
          className={cn(commonClasses, "scale-[1.5] pointer-events-none")}
          allow="autoplay; fullscreen"
          title={service.title}
        />
      );
    }
    return (
      <video autoPlay loop muted playsInline preload="metadata" className={commonClasses}>
        <source src={service.video} type="video/mp4" />
      </video>
    );
  };

  return (
    <SectionContainer id="services" className="pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
        <h2 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument leading-none">
          Technical <span className="text-white/20">Prowess</span>
        </h2>
        <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase">The Tag Easy Stack</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <GlassCard className="group overflow-hidden !p-0 border border-white/5 hover:border-red-500/30">
              <div className="aspect-[16/10] relative overflow-hidden pointer-events-none">
                <VideoRenderer service={s} index={i} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
              </div>
              <div className="p-10">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-red-500 text-[10px] uppercase font-semibold tracking-[0.4em]">{s.tag}</span>
                  <s.icon className="w-6 h-6 text-white/10 group-hover:text-red-500 transition-all duration-500" />
                </div>
                <h3 className="text-4xl text-white font-instrument mb-6 tracking-tighter group-hover:text-red-500 transition-colors">{s.title}</h3>
                <p className="text-white/40 text-lg leading-relaxed font-light group-hover:text-white/80 transition-colors duration-500">{s.desc}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

// --- Final Interactive CTA ---

const InteractiveCTA = () => {
  return (
    <SectionContainer className="pb-24">
      <div className="liquid-glass rounded-[3rem] md:rounded-[5rem] p-12 md:p-32 text-center relative group overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-1000">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl text-white tracking-tighter font-instrument mb-16 leading-[0.8]"
          >
            Next wave <br /><span className="text-white/20">engineered</span>
          </motion.h2>
          <p className="text-white/40 text-2xl mb-16 max-w-2xl mx-auto leading-relaxed font-light hover:text-white/80 transition-colors duration-500">
            Whether you need a scalable digital ecosystem or our flagship Adamsalve assistant, we are ready to build your future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Button 
              variant="primary" 
              className="px-12 py-5 text-xs transition-all duration-700"
              onClick={() => window.open(getCalendlyUrl(), '_blank')}
            >
              START EXPLORATION
            </Button>
            <Button variant="secondary" href="https://adamsalve.com" className="px-16 py-6 text-xs tracking-[0.2em]">
              TRY ADAMSALVE
            </Button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

// --- Main Home Page ---

const Home = () => {
  return (
    <main className="bg-black relative">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none z-50 mix-blend-overlay" />
      <Hero />
      <BrandMarquee />
      <AboutSection />
      <AdamsalveMockup />
      <StatsBento />
      <BentoServices />
      <TeamSection />
      <InteractiveCTA />
    </main>
  );
};

export default Home;
