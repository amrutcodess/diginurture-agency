import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Portal from "./pages/Portal";
import TestimonialsPage from "./pages/TestimonialsPage";
import BlogList from "./pages/BlogList";
import BlogArticle from "./pages/BlogArticle";
import RoleLandingPage from "./pages/RoleLandingPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main homepage */}
          <Route path="/" element={<Home />} />
          
          {/* Client/Agency Workspace OS Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Client/Agency OS Dashboard Portal */}
          <Route path="/portal" element={<Portal />} />
          
          {/* Static detailed client testimonials grid */}
          <Route path="/testimonials" element={<TestimonialsPage />} />
          
          {/* Blog publication listing directory */}
          <Route path="/blog" element={<BlogList />} />
          
          {/* Detailed blog article rendering */}
          <Route path="/blog/:slug" element={<BlogArticle />} />
          
          {/* SEO Developer role landing pages */}
          <Route path="/:slug" element={<RoleLandingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
