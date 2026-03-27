import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      title: 'Website Development',
      desc: 'Custom, scalable, and high-performance websites',
      icon: 'language',
      tags: ['Next.js & React', 'Headless E-commerce']
    },
    {
      title: 'SEO',
      desc: 'Organic growth with technical and content-driven SEO',
      icon: 'rocket_launch',
      tags: ['Technical Audits', 'Content Strategy']
    },
    {
      title: 'PPC Advertising',
      desc: 'Performance marketing with measurable ROI',
      icon: 'ads_click',
      tags: ['Google Ads', 'Meta Ads']
    },
    {
      title: 'Mobile App Development',
      desc: 'Scalable Android and iOS applications',
      icon: 'app_settings_alt',
      tags: ['iOS & Android', 'UX/UI Innovation']
    },
    {
      title: 'AI & Machine Learning',
      desc: 'Intelligent systems built for automation and insights',
      icon: 'psychology',
      tags: ['Automation', 'Data Insights']
    },
    {
      title: 'Custom AI Training',
      desc: 'Tailored AI models based on business use-cases',
      icon: 'model_training',
      tags: ['Model Fine-tuning', 'Niche AI']
    }
  ];

  return (
    <main className="pb-32 px-6 pt-24">
      <header className="mb-24 mt-12 text-center md:text-left max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="inline-block mb-6 border-b-2 border-primary pb-1"
        >
          <span className="font-label text-xs uppercase tracking-[0.4em] text-primary font-black">Our Expertise</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-8 font-headline text-white"
        >
          Building Scalable <span className="text-primary-container italic">Digital</span><br />Systems.
        </motion.h1>
      </header>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-40">
        {services.map((service, i) => (
          <motion.div 
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-10 rounded-3xl bg-zinc-950 border border-white/5 hover:border-primary/20 transition-all group"
          >
            <span className="material-symbols-outlined text-primary text-4xl mb-6 block">{service.icon}</span>
            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
            <p className="text-zinc-500 font-medium mb-8 leading-relaxed">{service.desc}</p>
            <div className="flex gap-4">
                {service.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-zinc-600 bg-zinc-900 px-3 py-1 rounded-full border border-white/5">{tag}</span>
                ))}
            </div>
          </motion.div>
        ))}
      </section>

      <section className="py-24 bg-surface rounded-[3rem] mx-6 border border-white/5 text-center px-8 relative overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-black font-display italic text-white mb-8">Ready to architect your scale?</h2>
            <button className="bg-primary text-background px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
                Construct your plan
            </button>
      </section>
    </main>
  );
};

export default Services;
