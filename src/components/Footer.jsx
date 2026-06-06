import React from "react";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/diginurture", icon: "/assets/socials/github.svg" },
  { name: "Linkedin", href: "https://linkedin.com/company/diginurture", icon: "/assets/socials/linkedIn.svg" },
  { name: "Instagram", href: "https://instagram.com/diginurture", icon: "/assets/socials/instagram.svg" },
  { name: "Discord", href: "https://discord.gg/diginurture", icon: "/assets/socials/Discord.svg" }
];

export default function Footer() {
  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-8 pt-12 text-sm text-neutral-400 c-space">
      {/* Top separator line */}
      <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      
      {/* Copyright */}
      <div className="flex gap-2 items-center">
        <p>© {new Date().getFullYear()} Diginurture</p>
        <span className="hidden md:inline text-neutral-600">|</span>
        <p>All rights reserved</p>
      </div>

      {/* Role landing page links */}
      <div className="flex flex-wrap gap-4 text-xs font-semibold">
        <a href="/hire-react-developers" className="hover:text-white hover:underline transition">
          Hire React Devs
        </a>
        <a href="/hire-nodejs-developers" className="hover:text-white hover:underline transition">
          Hire Node.js Devs
        </a>
        <a href="/mvp-development-for-startups" className="hover:text-white hover:underline transition">
          MVP Development
        </a>
      </div>

      {/* Social Icons */}
      <div className="flex gap-3">
        {socialLinks.map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
          >
            <img src={social.icon} className="w-4 h-4 invert" alt={social.name} />
          </a>
        ))}
      </div>
    </section>
  );
}
