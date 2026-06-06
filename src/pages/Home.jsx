import React from "react";
import Navbar from "../components/Navbar";
import WavesBackground from "../components/WavesBackground";
import Hero from "../components/Hero";
import AboutGrid from "../components/AboutGrid";
import Services from "../components/Services";
import Projects from "../components/Projects";
import TestimonialsMarquee from "../components/TestimonialsMarquee";
import ProcessTimeline from "../components/ProcessTimeline";
import Pricing from "../components/Pricing";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import WhyUs from "../components/WhyUs";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-midnight overflow-x-hidden">
      {/* 3D Wave Interactive Shader Background */}
      <WavesBackground 
        linesGradient={["#3b82f6", "#60a5fa", "#4f46e5"]} // Slate/Blue palette
        animationSpeed={1.5}
      />
      
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 w-full">
        {/* Hero Section */}
        <Hero />

        {/* About Info Grid */}
        <AboutGrid />

        {/* 3D Services Stack */}
        <Services />

        {/* Why Choose Us Stats */}
        <WhyUs />

        {/* Infinite Work/Projects Carousel */}
        <Projects />

        {/* Triple-Column Testimonials Marquee */}
        <TestimonialsMarquee />

        {/* Drag/Sweep Progress Timeline */}
        <ProcessTimeline />

        {/* Packages & Pricing Tiers */}
        <Pricing />

        {/* Consultation Form */}
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

