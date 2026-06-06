import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PhoneCall, Compass, Cpu, CheckSquare, Ship } from "lucide-react";
import { animate } from "animejs";

// Helper to calculate custom glow colors
function getGlowStyles(colorString, intensity) {
  // Parse HSL from string like "160 80 80"
  const s = colorString.trim();
  const hslColor = `${s.split(" ")[0]}deg ${s.split(" ")[1]}% ${s.split(" ")[2]}%`;
  
  const alphas = [100, 60, 50, 40, 30, 20, 10];
  const labels = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const styles = {};
  
  for (let i = 0; i < alphas.length; i++) {
    styles[`--glow-color${labels[i]}`] = `hsl(${hslColor} / ${Math.min(alphas[i] * intensity, 100)}%)`;
  }
  return styles;
}

// Glowing Border Card Component (originally fxe)
const GlowCard = ({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "160 80 80", // emerald HSL theme
  backgroundColor = "#0b1c15",
  borderRadius = 32,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = true,
  colors = ["#10b981", "#06b6d4", "#a3e635"], // Emerald, Teal, Lime
  fillOpacity = 0.4,
}) => {
  const cardRef = useRef(null);

  const getCenterOffset = useCallback((element) => {
    const rect = element.getBoundingClientRect();
    return [rect.width / 2, rect.height / 2];
  }, []);

  const calculateProximity = useCallback((element, mouseX, mouseY) => {
    const [cx, cy] = getCenterOffset(element);
    const dx = mouseX - cx;
    const dy = mouseY - cy;
    
    let borderRatioX = Infinity;
    let borderRatioY = Infinity;
    
    if (dx !== 0) borderRatioX = cx / Math.abs(dx);
    if (dy !== 0) borderRatioY = cy / Math.abs(dy);
    
    const minBorderRatio = 1 / Math.min(borderRatioX, borderRatioY);
    return Math.min(Math.max(minBorderRatio, 0), 1);
  }, [getCenterOffset]);

  const calculateAngle = useCallback((element, mouseX, mouseY) => {
    const [cx, cy] = getCenterOffset(element);
    const dx = mouseX - cx;
    const dy = mouseY - cy;
    if (dx === 0 && dy === 0) return 0;
    
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    return angle;
  }, [getCenterOffset]);

  const onPointerMove = (e) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const prox = calculateProximity(el, x, y);
    const angle = calculateAngle(el, x, y);
    
    el.style.setProperty("--edge-proximity", `${(prox * 100).toFixed(3)}`);
    el.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
  };

  const glowStyles = getGlowStyles(glowColor, glowIntensity);

  // Set up custom gradients
  const gradientStyles = {};
  const points = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
  const gradientKeys = [
    "--gradient-one",
    "--gradient-two",
    "--gradient-three",
    "--gradient-four",
    "--gradient-five",
    "--gradient-six",
    "--gradient-seven",
  ];
  const colorMap = [0, 1, 2, 0, 1, 2, 1];

  for (let i = 0; i < 7; i++) {
    const colVal = colors[Math.min(colorMap[i], colors.length - 1)];
    gradientStyles[gradientKeys[i]] = `radial-gradient(at ${points[i]}, ${colVal} 0px, transparent 50%)`;
  }
  gradientStyles["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;

  const finalStyles = {
    "--card-bg": backgroundColor,
    "--edge-sensitivity": edgeSensitivity,
    "--border-radius": `${borderRadius}px`,
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": coneSpread,
    "--fill-opacity": fillOpacity,
    ...glowStyles,
    ...gradientStyles,
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={onPointerMove}
      className={`border-glow-card ${className}`}
      style={finalStyles}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  );
};

const timelineSteps = [
  {
    id: "01",
    title: "DISCOVERY CALL",
    description: "It all begins with a conversation. We sit down to hear your vision, understand your core objectives, and define a clear, actionable strategy for your project.",
    icon: <PhoneCall className="w-8 h-8 text-aqua" />,
  },
  {
    id: "02",
    title: "STRATEGY & DESIGN",
    description: "Next, we translate your ideas into visual concepts. We craft intuitive user interfaces and map out the user journeys, ensuring the final product will be both beautiful and highly functional.",
    icon: <Compass className="w-8 h-8 text-mint" />,
  },
  {
    id: "03",
    title: "DEVELOPMENT",
    description: "This is where the magic happens. Our engineers get to work, turning the designs into clean, scalable, and robust code built on modern architectures.",
    icon: <Cpu className="w-8 h-8 text-royal" />,
  },
  {
    id: "04",
    title: "TESTING & QA",
    description: "Before anything goes live, we rigorously test the application. We hunt down bugs and ensure seamless performance across all devices and browsers.",
    icon: <CheckSquare className="w-8 h-8 text-lavender" />,
  },
  {
    id: "05",
    title: "DEPLOYMENT & LAUNCH",
    description: "The final chapter. We deploy your finished product to the market with precision, setting you up for immediate success and future growth.",
    icon: <Ship className="w-8 h-8 text-fuchsia" />,
  },
];

export default function ProcessTimeline() {
  const sectionRef = useRef(null);

  // Track scroll progress to draw the timeline path
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const isEven = entry.target.dataset.iseven === "true";
            animate(entry.target, {
              translateX: window.innerWidth > 768 ? (isEven ? [-60, 0] : [60, 0]) : [0, 0],
              translateY: window.innerWidth <= 768 ? [40, 0] : [0, 0],
              opacity: [0, 1],
              ease: "outExpo",
              duration: 1200,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".timeline-step").forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="c-space section-spacing overflow-hidden"
      id="how-it-works"
      ref={sectionRef}
    >
      {/* Section Header */}
      <div className="mb-24 flex flex-col items-center text-center px-4">
        <h2 className="text-heading uppercase tracking-tighter mb-4 text-white drop-shadow-lg">
          The Story of Your Product
        </h2>
        <div className="h-1 w-20 bg-aqua mb-6 rounded-full" />
        <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl font-medium leading-relaxed">
          A simple, proven journey from your initial idea to a market-ready platform.
        </p>
      </div>

      {/* Timeline track */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-0">
        {/* Gray background line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-1/2" />
        
        {/* Animated growing progress line */}
        <motion.div
          className="absolute left-[31.5px] md:left-1/2 top-0 w-[3px] bg-aqua md:-translate-x-1/2 shadow-[0_0_15px_#10b981] origin-top z-0"
          style={{ height: lineHeight }}
        />

        {timelineSteps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={step.id}
              data-iseven={isEven}
              className="timeline-step opacity-0 flex flex-col md:flex-row items-center w-full mb-20 md:mb-32 relative z-10"
            >
              {/* Mobile circular indicator */}
              <div className="md:hidden absolute left-8 top-10 -translate-x-1/2 w-8 h-8 bg-[#020c08] border-4 border-aqua rounded-full z-10 flex items-center justify-center">
                <div className="w-2 h-2 bg-aqua rounded-full" />
              </div>

              {/* Offset space for even steps on desktop */}
              {!isEven && <div className="hidden md:block w-1/2 pr-12" />}

              {/* Desktop circular step indicator */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-[#020c08] border-[4px] border-white/20 rounded-full z-10 items-center justify-center transition-all duration-500 hover:border-aqua shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <span className="text-sm font-black text-white">{step.id}</span>
              </div>

              {/* Card wrapper */}
              <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                <GlowCard
                  edgeSensitivity={30}
                  glowColor="160 80 80"
                  backgroundColor="#03140e"
                  borderRadius={32}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={true}
                  className={`w-full group ${isEven ? "md:mr-auto" : "md:ml-auto"}`}
                >
                  <div className="p-8 md:p-10 liquid-glass bg-white/5 border border-transparent transition-all duration-500 rounded-[32px] flex flex-col gap-4">
                    {/* Icon wrapper */}
                    <div className={`p-4 bg-white/5 rounded-2xl w-fit border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500 ${isEven ? "md:ml-auto md:mr-0" : ""}`}>
                      {step.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </GlowCard>
              </div>

              {/* Offset space for odd steps on desktop */}
              {isEven && <div className="hidden md:block w-1/2 pl-12" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
