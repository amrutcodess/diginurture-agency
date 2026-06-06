import React, { useState } from "react";
import { motion } from "framer-motion";

const NavLinks = () => (
  <ul className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center justify-center">
    <li className="list-none">
      <a href="/#about" className="text-sm font-medium tracking-wide text-neutral-400 hover:text-white transition-colors duration-300">
        About
      </a>
    </li>
    <li className="list-none">
      <a href="/#services" className="text-sm font-medium tracking-wide text-neutral-400 hover:text-white transition-colors duration-300">
        Services
      </a>
    </li>
    <li className="list-none">
      <a href="/#work" className="text-sm font-medium tracking-wide text-neutral-400 hover:text-white transition-colors duration-300">
        Work
      </a>
    </li>
    <li className="list-none">
      <a href="/#how-it-works" className="text-sm font-medium tracking-wide text-neutral-400 hover:text-white transition-colors duration-300">
        Process
      </a>
    </li>
    <li className="list-none">
      <a href="/#contact" className="text-sm font-medium tracking-wide text-neutral-400 hover:text-white transition-colors duration-300">
        Contact
      </a>
    </li>
  </ul>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 inset-x-0 z-50 flex flex-col items-center px-4 w-full">
      <div className="liquid-glass rounded-full px-6 py-3.5 flex items-center justify-between max-w-5xl w-full border border-white/5">
        <a href="/" className="text-xl font-black tracking-tight text-white flex items-center gap-2">
          <span className="bg-gradient-to-r from-aqua to-fuchsia bg-clip-text text-transparent">Diginurture</span>
          <span className="text-xs uppercase px-2 py-0.5 bg-white/10 rounded-full font-sans font-bold text-neutral-300">Agency</span>
        </a>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
        >
          <img
            src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
            className="w-6 h-6 invert"
            alt="toggle menu"
          />
        </button>
        
        <nav className="hidden sm:flex">
          <NavLinks />
        </nav>
      </div>

      {isOpen && (
        <motion.div
          className="absolute top-full mt-4 liquid-glass rounded-3xl block overflow-hidden text-center sm:hidden w-[calc(100%-2rem)] max-w-5xl border border-white/5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="p-6">
            <NavLinks />
          </nav>
        </motion.div>
      )}
    </div>
  );
}
