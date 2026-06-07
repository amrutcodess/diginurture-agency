import React, { useRef, useState, useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const projectList = [
  {
    id: 1,
    title: "Eduflow",
    subDescription: [
      "An interactive platform for student workflows, course management, and academic collaboration.",
    ],
    href: "https://eduflow-app-i063.onrender.com",
    image: "/assets/projects/eduflow.png",
    gradient: "bg-gradient-to-br from-[#1e1b4b] to-[#311042]",
    tags: [
      { id: 1, name: "ReactJS" },
      { id: 2, name: "NodeJS" },
      { id: 3, name: "TailwindCSS" },
      { id: 4, name: "Render" },
    ],
  },
  {
    id: 2,
    title: "Crowd Funding Platform",
    subDescription: [
      "A decentralized crowdfunding application with campaign creation and secure payments.",
    ],
    href: "https://crowd-funding-platform-mauve.vercel.app/",
    image: "/assets/projects/crowdfund.png",
    gradient: "bg-gradient-to-br from-[#0f172a] to-[#1e293b]",
    tags: [
      { id: 1, name: "ReactJS" },
      { id: 2, name: "Vercel" },
      { id: 3, name: "TailwindCSS" },
      { id: 4, name: "Web3" },
    ],
  },
  {
    id: 3,
    title: "KisanSethu",
    subDescription: [
      "A full-scale web application built for farmers to diagnose crop diseases and get immediate solutions.",
    ],
    href: "https://shanmukha-kisansethu.vercel.app/",
    image: "/assets/projects/kisansethu.png",
    gradient: "bg-gradient-to-br from-[#064e3b] to-[#022c22]",
    tags: [
      { id: 1, name: "ReactJS" },
      { id: 2, name: "NodeJS" },
      { id: 3, name: "ExpressJS" },
      { id: 4, name: "MongoDB" },
    ],
  },
];

export default function Projects() {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Replicate the 3 projects 4 times to fill the infinite loop carousel track smoothly (total 12 items)
  const repeatedProjects = useMemo(() => {
    const items = [];
    for (let i = 0; i < 4; i++) {
      projectList.forEach((proj, idx) => {
        items.push({
          ...proj,
          id: `${proj.id}-${i}-${idx}`,
        });
      });
    }
    return items;
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      // Set scroll position to center to ensure seamless loop in both directions
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3;
        }
      }, 100);
    }
  }, []);

  // Frame loop for infinite autoscroll
  useEffect(() => {
    if (isPaused) return;

    const el = scrollRef.current;
    if (!el) return;

    let oneThird = el.scrollWidth / 3;
    let currentScroll = el.scrollLeft;

    const handleResize = () => {
      if (scrollRef.current) {
        oneThird = scrollRef.current.scrollWidth / 3;
      }
    };
    window.addEventListener("resize", handleResize);

    let frameId;
    const scrollStep = () => {
      if (el) {
        currentScroll += 0.8; // Smooth autoscroll increment
        if (currentScroll >= oneThird * 2) {
          currentScroll -= oneThird;
        } else if (currentScroll <= 0) {
          currentScroll += oneThird;
        }
        el.scrollLeft = currentScroll;
      }
      frameId = requestAnimationFrame(scrollStep);
    };

    frameId = requestAnimationFrame(scrollStep);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isPaused]);

  const handleArrowScroll = (direction) => {
    const el = scrollRef.current;
    if (el) {
      const cardWidth = window.innerWidth > 768 ? 364 : 284;
      const amount = direction === "left" ? -cardWidth : cardWidth;
      el.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section id="work" className="relative pt-32 pb-24 overflow-hidden w-full">
      {/* Background overlay text */}
      <div className="absolute top-10 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.02] select-none pointer-events-none z-0 flex">
        <h1 className="text-[10rem] md:text-[15rem] font-black leading-none text-white tracking-tighter shrink-0 flex gap-8">
          <span>PROJECTS</span>
          <span>PROJECTS</span>
          <span>PROJECTS</span>
          <span>PROJECTS</span>
        </h1>
      </div>

      <div
        className="relative z-10 w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Section Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 px-6 md:px-16 max-w-[1600px] mx-auto gap-6">
          <p className="text-2xl md:text-4xl text-neutral-400 font-medium tracking-tight">
            Our best work. <span className="text-white">Shipped and live.</span>
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => handleArrowScroll("left")}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all duration-300 group cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => handleArrowScroll("right")}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all duration-300 group cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-12 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
        >
          {repeatedProjects.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="shrink-0 w-[260px] md:w-[340px] group cursor-pointer"
              onClick={() => {
                if (project.href && project.href !== "#") {
                  window.open(project.href, "_blank", "noopener,noreferrer");
                }
              }}
            >
              <div
                className={`relative w-full h-[400px] md:h-[480px] rounded-[2rem] p-6 flex flex-col justify-end overflow-hidden ${project.gradient} border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-aqua/20`}
              >
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                {/* Cover Image */}
                <div
                  className="absolute top-0 left-0 w-full h-[65%] z-0 group-hover:scale-105 origin-top transition-transform duration-700 ease-out"
                  style={{
                    WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top rounded-t-[2rem]"
                  />
                </div>

                {/* Text details */}
                <div className="relative z-20 flex flex-col gap-3 transition-transform duration-500 ease-out">
                  <div className="flex flex-wrap gap-2 mb-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2.5 py-1 bg-white/10 rounded-full text-[10px] md:text-xs font-semibold text-neutral-200 backdrop-blur-md border border-white/10"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white leading-tight line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                    {project.subDescription[0]}
                  </p>
                  <div className="mt-2 inline-flex items-center text-sm font-bold text-white group-hover:text-aqua transition-colors duration-300">
                    View project <span className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
