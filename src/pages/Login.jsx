import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Key, Mail, AlertCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import WavesBackground from "../components/WavesBackground";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/portal");
    } catch (err) {
      setError("Invalid credentials. Try the quick-login demo buttons below.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (demoRole) => {
    setError("");
    setLoading(true);
    try {
      if (demoRole === "agency") {
        await login("nimesh@agency.com", "admin123");
      } else {
        await login("client@abctech.com", "client123");
      }
      navigate("/portal");
    } catch (err) {
      setError("Demo login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-midnight flex items-center justify-center p-4 overflow-hidden">
      {/* Background Interactive Shader */}
      <WavesBackground
        linesGradient={["#00f5d4", "#10b981"]}
        animationSpeed={1.0}
        interactive={true}
      />

      {/* Back to Home Button */}
      <a
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </a>

      {/* Glassmorphic Login Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white/5 border border-white/5 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl flex flex-col items-center"
      >
        {/* Sphere Glow behind the card */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-mint/10 rounded-full blur-[50px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-aqua/10 rounded-full blur-[50px] pointer-events-none" />

        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2 justify-center">
            <span className="bg-gradient-to-r from-aqua to-fuchsia bg-clip-text text-transparent">Diginurture</span>
            <span className="text-xs uppercase px-2 py-0.5 bg-white/10 rounded-full text-neutral-300 font-sans font-bold">OS</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-2">
            Access your secure client workspace & agency dashboard
          </p>
        </div>

        {error && (
          <div className="w-full mb-4 px-4 py-3 bg-red-950/40 border border-red-500/20 text-red-300 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label className="field-label" htmlFor="email">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-aqua/50 focus:ring-1 focus:ring-aqua/30 transition-all placeholder:text-neutral-600"
              />
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="password">Password</label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-aqua/50 focus:ring-1 focus:ring-aqua/30 transition-all placeholder:text-neutral-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-gradient-to-r from-aqua to-mint text-black font-bold text-sm rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-aqua/10 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In Workspace</span>
                <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="w-full flex items-center gap-3 my-6">
          <div className="h-[1px] bg-white/10 flex-grow" />
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">Quick Demo Accounts</span>
          <div className="h-[1px] bg-white/10 flex-grow" />
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleQuickLogin("agency")}
            className="flex-1 py-3 px-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-semibold text-neutral-200 hover:bg-aqua hover:text-black hover:border-transparent transition-all cursor-pointer flex flex-col items-center justify-center gap-1 group"
          >
            <span className="font-bold group-hover:text-black">Agency Admin</span>
            <span className="text-[10px] text-neutral-500 group-hover:text-black/70">nimesh@agency.com</span>
          </button>
          
          <button
            onClick={() => handleQuickLogin("client")}
            className="flex-1 py-3 px-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-semibold text-neutral-200 hover:bg-mint hover:text-black hover:border-transparent transition-all cursor-pointer flex flex-col items-center justify-center gap-1 group"
          >
            <span className="font-bold group-hover:text-black">Client Demo</span>
            <span className="text-[10px] text-neutral-500 group-hover:text-black/70">client@abctech.com</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
