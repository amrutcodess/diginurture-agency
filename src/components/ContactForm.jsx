import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import { Mail, Phone, Send, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [alert, setAlert] = useState(null); // { type: 'success' | 'error', text: '' }

  // Listen for plan selection from URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    if (plan) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi Diginurture team, I am interested in exploring the ${plan} package. Let's discuss!`,
      }));
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { name, email, mobile, message } = formData;
    if (!name.trim() || name.length < 2) {
      setAlert({ type: "error", text: "Please enter a valid name (at least 2 characters)." });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAlert({ type: "error", text: "Please enter a valid email address." });
      return false;
    }
    if (!mobile.trim() || mobile.length < 8) {
      setAlert({ type: "error", text: "Please enter a valid phone number (at least 8 digits)." });
      return false;
    }
    if (!message.trim() || message.length < 10) {
      setAlert({ type: "error", text: "Please enter a message (at least 10 characters)." });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);
    setAlert(null);

    try {
      const today = new Date();
      const date = today.toLocaleDateString();
      const time = today.toLocaleTimeString();

      // EmailJS sending using pre-configured Stacktribe service credentials
      await emailjs.send(
        "service_jxydfyr",
        "template_rte6cqq",
        {
          from_user: formData.name,
          to_user: "Diginurture Agency",
          from_email: formData.email,
          to_email: "hello@diginurture.agency",
          mobile: formData.mobile,
          message: formData.message,
          submission_date: date,
          submission_time: time,
        },
        "vRvDewicKssrvO1rv"
      );

      // Trigger Confetti!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#10b981", "#06b6d4", "#a3e635"],
      });

      setAlert({
        type: "success",
        text: "Your message has been sent successfully! We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setAlert({
        type: "error",
        text: "Failed to send message. Please try again later or email hello@diginurture.agency directly.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative flex items-center c-space section-spacing" id="contact">
      {/* Background Particles/Dot mesh */}
      <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Alert Banner */}
      {alert && (
        <div className="fixed top-28 right-6 z-50 max-w-sm animate-float">
          <div
            className={`p-4 rounded-2xl flex items-start gap-3 border shadow-2xl backdrop-blur-xl ${
              alert.type === "success"
                ? "bg-[#0b1c15] border-[#10b981] text-[#10b981]"
                : "bg-red-950/80 border-red-500/30 text-red-400"
            }`}
          >
            {alert.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-xs font-semibold leading-relaxed">{alert.text}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center w-full max-w-lg p-8 mx-auto border border-white/5 rounded-[2.5rem] bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden z-10 transition-all duration-500 hover:border-white/10 hover:bg-white/10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-aqua via-royal to-fuchsia" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-aqua/10 rounded-full blur-[70px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-fuchsia/10 rounded-full blur-[70px] pointer-events-none" />

        <div className="flex flex-col items-center w-full gap-3 mb-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Get Free Consultation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aqua to-fuchsia">
              via Discovery Call
            </span>
          </h2>
          <p className="font-medium text-xs text-neutral-400 mt-2">
            Have a project in mind or need technical guidance? Let's discuss your vision and see how we can help.
          </p>
        </div>

        <form className="w-full" onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              What should we call you? *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-500 focus:outline-none focus:border-aqua/50 focus:ring-1 focus:ring-aqua/50 transition-all duration-300"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="field-label">
              Your email address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-500 focus:outline-none focus:border-aqua/50 focus:ring-1 focus:ring-aqua/50 transition-all duration-300"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="mobile" className="field-label">
              Your mobile number *
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-500 focus:outline-none focus:border-aqua/50 focus:ring-1 focus:ring-aqua/50 transition-all duration-300"
              placeholder="e.g. +91 9999999999"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="field-label">
              What's on your mind? *
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-500 focus:outline-none focus:border-aqua/50 focus:ring-1 focus:ring-aqua/50 transition-all duration-300"
              placeholder="e.g. I want to build a cross-platform mobile app / We need a scalable backend / Looking for a complete UI/UX revamp..."
              value={formData.message}
              onChange={handleChange}
              required
              maxLength={500}
            />
            <div className="text-xs text-neutral-500 mt-1 text-right">
              {formData.message.length}/500 characters
            </div>
          </div>

          <button
            className={`w-full px-6 py-4 text-black font-black text-lg text-center rounded-xl cursor-pointer transition-all duration-300 shadow-lg mt-4 flex items-center justify-center gap-2 ${
              isSending
                ? "bg-white/10 cursor-not-allowed text-neutral-400"
                : "bg-gradient-to-r from-aqua to-fuchsia hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5"
            }`}
            type="submit"
            disabled={isSending}
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Book Discovery Call</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-[10px] text-neutral-500">
            Prefer email? Reach us directly at <br />
            <a
              href="mailto:hello@diginurture.agency"
              className="text-mint hover:text-white transition-colors underline"
            >
              hello@diginurture.agency
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
