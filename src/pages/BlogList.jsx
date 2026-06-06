import React, { useState } from "react";
import { ArrowLeft, BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import WavesBackground from "../components/WavesBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const blogArticles = [
  {
    slug: "how-to-hire-remote-developers-mvp-2026",
    title: "How to Hire Remote Developers for Your MVP in 2026",
    category: "Scaling",
    date: "June 4, 2026",
    readTime: "6 min read",
    summary: "Offshore vetted teams represent a powerful shortcut to shipping fast. Learn how to screen for communication, timezone synergy, and true full-stack product ownership.",
    image: "/assets/service-mvp.png",
    author: "Ajay Singh",
    authorImage: "/assets/team/Aj.jpg",
    content: `
      <h2>The Shift in Remote Staffing in 2026</h2>
      <p>Building a Minimum Viable Product (MVP) has never been faster, but the competition is fiercer than ever. In 2026, launching a product is not just about writing clean code—it is about shipping high-quality solutions before the opportunity window closes. For many founders, hiring a vetted, offshore remote team is the ultimate competitive advantage.</p>
      
      <h2>1. Look for Product Ownership, Not Just Task Solvers</h2>
      <p>A common mistake is hiring developers who only write code exactly as written in a specification document. For an MVP, requirements change rapidly. You need developers who understand business workflows, think critically about user experience, and challenge assumptions.</p>
      <blockquote>"Vetted developers don't just solve tickets; they help you optimize the product scope for launch."</blockquote>

      <h2>2. Screen for Communication and Alignment</h2>
      <p>When working with remote teams across India, North America, or Europe, timezone management is critical. Seek out agencies that offer structured overlap hours (at least 3-4 hours daily) and leverage async collaboration frameworks like Slack, Notion, and Loom videos. Communication depth is often more important than pure technical experience.</p>
      
      <h2>3. Establish Clear Agile Sprints</h2>
      <p>Break development into 1-week or 2-week sprint cycles. Every sprint should end with a demoable build. If your engineering partner cannot show you a working prototype within the first two weeks, it is a significant red flag. At Diginurture, we prioritize shipping demoable milestones early and often.</p>
    `
  },
  {
    slug: "saas-architecture-scaling-guide",
    title: "Building for Scale: The Ultimate SaaS Architecture Guide",
    category: "Tech",
    date: "May 28, 2026",
    readTime: "8 min read",
    summary: "Architecting a modern SaaS product requires balancing development speed with future scalability. Discover how we construct robust MongoDB, Node, and Next.js infrastructures.",
    image: "/assets/service-fullstack.png",
    author: "Aditya Jaif",
    authorImage: "/assets/team/Adi.jpg",
    content: `
      <h2>The Core Stack for Modern SaaS</h2>
      <p>When starting a SaaS project, choice of architecture determines your long-term success. Over-engineering too early can drain your seed funding, while under-engineering leads to crippling technical debt. A balanced approach using Next.js (Frontend), Node/Express (API Layer), and MongoDB (Database) provides excellent flexible scaling.</p>
      
      <h2>1. The Power of Next.js App Router</h2>
      <p>By leveraging Server Components (RSC) and Server Actions, Next.js reduces client-side bundle size, improving loading times. This is vital for conversion rates on landing pages and web apps. Furthermore, page routing is simplified, allowing developers to structure complex portals with ease.</p>

      <h2>2. Database Schemas: Keep It Flexible but Structured</h2>
      <p>Using NoSQL databases like MongoDB allows early-stage projects to adapt schemas as user requirements change. However, you should still define strict Mongoose schemas on the server to maintain data sanity. As you scale, optimize index structures and database read/write queries early.</p>
      
      <h2>3. Load Balancing and Edge Middleware</h2>
      <p>Place authentication and geographical routing checks on Edge middleware. This intercepts requests before they hit your core server, decreasing response times and saving server CPU cycles. Additionally, dockerize your microservices for hassle-free deployments across AWS or Vercel.</p>
    `
  },
  {
    slug: "cross-platform-vs-native-apps",
    title: "Cross-Platform vs. Native Mobile Apps: Which Should You Choose?",
    category: "Design",
    date: "May 15, 2026",
    readTime: "5 min read",
    summary: "Evaluating Kotlin, Swift, Flutter, and React Native for modern mobile development. We break down when to go native and when to leverage cross-platform codebases.",
    image: "/assets/service-custom.png",
    author: "Nimesh Ranjan",
    authorImage: "/assets/team/Nimo.jpg",
    content: `
      <h2>The Mobile Ecosystem in 2026</h2>
      <p>Should you build two separate native apps or one cross-platform app? This age-old question remains critical. In 2026, frameworks like Flutter and React Native have matured to the point where they achieve near-native UI performance, making them the standard choice for most consumer and SaaS applications.</p>
      
      <h2>When to Choose Cross-Platform</h2>
      <p>If your app is database-driven, focused on forms, lists, charts, and standard device APIs (camera, geolocation), cross-platform is the clear winner. You write one codebase, reducing your initial engineering cost by nearly 40% and keeping feature releases synchronized across iOS and Android.</p>

      <h2>When to Choose Native (Swift / Kotlin)</h2>
      <p>Native development remains necessary if your app relies heavily on:
      <ul>
        <li>Complex real-time audio/video processing (e.g. live phone call voice manipulation).</li>
        <li>Low-level hardware integrations (Bluetooth IoT protocols, custom camera accessories).</li>
        <li>High-performance 3D rendering (WebGL/Metal engine games).</li>
      </ul>
      For these use cases, direct hardware access through native Android (Kotlin/Jetpack) or iOS (Swift/SwiftUI) ensures seamless thread performance.</p>
    `
  }
];

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = selectedCategory === "All"
    ? blogArticles
    : blogArticles.filter(a => a.category === selectedCategory);

  return (
    <div className="relative min-h-screen w-full bg-midnight overflow-x-hidden">
      {/* 3D Wave Shader Background */}
      <WavesBackground
        linesGradient={["#00f5d4", "#10b981"]}
        animationSpeed={1.0}
      />

      <Navbar />

      <main className="relative z-10 w-full pt-32 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto flex flex-col gap-12">
        {/* Header section */}
        <div className="flex flex-col items-center text-center space-y-4">
          <a
            href="/"
            className="self-start mb-4 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </a>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-mint" />
            <span>Diginurture Insights</span>
          </h1>
          <p className="subtext max-w-2xl text-neutral-400">
            Articles, guides, and engineering logs from the team on building premium MVPs, scaling backend pipelines, and managing high-performing remote squads.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-3 justify-center border-b border-white/5 pb-6">
          {["All", "Scaling", "Tech", "Design"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-aqua border-transparent text-black"
                  : "bg-white/5 border-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art, idx) => (
            <motion.article
              key={art.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="group flex flex-col bg-white/5 border border-white/5 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-white/10 transition-all duration-300 shadow-xl"
            >
              {/* Cover Image Container */}
              <div className="h-48 overflow-hidden relative bg-storm border-b border-white/5">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-extrabold uppercase text-aqua tracking-widest border border-white/10">
                  {art.category}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col flex-grow gap-4">
                <div className="flex items-center gap-4 text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-aqua" />
                    {art.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-aqua" />
                    {art.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white leading-tight group-hover:text-mint transition-colors">
                  <a href={`/blog/${art.slug}`}>{art.title}</a>
                </h3>

                <p className="text-xs md:text-sm text-neutral-400 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>

                {/* Author profile */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={art.authorImage}
                      alt={art.author}
                      className="w-7 h-7 rounded-full object-cover border border-white/10"
                    />
                    <span className="text-xs font-bold text-neutral-300">{art.author}</span>
                  </div>
                  <a
                    href={`/blog/${art.slug}`}
                    className="inline-flex items-center text-xs font-extrabold text-white group-hover:text-aqua transition-colors"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
