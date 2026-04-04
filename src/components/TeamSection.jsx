import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { teamMembers } from '../lib/teamData';

const TeamSection = () => {
  return (
    <section className="py-32 px-8 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
          >
            Meet the Founders & Team
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zinc-500 max-w-xl mx-auto font-medium text-lg leading-relaxed"
          >
            The people behind our technology, strategy, and execution.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div 
              key={member.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ 
                y: -10,
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <Link to={`/team/${member.slug}`} className="block h-full">
                <div className="bg-zinc-900 border border-white/5 rounded-[2rem] overflow-hidden p-3 h-full group-hover:border-primary/20 group-hover:shadow-[0_20px_40px_rgba(255,83,91,0.1)] transition-all flex flex-col">
                  <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6 relative">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="px-4 pb-4 mt-auto">
                    <h3 className="text-xl font-black text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                      {member.role}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
