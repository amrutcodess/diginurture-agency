import React, { useMemo } from "react";
import { Play } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Desai",
    flag: "🇮🇳",
    text: "Diginurture built our KisanSethu platform, helping thousands of farmers get real-time agronomic advice. Their crop disease detection model is highly accurate and performs flawlessly.",
    tags: ["Founder", "KisanSethu"],
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    flag: "🇺🇸",
    text: "The Eduflow app has completely transformed how students manage their learning workflows. The UI is gorgeous, and the backend scalability handles our user spikes without breaking a sweat.",
    tags: ["CTO", "Eduflow"],
  },
  {
    id: 3,
    name: "Antoine Dubois",
    flag: "🇫🇷",
    text: "We needed a secure and transparent Crowd Funding Platform, and the team delivered it ahead of schedule. The campaign creation flow and secure wallet integrations are rock solid.",
    tags: ["Founder", "Crowd Funding"],
  },
  {
    id: 4,
    name: "Mrs. Dharita",
    flag: "🇮🇳",
    text: "The agronomic decision system that Diginurture engineered for KisanSethu has drastically reduced crop response times for our farmers. Highly recommend their technical expertise.",
    tags: ["Director", "KisanSethu"],
  },
  {
    id: 5,
    name: "Rajesh Shrestha",
    flag: "🇳🇵",
    text: "Our educational platform Eduflow requires extremely interactive user flows. Diginurture crafted a seamless experience that our students love. Truly exceptional development work.",
    tags: ["Product Lead", "Eduflow"],
  },
];

// Testimonial Card Component
const TestimonialCard = ({ t }) => (
  <div className="bg-[#0b1c15] border border-white/5 rounded-3xl p-6 md:p-8 hover:bg-[#122e22] hover:border-white/10 transition-all duration-300 shadow-xl flex-shrink-0 w-full flex flex-col gap-4">
    {t.videoUrl ? (
      <div className="relative w-full rounded-2xl overflow-hidden bg-black/40 flex justify-center mb-2">
        <video
          className="w-full max-h-[300px] object-contain rounded-2xl"
          controls
          preload="metadata"
          playsInline
        >
          <source src={t.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    ) : (
      <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-medium">
        "{t.text}"
      </p>
    )}
    
    <div className="flex flex-col gap-3 mt-auto">
      <p className="text-white font-bold text-lg flex items-center gap-2">
        {t.name} <span className="text-xl" role="img" aria-label="flag">{t.flag}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {t.tags.map((tag, n) => (
          <span
            key={n}
            className="px-3 py-1 bg-white/5 rounded-full text-[10px] md:text-xs font-semibold text-neutral-400 border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default function TestimonialsMarquee() {
  const column1 = useMemo(() => testimonials.filter((_, idx) => idx % 3 === 0), []);
  const column2 = useMemo(() => testimonials.filter((_, idx) => idx % 3 === 1), []);
  const column3 = useMemo(() => testimonials.filter((_, idx) => idx % 3 === 2), []);

  return (
    <section className="relative pt-20 pb-20 overflow-hidden w-full" id="testimonials">
      <style>{`
        @keyframes marqueeUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marqueeDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-marquee-up {
          animation: marqueeUp 40s linear infinite;
        }
        .animate-marquee-down {
          animation: marqueeDown 40s linear infinite;
        }
        .marquee-container:hover .animate-marquee-up,
        .marquee-container:hover .animate-marquee-down {
          animation-play-state: paused;
        }
      `}</style>

      {/* Large background title */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full overflow-hidden whitespace-nowrap opacity-[0.02] select-none pointer-events-none z-0 flex justify-center">
        <h1 className="text-[10rem] md:text-[15rem] font-black leading-none text-white tracking-tighter shrink-0 flex gap-8">
          <span>TESTIMONIALS</span>
          <span>TESTIMONIALS</span>
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 marquee-container">
        <div className="text-center mb-16">
          <h2 className="text-heading text-white mb-4">Reviews & Testimonials</h2>
          <p className="text-lg md:text-xl text-neutral-400 font-medium tracking-tight">
            Real founders. <span className="text-white">Real growth results.</span>
          </p>
        </div>

        {/* 3 Columns Marquee */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[750px] overflow-hidden relative"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {/* Column 1: Up */}
          <div className="flex flex-col gap-6 animate-marquee-up shrink-0">
            {column1.map((item) => (
              <TestimonialCard key={item.id} t={item} />
            ))}
            {column1.map((item) => (
              <TestimonialCard key={`${item.id}-dup`} t={item} />
            ))}
          </div>

          {/* Column 2: Down */}
          <div className="hidden md:flex flex-col gap-6 animate-marquee-down shrink-0">
            {column2.map((item) => (
              <TestimonialCard key={item.id} t={item} />
            ))}
            {column2.map((item) => (
              <TestimonialCard key={`${item.id}-dup`} t={item} />
            ))}
          </div>

          {/* Column 3: Up */}
          <div className="hidden lg:flex flex-col gap-6 animate-marquee-up shrink-0">
            {column3.map((item) => (
              <TestimonialCard key={item.id} t={item} />
            ))}
            {column3.map((item) => (
              <TestimonialCard key={`${item.id}-dup`} t={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
