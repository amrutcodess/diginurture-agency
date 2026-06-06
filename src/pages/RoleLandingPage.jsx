import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, UserCheck, Code, Settings, DollarSign, Users, ShieldAlert } from "lucide-react";
import WavesBackground from "../components/WavesBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Structured Roles Dataset
const rolesDataset = {
  "react-developer": {
    title: "Hire Vetted React Developers",
    heading: "Frontend Specialists in React & Next.js Ecosystems",
    description: "Build ultra-fast, responsive single-page web applications and interactive portals using React 18/19, Vite, Tailwind CSS v4, and modern UI libraries.",
    skills: ["ReactJS", "NextJS", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux Toolkit", "GraphQL/REST API Integration"],
    tasks: [
      "Convert complex Figma designs into responsive pixel-perfect interfaces.",
      "Optimize bundle sizes and implement SSR/ISR frameworks for SEO performance.",
      "Integrate state management systems and handle third-party client API hooks.",
      "Ensure web accessibility (WCAG) and browser cross-compatibility checks."
    ],
    availability: "2 Developers Ready",
    rate: "$35 - $48 / hour",
    experience: "Mid to Senior (3 - 6+ Years)"
  },
  "nodejs-developer": {
    title: "Hire Vetted Node.js Backend Engineers",
    heading: "API Architectures & Scalable Server Ecosystems",
    description: "Architect secure, highly reliable backend endpoints, database infrastructures, and real-time sockets using Express, Fastify, NestJS, and Node runtime environments.",
    skills: ["NodeJS", "ExpressJS", "TypeScript", "MongoDB", "PostgreSQL", "Redis Caching", "Docker Containerization", "WebSocket Servers"],
    tasks: [
      "Design secure RESTful and GraphQL API structures.",
      "Integrate database collections with indexing optimizations.",
      "Implement JWT authentication systems and role-based client controls.",
      "Build real-time event-driven chat and notification dispatch systems."
    ],
    availability: "3 Developers Ready",
    rate: "$40 - $55 / hour",
    experience: "Senior Engineers (4 - 8 Years)"
  },
  "mobile-developer": {
    title: "Hire Vetted Android & iOS App Developers",
    heading: "Cross-Platform & Native Mobile Engineering",
    description: "Launch premium native Android apps or cross-platform Flutter/React Native software featuring fluid animations, offline sync, and deep device hardware access.",
    skills: ["Kotlin", "Jetpack Compose", "Flutter/Dart", "React Native", "Swift/SwiftUI", "CoreData/Room", "Firebase Auth/Push Notifications"],
    tasks: [
      "Create fluid mobile views with smooth frame transitions.",
      "Configure offline-first local database cache storage rules.",
      "Integrate biometrics, camera APIs, and background services.",
      "Package, build, and publish apps to Google Play Store and Apple App Store."
    ],
    availability: "1 Developer Ready",
    rate: "$38 - $50 / hour",
    experience: "Senior App Engineers (5+ Years)"
  },
  "devops-engineer": {
    title: "Hire Vetted Cloud DevOps Engineers",
    heading: "CI/CD Automations, Kubernetes, & AWS Infrastructure",
    description: "Automate app deployment cycles, monitor server health, and secure network firewalls using Docker, GitHub Actions, AWS, and modern cloud orchestrations.",
    skills: ["AWS Cloud", "Docker & Kubernetes", "GitHub Actions CI/CD", "Terraform IaC", "Nginx Load Balancing", "Prometheus & Grafana Monitor"],
    tasks: [
      "Configure zero-downtime rolling update deployment pipelines.",
      "Provision secure cloud VPC subnets and security gateways.",
      "Implement automatic horizontal scaling clusters.",
      "Audit container security patches and set up daily database backups."
    ],
    availability: "2 Engineers Ready",
    rate: "$45 - $60 / hour",
    experience: "DevOps Specialists (4 - 7 Years)"
  }
};

export default function RoleLandingPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Look up role based on route param
  const roleData = rolesDataset[slug];

  if (!roleData) {
    return (
      <div className="min-h-screen w-full bg-midnight text-white flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-fuchsia mb-4 animate-bounce" />
        <h2 className="text-3xl font-black mb-4">Specialization Profile Not Found</h2>
        <p className="text-neutral-400 mb-8 max-w-md">
          We offer React, Node.js, Mobile App, and Cloud DevOps specialists. Try navigating to one of those profiles.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-gradient-to-r from-aqua to-mint text-black font-bold text-sm rounded-2xl cursor-pointer"
        >
          Return to Agency Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-midnight overflow-x-hidden">
      {/* 3D Wave shader background */}
      <WavesBackground
        linesGradient={["#00f5d4", "#10b981", "#06b6d4"]}
        animationSpeed={1.2}
      />

      <Navbar />

      <main className="relative z-10 w-full pt-32 pb-24 px-6 md:px-12 max-w-[1100px] mx-auto flex flex-col gap-12">
        {/* Back Navigation */}
        <a
          href="/#about"
          className="self-start flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Grid</span>
        </a>

        {/* Hero Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center border-b border-white/5 pb-12">
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-aqua to-fuchsia uppercase tracking-widest">
              Available Vetted Talent
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {roleData.title}
            </h1>
            <h3 className="text-lg md:text-xl text-neutral-300 font-medium font-serif italic">
              {roleData.heading}
            </h3>
            <p className="subtext text-neutral-400 leading-relaxed max-w-2xl">
              {roleData.description}
            </p>
          </div>

          {/* Quick Roster Status Panel */}
          <div className="p-6 bg-[#0b1c15] border border-white/5 rounded-3xl flex flex-col gap-4 shadow-xl">
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <Users className="w-5 h-5 text-aqua" />
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Availability Status</span>
                <span className="text-sm font-bold text-white">{roleData.availability}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <DollarSign className="w-5 h-5 text-mint" />
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Hourly Billing Tier</span>
                <span className="text-sm font-bold text-white">{roleData.rate}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-fuchsia" />
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Average Experience</span>
                <span className="text-sm font-bold text-white">{roleData.experience}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Core Proficiencies */}
          <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col gap-6">
            <h4 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Code className="w-5 h-5 text-aqua" /> Core Stack Proficiencies
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {roleData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3.5 py-1.5 bg-white/5 border border-white/5 rounded-full text-xs font-semibold text-neutral-300 hover:bg-white/10 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Typical Deliverables */}
          <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col gap-6">
            <h4 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Settings className="w-5 h-5 text-fuchsia" /> Common Project Deliverables
            </h4>
            <ul className="flex flex-col gap-4">
              {roleData.tasks.map((task, index) => (
                <li key={index} className="flex gap-3 text-xs md:text-sm text-neutral-400 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-mint mt-2 shrink-0" />
                  <span className="leading-relaxed">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lead Capture Hook */}
        <div className="p-8 md:p-12 bg-gradient-to-r from-storm to-indigo border border-white/5 rounded-[2.5rem] text-center space-y-6 flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-black text-white max-w-lg">
            Ready to secure developer resources for your build cycle?
          </h3>
          <p className="subtext text-neutral-400 max-w-xl text-xs md:text-sm">
            Book an orientation call with one of our co-founders to review credentials, review portfolio samples, and discuss immediate onboarding availability.
          </p>
          <a
            href="/#contact"
            className="px-8 py-4 bg-gradient-to-r from-aqua to-mint text-black font-extrabold text-xs md:text-sm rounded-full hover:scale-105 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-aqua/10 uppercase tracking-wider"
          >
            Schedule Consultation Call
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
