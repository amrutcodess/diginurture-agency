import React, { useEffect, useRef, useMemo, useState, forwardRef, Children, isValidElement, cloneElement } from "react";
import gsap from "gsap";
import { animate, stagger } from "animejs";
import { Code, Rocket, Settings, CheckCircle } from "lucide-react";

// Card wrapper component
const Card = forwardRef(({ customClass = "", children, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={`absolute top-1/2 left-1/2 select-none pointer-events-auto ${customClass} ${props.className || ""}`}
  />
));
Card.displayName = "Card";

// Position math for 3D stack cards
const calculateCardPosition = (index, distance, verticalDistance, total) => ({
  x: index * distance,
  y: -index * verticalDistance,
  z: -index * distance * 1.5,
  zIndex: total - index,
});

// Setter for initial GSAP properties
const setCardInitialProperties = (element, pos, skew) => {
  gsap.set(element, {
    x: pos.x,
    y: pos.y,
    z: pos.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: pos.zIndex,
    force3D: true,
  });
};

// 3D Deck Swap Container
const CardSwapContainer = ({
  width = 500,
  height = 400,
  cardDistance = 35,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = true,
  skewAmount = 3,
  children,
}) => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const intervalRef = useRef(0);
  const cardList = useMemo(() => Children.toArray(children), [children]);
  const cardRefs = useMemo(() => cardList.map(() => React.createRef()), [cardList.length]);
  const indexOrder = useRef(Array.from({ length: cardList.length }, (_, i) => i));

  useEffect(() => {
    const total = cardRefs.length;
    // Set initial positions
    cardRefs.forEach((ref, idx) => {
      if (ref.current) {
        const pos = calculateCardPosition(idx, cardDistance, verticalDistance, total);
        setCardInitialProperties(ref.current, pos, skewAmount);
        if (idx === 0) {
          ref.current.classList.add("card-active");
        }
      }
    });

    const triggerSwap = () => {
      if (indexOrder.current.length < 2) return;
      
      const [topIdx, ...remaining] = indexOrder.current;
      const topCard = cardRefs[topIdx].current;
      
      const tl = gsap.timeline();
      timelineRef.current = tl;

      cardRefs.forEach((ref) => ref.current?.classList.remove("card-active"));
      cardRefs[remaining[0]].current?.classList.add("card-active");

      // Push top card down and out
      tl.to(topCard, {
        y: "+=500",
        duration: 1.2,
        ease: "power2.inOut",
      });

      // Move other cards up one position
      tl.addLabel("promote", "-=0.9");
      remaining.forEach((currIdx, order) => {
        const cardElement = cardRefs[currIdx].current;
        const newPos = calculateCardPosition(order, cardDistance, verticalDistance, total);
        tl.set(cardElement, { zIndex: newPos.zIndex }, "promote");
        tl.to(
          cardElement,
          {
            x: newPos.x,
            y: newPos.y,
            z: newPos.z,
            duration: 1.0,
            ease: "power2.inOut",
          },
          `promote+=${order * 0.15}`
        );
      });

      // Send the top card to the back of the stack
      const backPos = calculateCardPosition(total - 1, cardDistance, verticalDistance, total);
      tl.addLabel("return", "promote+=0.8");
      tl.call(() => {
        gsap.set(topCard, { zIndex: backPos.zIndex });
      }, null, "return");
      tl.to(
        topCard,
        {
          x: backPos.x,
          y: backPos.y,
          z: backPos.z,
          duration: 1.0,
          ease: "power2.inOut",
        },
        "return"
      );
      tl.call(() => {
        indexOrder.current = [...remaining, topIdx];
      });
    };

    intervalRef.current = window.setInterval(triggerSwap, delay);

    if (pauseOnHover && containerRef.current) {
      const el = containerRef.current;
      const pause = () => {
        timelineRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        timelineRef.current?.play();
        intervalRef.current = window.setInterval(triggerSwap, delay);
      };
      el.addEventListener("mouseenter", pause);
      el.addEventListener("mouseleave", resume);
      return () => {
        el.removeEventListener("mouseenter", pause);
        el.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }

    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, cardRefs]);

  const renderedCards = cardList.map((child, idx) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        key: idx,
        ref: cardRefs[idx],
        style: {
          width: `${width}px`,
          height: `${height}px`,
          ...child.props.style,
        },
      });
    }
    return child;
  });

  return (
    <div
      ref={containerRef}
      className="card-swap-container relative"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {renderedCards}
    </div>
  );
};

const serviceList = [
  {
    title: "FULLSTACK WEB & APP SOLUTIONS",
    description: "End-to-end digital excellence: from complex web architectures to high-performance mobile applications.",
    features: ["React / Next.js / Node.js", "Express & Python Backend", "iOS & Android Native Apps", "Secure Cloud Architecture"],
    icon: <Code className="size-8 text-aqua" />,
    gradient: "from-[#0b281e] to-[#04120f]", // emerald gradient
    bookmark: "Web & App",
    image: "/assets/service-fullstack.png",
  },
  {
    title: "STARTUP & MVP DEVELOPMENT",
    description: "Quickly validate your concept with a market-ready MVP that captures your core idea while ensuring future scalability.",
    features: ["Rapid Prototyping & Design", "Core Feature Development", "User Analytics Integration", "Scalable Database Design"],
    icon: <Rocket className="size-8 text-mint" />,
    gradient: "from-[#0d4e3b] to-[#052c20]", // mint/emerald gradient
    bookmark: "MVP Dev",
    image: "/assets/service-mvp.png",
  },
  {
    title: "CUSTOM SOFTWARE SOLUTIONS",
    description: "Bespoke applications tailored to your unique business challenges, workflows, and long-term goals.",
    features: ["Enterprise Automation & CRMs", "Seamless API Integrations", "Legacy System Modernization", "Custom Data Dashboards"],
    icon: <Settings className="size-8 text-fuchsia" />,
    gradient: "from-[#14532d] to-[#062c16]", // forest green gradient
    bookmark: "Custom Software",
    image: "/assets/service-custom.png",
  },
];

export default function Services() {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate([".services-heading", ".services-text-content", ".services-cards-container"], {
              translateY: [80, 0],
              opacity: [0, 1],
              delay: stagger(150),
              ease: "outExpo",
              duration: 1200,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="c-space section-spacing overflow-hidden"
      id="services"
      ref={headingRef}
    >
      {/* Title */}
      <div className="flex flex-col items-center text-center mb-16 px-4 services-heading opacity-0">
        <h2 className="text-heading text-white uppercase tracking-tighter leading-none mb-4">
          Services We Provide
        </h2>
        <div className="h-1 w-20 bg-aqua rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
        {/* Left Side Content */}
        <div className="w-full lg:w-1/3 flex flex-col text-left services-text-content opacity-0 px-4 lg:px-0">
          <div className="liquid-glass bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl">
            <p className="text-xl md:text-2xl font-semibold leading-relaxed text-white">
              We build robust apps through collaborative development that turns your vision into reality.
              <br />
              <br />
              Specializing in <span className="text-aqua font-black">Fullstack Web & App Solutions</span> for modern businesses.
            </p>
          </div>
        </div>

        {/* Right Side Carousel */}
        <div className="w-full lg:w-2/3 relative h-[500px] md:h-[600px] services-cards-container opacity-0 flex justify-center lg:justify-end mt-10 lg:mt-0">
          <div className="absolute -inset-10 bg-aqua/5 blur-[100px] rounded-full pointer-events-none" />
          
          <CardSwapContainer
            width={window.innerWidth > 768 ? 580 : 340}
            height={window.innerWidth > 768 ? 420 : 450}
            cardDistance={window.innerWidth > 768 ? 35 : 20}
            verticalDistance={window.innerWidth > 768 ? 60 : 45}
            delay={5000}
            skewAmount={2}
          >
            {serviceList.map((service, idx) => (
              <Card
                key={idx}
                customClass={`bg-gradient-to-br ${service.gradient} rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden`}
              >
                {/* Header Bookmark */}
                <div className="absolute top-0 left-0 w-full py-4 bg-black/40 border-b border-white/10 flex justify-center z-20">
                  <h4 className="text-xs font-bold tracking-widest text-neutral-300 uppercase flex items-center gap-2">
                    {service.icon}
                    <span>{service.bookmark}</span>
                  </h4>
                </div>

                {/* Card Content */}
                <div className="flex flex-col md:flex-row h-full pt-16 select-none pointer-events-none">
                  {/* Image side */}
                  <div className="w-full md:w-2/5 h-36 md:h-full relative overflow-hidden hidden md:block">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b281e] z-10" />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Text side */}
                  <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center text-left">
                    <h3 className="text-xl md:text-2xl font-black mb-3 uppercase leading-tight text-white">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-1 gap-2 mt-auto">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-neutral-400">
                          <CheckCircle className="w-4 h-4 text-mint flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwapContainer>
        </div>
      </div>
    </section>
  );
}
