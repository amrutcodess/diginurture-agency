import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Award } from "lucide-react";

const stats = [
  {
    icon: <Users className="w-8 h-8 text-aqua" />,
    value: "15+",
    label: "Happy Clients",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-mint" />,
    value: "35+",
    label: "Projects Shipped",
  },
  {
    icon: <Award className="w-8 h-8 text-fuchsia" />,
    value: "3+",
    label: "Years Experience",
  },
];

export default function WhyUs() {
  return (
    <section className="c-space my-20" id="why-us">
      {/* Title */}
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <h2 className="text-heading text-white">Why Companies Choose Diginurture</h2>
        <p className="subtext max-w-2xl">
          We combine a passion for robust engineering, unmatched development speeds, and high-performance solutions to empower startups and enterprises globally.
        </p>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl hover:border-white/15 hover:bg-white/10 transition-all duration-300"
          >
            <div className="p-4 bg-white/5 rounded-full mb-4">{stat.icon}</div>
            <h3 className="text-4xl font-black text-white mb-2">{stat.value}</h3>
            <p className="text-neutral-400 font-semibold tracking-wide text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
