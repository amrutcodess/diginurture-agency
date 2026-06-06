import React from "react";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import WavesBackground from "../components/WavesBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const testimonials = [
  {
    id: 1,
    name: "Rahul Desai",
    flag: "🇮🇳",
    text: "Diginurture Agency delivered our MVP in record time. Their expertise in cross-platform mobile apps saved us months of development. Highly recommend!",
    tags: ["Founder", "Tech Startup"],
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    flag: "🇦🇺",
    text: "Working with the Diginurture team was an absolute game-changer. They built our scalable backend infrastructure with zero hassle. Brilliant communication throughout the entire process.",
    tags: ["CTO", "SaaS"],
  },
  {
    id: 3,
    name: "Antoine Dubois",
    flag: "🇫🇷",
    text: "The quality of their React and Next.js development is simply outstanding. They completely transformed our slow e-commerce site into a lightning-fast experience. Merci!",
    tags: ["Director", "E-commerce"],
  },
  {
    id: 4,
    name: "Rajesh Shrestha",
    flag: "🇳🇵",
    text: "We needed a highly complex delivery management platform and they executed it flawlessly. The real-time tracking integration is perfect and highly reliable under heavy load.",
    tags: ["Operations Lead", "Logistics"],
  },
  {
    id: 5,
    name: "Wei Ling",
    flag: "🇸🇬",
    text: "Top-tier full-stack developers. They seamlessly integrated our smart home IoT devices with a beautiful Flutter app. We couldn't be happier with the end results.",
    tags: ["Product Manager", "IoT"],
  },
  {
    id: 6,
    name: "Mrs. Dharita",
    flag: "🇮🇳",
    text: "",
    videoUrl: "https://res.cloudinary.com/deksgb6tt/video/upload/v1773249299/video_testamonial_1_nbkupk.mp4",
    tags: ["Founder", "Crochet Nook"],
  },
  {
    id: 7,
    name: "Mark O'Connor",
    flag: "🇦🇺",
    text: "I've hired many freelancers over the years, but Diginurture operates like a true technical partner. They don't just write code; they actively solve real business problems.",
    tags: ["CEO", "Agency"],
  },
  {
    id: 8,
    name: "Dr. Amit Patel",
    flag: "🇮🇳",
    text: "Their knowledge of modern tech stacks is deeply impressive. They built our medical exam prep platform with enterprise-grade security and a flawless user experience.",
    tags: ["Founder", "EdTech"],
  },
  {
    id: 9,
    name: "Chloe Tan",
    flag: "🇸🇬",
    text: "Exceptional UI/UX implementation and flawless backend logic. The team delivered our fintech dashboard exactly to our specifications, completely bug-free on the first try.",
    tags: ["Tech Lead", "FinTech"],
  },
];

export default function TestimonialsPage() {
  return (
    <div className="relative min-h-screen w-full bg-midnight overflow-x-hidden">
      {/* 3D Wave Interactive Shader Background */}
      <WavesBackground
        linesGradient={["#00f5d4", "#10b981", "#06b6d4"]}
        animationSpeed={1.0}
      />

      <Navbar />

      <main className="relative z-10 w-full pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto flex flex-col gap-16">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <a
            href="/"
            className="self-start mb-4 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </a>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-mint" />
            <span>Partner Testimonials</span>
          </h1>
          <p className="subtext max-w-2xl text-neutral-400">
            Discover what startup founders, technical directors, and operations managers worldwide say about working with Diginurture Agency.
          </p>
        </div>

        {/* Testimonials Static Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="bg-[#0b1c15] border border-white/5 rounded-3xl p-6 md:p-8 hover:bg-[#122e22] hover:border-white/10 transition-all duration-300 shadow-xl flex flex-col gap-4 group"
            >
              {t.videoUrl ? (
                <div className="relative w-full rounded-2xl overflow-hidden bg-black/40 flex justify-center mb-2">
                  <video
                    className="w-full max-h-[320px] object-contain rounded-2xl"
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <source src={t.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-medium italic">
                  "{t.text}"
                </p>
              )}

              <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-white/5">
                <p className="text-white font-bold text-lg flex items-center gap-2">
                  {t.name}{" "}
                  <span className="text-xl" role="img" aria-label="flag">
                    {t.flag}
                  </span>
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
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
