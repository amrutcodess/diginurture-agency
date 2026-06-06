import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import createGlobe from "cobe";
import { Mail, Clipboard, ClipboardCheck, Clock } from "lucide-react";

// Custom inline SVG icons for brands to avoid missing export failures in newer Lucide versions
const GithubIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Orbiting Circle Item
const OrbitingCircleItem = ({ src, className = "" }) => (
  <img
    src={src}
    alt="tech logo"
    className={`rounded-sm hover:scale-110 duration-200 cursor-pointer w-10 h-10 p-1.5 bg-white/5 border border-white/10 ${className}`}
  />
);

// Orbiting Circles Layout Component
const OrbitingCircles = ({
  className = "",
  children,
  reverse = false,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 40,
  speed = 1,
  ...props
}) => {
  const d = duration / speed;
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-1 stroke-white/5"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={{
              "--duration": `${d}s`,
              "--radius": radius,
              "--angle": angle,
              "--icon-size": `${iconSize}px`,
            }}
            className={`absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full ${
              reverse ? "[animation-direction:reverse]" : ""
            } ${className}`}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
};

// Globe configuration
const GLOBE_CONFIG = {
  devicePixelRatio: 2,
  width: 600,
  height: 600,
  phi: 0,
  theta: 0,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 12000,
  mapBrightness: 6,
  baseColor: [0.03, 0.11, 0.08], // Deep emerald/forest green
  markerColor: [0, 0.96, 0.83],    // Bright mint green markers
  glowColor: [0.06, 0.72, 0.5],    // Teal/emerald glowing aura
  markers: [
    { location: [20.5937, 78.9629], size: 0.1 },  // India
    { location: [40.7128, -74.006], size: 0.08 },  // New York
    { location: [-33.8688, 151.2093], size: 0.08 }, // Sydney
    { location: [48.8566, 2.3522], size: 0.08 },   // Paris
    { location: [1.3521, 103.8198], size: 0.08 },  // Singapore
  ],
};

// Globe Subcomponent
function TimezoneGlobe() {
  const canvasRef = useRef(null);
  const pointerRef = useRef(null);
  const rValue = useRef(0);
  const locationMotion = useMotionValue(0);
  const locationSpring = useSpring(locationMotion, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const onPointerDown = (e) => {
    pointerRef.current = e.clientX;
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  };

  const onPointerUp = () => {
    pointerRef.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  };

  const onMouseMove = (e) => {
    if (pointerRef.current !== null) {
      const diff = e.clientX - pointerRef.current;
      locationMotion.set(locationMotion.get() + diff / 500);
    }
  };

  const onTouchMove = (e) => {
    if (pointerRef.current !== null && e.touches[0]) {
      const diff = e.touches[0].clientX - pointerRef.current;
      locationMotion.set(locationMotion.get() + diff / 500);
    }
  };

  useEffect(() => {
    let width = 0;
    const updateSize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();

    const globe = createGlobe(canvasRef.current, {
      ...GLOBE_CONFIG,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerRef.current) {
          rValue.current += 0.005;
        }
        state.phi = rValue.current + locationSpring.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 50);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", updateSize);
    };
  }, [locationSpring]);

  return (
    <div className="mx-auto aspect-[1/1] w-full max-w-[280px] md:max-w-[320px] relative overflow-hidden flex items-center justify-center">
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerUp}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        style={{ cursor: "grab", opacity: 0 }}
        className="w-full h-full transition-opacity duration-500 [contain:layout_paint_size]"
      />
    </div>
  );
}

// Tech we Love stack definition
const techStack = [
  "firebase", "nextjs", "cplusplus", "express", "css3", "nodejs", "typescript",
  "git", "html5", "javascript", "mongodb", "react", "tailwindcss", "vitejs",
  "wordpress", "postman", "Kotlin", "Expo", "Jetpack"
];

export default function AboutGrid() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "hello@diginurture.agency";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading text-center mb-12 text-white">
        Build Your Product with Expert Full Stack Developers
      </h2>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:auto-rows-[19rem]">
        
        {/* Cell 1: Intro / Pitch (Row 1-2, Col 1-3) */}
        <div className="md:col-span-3 md:row-span-2 grid-default-color relative flex flex-col justify-end overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-aqua/5 rounded-full blur-[60px] pointer-events-none" />
          <img
            src="/assets/coding-pov.png"
            alt="developer working POV"
            className="absolute hidden md:block scale-[1.3] -right-12 -top-16 opacity-40 mix-blend-screen"
          />
          <div className="z-10 relative">
            <h3 className="headtext text-2xl font-bold text-white mb-3">
              Hire Remote Developers for MVP and SaaS Projects
            </h3>
            <p className="subtext text-neutral-300 leading-relaxed text-sm md:text-base">
              At Diginurture Agency, we're a tight-knit crew of developers who love building software that actually works — fast, reliable, and designed with purpose. We don't just write code; we craft digital experiences that grow and scale. Whether you're launching a startup idea, automating operations, or building custom business tools, we nurture your product from concept to launch with precision.
            </p>
          </div>
        </div>

        {/* Cell 2: Social Connect Links (Row 1, Col 4-6) */}
        <div className="md:col-span-3 grid-default-color flex flex-col justify-center items-center">
          <p className="text-xl md:text-2xl text-neutral-400 font-medium mb-4 text-center">
            Connect with us on
          </p>
          <div className="flex gap-4 items-center justify-center p-3 bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-md">
            <a
              href="https://github.com/diginurture"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-mint hover:text-black border border-white/10 hover:border-transparent transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/company/diginurture"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-mint hover:text-black border border-white/10 hover:border-transparent transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@diginurture.agency"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-mint hover:text-black border border-white/10 hover:border-transparent transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Cell 3: Timezone / Collaboration (Row 2, Col 4-5) */}
        <div className="md:col-span-2 grid-black-color relative flex flex-col justify-between overflow-hidden">
          <div className="z-10 relative">
            <h3 className="headtext text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-mint" /> Time Zone
            </h3>
            <p className="subtext text-xs text-neutral-400">
              Based in India (IST), available for global collaborations. We are highly flexible with international time zones and love working with teams worldwide.
            </p>
          </div>
          <div className="w-full flex items-center justify-center mt-4 md:mt-0">
            <TimezoneGlobe />
          </div>
        </div>

        {/* Cell 4: Copy Email Action Widget (Row 3, Col 1-2) */}
        <div className="md:col-span-2 grid-special-color flex flex-col items-center justify-center gap-4 text-center">
          <p className="headtext text-lg text-white font-bold px-2">
            Ready to turn your idea into reality? Let's build together!
          </p>
          <motion.button
            onClick={handleCopyEmail}
            className="relative px-6 py-3.5 text-sm font-semibold rounded-full bg-[#0b281e]/80 border border-white/10 text-white cursor-pointer overflow-hidden flex items-center gap-2 hover:bg-[#10b981] hover:text-black hover:border-transparent transition-all duration-300"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            {copied ? (
              <>
                <ClipboardCheck className="w-4 h-4" />
                <span>Email Copied!</span>
              </>
            ) : (
              <>
                <Clipboard className="w-4 h-4" />
                <span>Copy Email Address</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Cell 5: Orbiting Tech Stack circles (Row 3, Col 3-6) */}
        <div className="md:col-span-4 grid-default-color relative flex flex-col md:flex-row justify-between items-center overflow-hidden gap-6">
          <div className="absolute top-0 left-0 w-80 h-80 bg-mint/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="z-10 w-full md:w-[45%] flex flex-col justify-center text-left">
            <h3 className="headtext text-xl font-bold text-white mb-2">
              Tech We Love
            </h3>
            <p className="subtext text-sm text-neutral-400">
              Crafting high-performance applications with modern, cutting-edge tools and frameworks. Each project receives the optimal stack configuration for absolute scalability, speed, and safety.
            </p>
          </div>
          <div className="relative w-full md:w-[50%] h-[200px] flex items-center justify-center select-none scale-90 md:scale-100">
            {/* Inner Ring */}
            <OrbitingCircles radius={65} duration={12} reverse speed={0.5}>
              <OrbitingCircleItem src="/assets/logos/react.svg" />
              <OrbitingCircleItem src="/assets/logos/nodejs.svg" />
              <OrbitingCircleItem src="/assets/logos/typescript.svg" />
              <OrbitingCircleItem src="/assets/logos/mongodb.svg" />
            </OrbitingCircles>
            {/* Outer Ring */}
            <OrbitingCircles radius={110} duration={25} speed={0.5}>
              <OrbitingCircleItem src="/assets/logos/nextjs.svg" />
              <OrbitingCircleItem src="/assets/logos/tailwindcss.svg" />
              <OrbitingCircleItem src="/assets/logos/vitejs.svg" />
              <OrbitingCircleItem src="/assets/logos/firebase.svg" />
              <OrbitingCircleItem src="/assets/logos/Kotlin.svg" />
            </OrbitingCircles>
            {/* Logo in center */}
            <div className="z-10 w-12 h-12 bg-storm rounded-full border border-white/10 flex items-center justify-center font-black text-xs text-white shadow-xl shadow-aqua/20">
              DG
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
