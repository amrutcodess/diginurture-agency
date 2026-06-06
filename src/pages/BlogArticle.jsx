import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { blogArticles } from "./BlogList";
import WavesBackground from "../components/WavesBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find corresponding article
  const article = blogArticles.find((art) => art.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen w-full bg-midnight text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-black mb-4">Article Not Found</h2>
        <p className="text-neutral-400 mb-8">The requested publication doesn't exist or has been moved.</p>
        <button
          onClick={() => navigate("/blog")}
          className="px-6 py-3 bg-aqua text-black font-bold text-sm rounded-2xl cursor-pointer"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-midnight overflow-x-hidden">
      {/* Wave background shader */}
      <WavesBackground
        linesGradient={["#00f5d4", "#10b981"]}
        animationSpeed={1.0}
      />

      <Navbar />

      <main className="relative z-10 w-full pt-32 pb-24 px-6 md:px-12 max-w-[800px] mx-auto flex flex-col gap-8">
        {/* Back navigation */}
        <button
          onClick={() => navigate("/blog")}
          className="self-start flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Insights</span>
        </button>

        {/* Article Header */}
        <div className="flex flex-col gap-4">
          <span className="self-start px-2.5 py-1 bg-white/5 rounded-md text-[10px] font-extrabold uppercase text-aqua tracking-widest border border-white/10">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight font-serif">
            {article.title}
          </h1>
          <p className="text-sm md:text-base text-neutral-400 font-medium leading-relaxed">
            {article.summary}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-b border-white/5 py-4 mt-2 text-xs text-neutral-400 font-semibold uppercase tracking-wider">
            {/* Author Profile */}
            <div className="flex items-center gap-2.5">
              <img
                src={article.authorImage}
                alt={article.author}
                className="w-8 h-8 rounded-full object-cover border border-white/10"
              />
              <span className="text-white font-bold">{article.author}</span>
            </div>

            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-aqua" />
              {article.date}
            </span>

            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-aqua" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden bg-storm border border-white/5">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <article
          className="prose prose-invert max-w-none text-neutral-300 leading-relaxed text-sm md:text-base flex flex-col gap-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </main>

      <Footer />
    </div>
  );
}
