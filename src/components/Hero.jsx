import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Secure", "User-Focused", "Scalable", "High-Performance"];

const logos = [
  { src: "/assets/logos/react.svg", title: "React" },
  { src: "/assets/logos/nextjs.svg", title: "Next.js" },
  { src: "/assets/logos/typescript.svg", title: "TypeScript" },
  { src: "/assets/logos/nodejs.svg", title: "Node.js" },
  { src: "/assets/logos/tailwindcss.svg", title: "Tailwind CSS" },
  { src: "/assets/logos/mongodb.svg", title: "MongoDB" },
  { src: "/assets/logos/git.svg", title: "Git" },
  { src: "/assets/logos/Flutter.svg", title: "Flutter" },
  { src: "/assets/logos/firebase.svg", title: "Firebase" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const elementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen pt-32 pb-20 c-space"
    >
      <div className="flex flex-col items-center justify-center w-full relative z-10 text-center">
        {/* Background Overlay Title */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full overflow-hidden whitespace-nowrap opacity-[0.02] select-none pointer-events-none z-0 flex justify-center">
          <h1 className="text-[10rem] md:text-[15rem] font-black leading-none text-white tracking-tighter shrink-0 flex gap-8">
            <span>DIGINURTURE</span>
            <span>DIGINURTURE</span>
          </h1>
        </div>

        {/* Floating Tag */}
        <motion.div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass mb-8 border border-white/10"
          variants={elementVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <span className="w-2 h-2 rounded-full bg-mint shadow-[0_0_8px_rgba(0,245,212,0.8)]" />
          <span className="text-xs font-semibold tracking-widest text-neutral-300 uppercase">
            Software Dev & Growth Agency
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tight mb-6 leading-[1.1] max-w-5xl text-white"
          variants={elementVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
        >
          Your Partner for <br />
          <span
            className="font-serif italic font-normal text-neutral-200"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            the Digital Age.
          </span>
        </motion.h1>

        {/* Looping Word Carousel */}
        <motion.div
          variants={elementVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.9 }}
          className="h-16 flex items-center justify-center mb-6 overflow-hidden"
        >
          <span className="text-2xl md:text-3xl text-neutral-300 mr-3">
            You bring the idea, we build the product that’s
          </span>
          <div className="relative w-44 md:w-56 h-12 flex items-center text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="absolute text-2xl md:text-3xl font-black text-mint tracking-tight"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="text-lg md:text-xl font-medium text-neutral-400 max-w-2xl mb-8 leading-relaxed"
          variants={elementVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.1 }}
        >
          From concept design to fullstack engineering. We nurture software products that power modern startups and businesses.
        </motion.p>

        {/* Trust Badges */}
        <motion.div
          className="flex items-center gap-3 px-5 py-2.5 rounded-full liquid-glass mb-10 border border-white/5 shadow-lg"
          variants={elementVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
          <span className="text-sm font-medium text-neutral-300">
            Trusted by founders in 🇮🇳 🇦🇺 🇫🇷 🇳🇵 🇸🇬
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          variants={elementVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.3 }}
        >
          <a
            href="/#contact"
            className="px-8 py-3.5 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition duration-300 flex items-center gap-2 shadow-lg hover:scale-105"
          >
            Start a Project <span className="text-xl leading-none">→</span>
          </a>
          <a
            href="#work"
            className="rounded-full px-7 py-3.5 liquid-glass text-white font-medium hover:bg-white/5 border border-white/5 transition flex items-center gap-2 group hover:scale-105"
          >
            <span className="text-xs text-mint group-hover:scale-110 transition-transform">▶</span> View Our Work
          </a>
        </motion.div>

        {/* Logo Marquee Wrapper */}
        <motion.div
          className="w-full max-w-4xl overflow-hidden mt-6"
          variants={elementVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5 }}
        >
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="relative w-full flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <div className="flex gap-16 py-4 items-center animate-marquee whitespace-nowrap shrink-0">
              {logos.map((logo, idx) => (
                <div
                  key={idx}
                  className="shrink-0 flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                  title={logo.title}
                >
                  <img src={logo.src} alt={logo.title} className="h-8 w-auto object-contain" />
                  <span className="text-white font-semibold text-sm tracking-wide">{logo.title}</span>
                </div>
              ))}
            </div>
            {/* Duplicated list for seamless infinite loop */}
            <div className="flex gap-16 py-4 items-center animate-marquee whitespace-nowrap shrink-0" aria-hidden="true">
              {logos.map((logo, idx) => (
                <div
                  key={`dup-${idx}`}
                  className="shrink-0 flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                  title={logo.title}
                >
                  <img src={logo.src} alt={logo.title} className="h-8 w-auto object-contain" />
                  <span className="text-white font-semibold text-sm tracking-wide">{logo.title}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
