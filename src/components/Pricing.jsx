import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info } from "lucide-react";

const devPackages = [
  {
    name: "Starter / Artisanal",
    price: "$180 / ₹15,000",
    description: "Perfect for artisanal shops, niche portfolios, and single-page landing campaigns.",
    features: [
      "Custom Single-Page Portfolio or Store",
      "WhatsApp & Social Media Integrations",
      "Full Mobile Responsive Design",
      "High-Performance Speed Optimization",
      "1-2 Week Delivery Time",
    ],
    buttonText: "Get a Price Quote",
    color: "#10b981", // Emerald
    isPopular: false,
  },
  {
    name: "Professional Branding",
    price: "$630 / ₹53,000",
    description: "Premium E-commerce, blogs, and corporate sites with global architecture.",
    features: [
      "Multi-Page Global Architecture",
      "Advanced Product Catalog & Inventory",
      "Multi-Language Support",
      "Secure Payment Gateway Integrations",
      "3-5 Week Delivery Time",
    ],
    buttonText: "Get a Price Quote",
    color: "#06b6d4", // Teal
    isPopular: false,
  },
  {
    name: "MVP Startup",
    price: "$1,450 / ₹1.2L",
    description: "Custom app development & backend validation MVP for early stage startups.",
    features: [
      "Cross-Platform Mobile App (Android/iOS)",
      "Dedicated Administration Dashboard",
      "Custom API & Database Architecture",
      "User Authentication & Push Notifications",
      "6-8 Week Rapid Delivery",
    ],
    buttonText: "Get a Price Quote",
    color: "#00f5d4", // Mint
    isPopular: true,
  },
  {
    name: "Enterprise Solutions",
    price: "$3,000+ / ₹2.5L+",
    description: "Custom CRMs, real-time logistics networks, and complex operations software.",
    features: [
      "Custom CRM & Operations Automation",
      "Real-Time Delivery & GPS Tracking Systems",
      "Cross-Platform Native Apps",
      "Bespoke Dashboard, Analytics & Reports",
      "3-6 Month Scalable Dev Roadmap",
    ],
    buttonText: "Get a Price Quote",
    color: "#a3e635", // Lime
    isPopular: false,
  },
];

const maintenancePackages = [
  {
    name: "BASIC",
    price: "$200 / ₹16,500",
    description: "Essential care plan for personal apps and static websites.",
    features: [
      "Fix up to 5 bugs each week",
      "Add 1 small feature every 2 months",
      "Monthly app speed improvements",
      "Email help (24-hour response time)",
      "Basic app security vulnerability checks",
      "Updates for new mobile OS environments",
      "Monthly progress & analytics summaries",
    ],
    buttonText: "Get Basic Maintenance",
    color: "#10b981",
    isPopular: false,
  },
  {
    name: "STANDARD",
    price: "$450 / ₹37,500",
    description: "Standard support for active commercial products and active SaaS.",
    features: [
      "Fix up to 10 bugs each week",
      "Add 2 new features each month",
      "Speed improvements every two weeks",
      "Urgent hotfix help within 6 hours",
      "Bi-weekly security check-ups & logs",
      "Monthly planning & feedback call",
      "Quarterly database maintenance",
      "Priority customer support lines",
    ],
    buttonText: "Get Standard Maintenance",
    color: "#06b6d4",
    isPopular: true,
  },
  {
    name: "PREMIUM",
    price: "$800 / ₹66,500",
    description: "Complete hands-on care package for high-traffic platforms.",
    features: [
      "Unlimited critical bug fixes anytime",
      "Custom feature roadmap for your growth",
      "Weekly performance optimization",
      "Round-the-clock help (2-hour SLA)",
      "Advanced monthly penetration audits",
      "Your own dedicated technical account manager",
      "First-in-line priority for updates",
    ],
    buttonText: "Get Premium Maintenance",
    color: "#a3e635",
    isPopular: false,
  },
];

export default function Pricing() {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const activePackages = isMaintenance ? maintenancePackages : devPackages;

  return (
    <section className="c-space my-20" id="pricing">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-4 mb-10">
        <h2 className="text-heading text-white">Our Service Packages</h2>
        <p className="subtext max-w-2xl text-neutral-300">
          Transparent, project-based pricing. From artisanal starter landing pages to custom MVPs, Enterprise CRMs, and dedicated App Maintenance plans.
        </p>
      </div>

      {/* Selector Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-[#0b1c15] p-1.5 rounded-full flex gap-1 relative z-10 box-border border border-white/5 overflow-hidden">
          <button
            onClick={() => setIsMaintenance(false)}
            className={`relative z-20 px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              !isMaintenance ? "text-white" : "text-neutral-400 hover:text-white"
            }`}
          >
            New App Development
          </button>
          <button
            onClick={() => setIsMaintenance(true)}
            className={`relative z-20 px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              isMaintenance ? "text-white" : "text-neutral-400 hover:text-white"
            }`}
          >
            Existing App Maintenance
          </button>
          
          <motion.div
            className="absolute inset-y-1.5 bg-[#10b981] rounded-full z-10 shadow-lg shadow-[#10b981]/20"
            initial={false}
            animate={{
              left: isMaintenance ? "calc(50% + 2px)" : "6px",
              width: isMaintenance ? "calc(50% - 8px)" : "calc(50% - 4px)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </div>
      </div>

      {/* Grid Packages */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={isMaintenance ? "maint" : "dev"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={`grid grid-cols-1 ${
              isMaintenance
                ? "md:grid-cols-3 max-w-6xl mx-auto"
                : "md:grid-cols-2 xl:grid-cols-4"
            } gap-6`}
          >
            {activePackages.map((pkg, idx) => (
              <div
                key={`${pkg.name}-${idx}`}
                className={`relative flex flex-col p-6 rounded-3xl border transition-all duration-300 ${
                  pkg.isPopular
                    ? "border-[#10b981] bg-white/10 shadow-[0_0_30px_rgba(16,185,129,0.05)] scale-102"
                    : "border-white/5 bg-white/5 hover:border-white/15"
                } backdrop-blur-md`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#10b981] text-black text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10">
                    Most Popular
                  </div>
                )}

                <div className="mb-6 mt-2">
                  <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wide">{pkg.name}</h3>
                  <p className="text-neutral-400 text-xs min-h-[36px] leading-relaxed">
                    {pkg.description}
                  </p>
                  
                  <div className="mt-4 flex flex-col items-start gap-0.5">
                    <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">Pricing</span>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-2xl font-black ${
                          pkg.isPopular ? "text-mint" : "text-white"
                        }`}
                      >
                        {pkg.price}
                      </span>
                    </div>
                    <span className="text-neutral-500 text-[9px] uppercase font-bold tracking-widest mt-1">
                      {isMaintenance ? "Per Month" : "Based on Requirements"}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8 flex-1">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-black/40 w-4.5 h-4.5 flex items-center justify-center shrink-0">
                        <Check style={{ color: pkg.color }} strokeWidth={4} className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-neutral-300 text-xs leading-relaxed font-semibold">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Action button */}
                <a
                  href={`/#contact?plan=${encodeURIComponent(pkg.name)}`}
                  className={`block text-center w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    pkg.isPopular
                      ? "bg-[#10b981] text-black hover:bg-mint shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                      : "bg-transparent text-white hover:bg-white/10 border border-white/10"
                  }`}
                  style={!pkg.isPopular ? { borderColor: pkg.color, color: pkg.color } : {}}
                >
                  {pkg.buttonText}
                </a>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
