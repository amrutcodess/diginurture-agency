import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Folder,
  Users,
  CheckCircle,
  HelpCircle,
  Clock,
  Plus,
  Send,
  UserCheck,
  CreditCard,
  Layers,
  ChevronRight,
  TrendingUp,
  FileText
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import confetti from "canvas-confetti";

export default function Portal() {
  const { currentUser, logout, isClient, isAgency } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Safeguard: Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Local state for interactive demo widgets
  const [clientTickets, setClientTickets] = useState([
    { id: 1, title: "Add OAuth sign-in integration", status: "In Progress", date: "June 4, 2026" },
    { id: 2, title: "Optimize image compression pipeline", status: "Completed", date: "June 2, 2026" },
    { id: 3, title: "Configure auto-scaling server triggers", status: "Under Review", date: "June 5, 2026" }
  ]);
  const [newTicketTitle, setNewTicketTitle] = useState("");

  const [agencyDevs, setAgencyDevs] = useState([
    { name: "Nimesh Ranjan", role: "Co-Founder / Android Engineer", allocated: "ABC Tech (80%)" },
    { name: "Aditya Jaif", role: "Co-Founder / Backend Architect", allocated: "Fitness CRM (100%)" },
    { name: "Ajay Singh", role: "Co-Founder / Product Marketing", allocated: "Sutra Vedic (60%)" },
    { name: "Abhinav Kumar Yadav", role: "Co-Founder / Cloud DevOps", allocated: "ABC Tech (50%), Rove (50%)" }
  ]);

  const handleAddTicket = (e) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;
    const newTicket = {
      id: Date.now(),
      title: newTicketTitle,
      status: "Under Review",
      date: "Today"
    };
    setClientTickets([newTicket, ...clientTickets]);
    setNewTicketTitle("");
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#10b981", "#00f5d4", "#06b6d4"]
    });
  };

  const handleDevAllocation = (index, newAllocation) => {
    const updated = [...agencyDevs];
    updated[index].allocated = newAllocation;
    setAgencyDevs(updated);
    confetti({
      particleCount: 30,
      colors: ["#a3e635", "#10b981"]
    });
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen w-full bg-midnight text-white flex flex-col md:flex-row">
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-navy border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo container */}
          <div className="p-6 border-b border-white/5">
            <a href="/" className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              <span className="bg-gradient-to-r from-aqua to-fuchsia bg-clip-text text-transparent">Diginurture</span>
              <span className="text-[10px] uppercase px-1.5 py-0.5 bg-white/10 rounded-full font-sans font-bold text-neutral-300">OS</span>
            </a>
          </div>

          {/* User information panel */}
          <div className="p-6 bg-white/[0.02] border-b border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aqua to-fuchsia flex items-center justify-center font-bold text-black uppercase shadow-inner">
              {currentUser.name[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{currentUser.name}</p>
              <span className="text-[10px] text-aqua uppercase tracking-widest font-extrabold">
                {currentUser.role === "agency" ? "Co-Founder / Admin" : "Client Partner"}
              </span>
            </div>
          </div>

          {/* Main Navigation Links */}
          <nav className="p-4 flex flex-col gap-1.5">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "overview" ? "bg-aqua/10 text-white border border-aqua/20" : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Workspace Overview</span>
            </button>

            {isClient && (
              <>
                <button
                  onClick={() => setActiveTab("tickets")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === "tickets" ? "bg-aqua/10 text-white border border-aqua/20" : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Tickets & Requests</span>
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === "billing" ? "bg-aqua/10 text-white border border-aqua/20" : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Invoices & Billing</span>
                </button>
              </>
            )}

            {isAgency && (
              <>
                <button
                  onClick={() => setActiveTab("devs")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === "devs" ? "bg-aqua/10 text-white border border-aqua/20" : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Developer Allocations</span>
                </button>
                <button
                  onClick={() => setActiveTab("clientRequests")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === "clientRequests" ? "bg-aqua/10 text-white border border-aqua/20" : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Incoming Tickets</span>
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Logout button at bottom */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-red-400 hover:bg-red-950/20 border border-transparent rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Workspace</span>
          </button>
        </div>
      </aside>

      {/* Main dashboard content container */}
      <main className="flex-1 p-6 md:p-10 max-w-[1400px] mx-auto w-full overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* ======================================================== */}
          {/* CLIENT DASHBOARD VIEWS                                   */}
          {/* ======================================================== */}
          {isClient && (
            <motion.div
              key="client-portal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8"
            >
              {/* Tab 1: Workspace Overview */}
              {activeTab === "overview" && (
                <>
                  {/* Dashboard header stats */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-3xl font-black text-white">ABC Tech Workspace</h2>
                      <p className="text-sm text-neutral-400 mt-1">Real-time status of your active application engineering cycle</p>
                    </div>
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2 text-xs font-semibold text-neutral-300">
                      <Clock className="w-4 h-4 text-aqua" />
                      <span>Sprint Cycle: #12 (Ends June 12, 2026)</span>
                    </div>
                  </div>

                  {/* Top Stats Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-4">
                      <div className="p-3 bg-aqua/10 rounded-2xl text-aqua shrink-0">
                        <Folder className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Active Projects</p>
                        <h3 className="text-2xl font-black text-white mt-1">1 Pipeline</h3>
                      </div>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-4">
                      <div className="p-3 bg-mint/10 rounded-2xl text-mint shrink-0">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Dedicated Devs</p>
                        <h3 className="text-2xl font-black text-white mt-1">2 Vetted FTEs</h3>
                      </div>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-4">
                      <div className="p-3 bg-fuchsia/10 rounded-2xl text-fuchsia shrink-0">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Sprint Progress</p>
                        <h3 className="text-2xl font-black text-white mt-1">72% Completed</h3>
                      </div>
                    </div>
                  </div>

                  {/* Active Project Details & Roster Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Active Project Progress */}
                    <div className="lg:col-span-2 p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col gap-6">
                      <h4 className="text-lg font-bold text-white border-b border-white/5 pb-4">Active Project: ABC Tech Automation Pipeline</h4>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-semibold text-neutral-300">Overall Milestone: Beta Launch</span>
                          <span className="font-bold text-aqua">72%</span>
                        </div>
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-aqua to-mint rounded-full" style={{ width: "72%" }} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 mt-2">
                        <p className="text-sm font-semibold text-white">Latest Activity Log</p>
                        <div className="flex flex-col gap-3">
                          <div className="flex gap-3 text-xs items-start">
                            <CheckCircle className="w-4 h-4 text-aqua mt-0.5 shrink-0" />
                            <div>
                              <p className="font-bold text-neutral-200">Deployed staging build v1.2.0-beta</p>
                              <span className="text-[10px] text-neutral-500">June 5, 2026 by Abhinav Kumar Yadav</span>
                            </div>
                          </div>
                          <div className="flex gap-3 text-xs items-start">
                            <CheckCircle className="w-4 h-4 text-aqua mt-0.5 shrink-0" />
                            <div>
                              <p className="font-bold text-neutral-200">Finished integration testing of MongoDB aggregation triggers</p>
                              <span className="text-[10px] text-neutral-500">June 3, 2026 by Aditya Jaif</span>
                            </div>
                          </div>
                          <div className="flex gap-3 text-xs items-start">
                            <Clock className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                            <div>
                              <p className="font-bold text-neutral-400">OAuth verification checks on Google APIs</p>
                              <span className="text-[10px] text-neutral-500">Pending review</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Vetted Dev Roster */}
                    <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col gap-6">
                      <h4 className="text-lg font-bold text-white border-b border-white/5 pb-4">Assigned Team Roster</h4>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-3">
                            <img src="/assets/team/Nimo.jpg" className="w-9 h-9 rounded-full object-cover border border-aqua/30" alt="Nimesh" />
                            <div>
                              <p className="text-xs font-bold text-white">Nimesh Ranjan</p>
                              <span className="text-[10px] text-neutral-400">Lead App Engineer</span>
                            </div>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 bg-aqua/10 text-aqua font-bold rounded-full">80% Alloc</span>
                        </div>

                        <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-3">
                            <img src="/assets/team/Abhi.jpg" className="w-9 h-9 rounded-full object-cover border border-fuchsia/30" alt="Abhinav" />
                            <div>
                              <p className="text-xs font-bold text-white">Abhinav Yadav</p>
                              <span className="text-[10px] text-neutral-400">Cloud DevOps</span>
                            </div>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 bg-fuchsia/10 text-fuchsia font-bold rounded-full">50% Alloc</span>
                        </div>
                      </div>
                      <div className="mt-auto pt-4 border-t border-white/5 text-center">
                        <p className="text-xs text-neutral-400">Need more developer resources? Contact your account manager.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Tab 2: Tickets & Requests */}
              {activeTab === "tickets" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Ticket Form */}
                  <div className="lg:col-span-1 p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-white">Submit Feature Request</h4>
                      <p className="text-xs text-neutral-400 mt-1">Describe a new feature or task for your engineering squad.</p>
                    </div>
                    <form onSubmit={handleAddTicket} className="flex flex-col gap-4">
                      <div>
                        <label className="field-label" htmlFor="req-title">Request Title</label>
                        <input
                          id="req-title"
                          type="text"
                          required
                          value={newTicketTitle}
                          onChange={(e) => setNewTicketTitle(e.target.value)}
                          placeholder="e.g. Integrate stripe checkouts"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-aqua/50 transition-all placeholder:text-neutral-600"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-aqua to-mint text-black font-bold text-xs rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Send Ticket</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>

                  {/* Tickets List */}
                  <div className="lg:col-span-2 p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col gap-6">
                    <h4 className="text-lg font-bold text-white border-b border-white/5 pb-4">Activity Tickets Log</h4>
                    <div className="flex flex-col gap-3">
                      {clientTickets.map((t) => (
                        <div key={t.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-aqua" />
                            <div>
                              <p className="text-sm font-semibold text-white">{t.title}</p>
                              <span className="text-[10px] text-neutral-500">Logged on {t.date}</span>
                            </div>
                          </div>
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            t.status === "Completed" ? "bg-green-500/10 text-green-400" : t.status === "In Progress" ? "bg-cyan-500/10 text-cyan-400" : "bg-yellow-500/10 text-yellow-400"
                          }`}>
                            {t.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Billing & Invoices */}
              {activeTab === "billing" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Subscription card */}
                  <div className="p-8 bg-gradient-to-br from-[#0c261e] to-[#071a14] border border-aqua/10 rounded-[2.5rem] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] px-2.5 py-1 bg-aqua/10 text-aqua font-bold rounded-full uppercase tracking-wider">Active Subscription</span>
                      <h4 className="text-3xl font-black text-white mt-6">Dev - Standard</h4>
                      <p className="text-sm text-neutral-400 mt-2">Dedicated vetted full-stack engineering team with agile sprint controls.</p>
                      
                      <div className="mt-8 flex flex-col gap-3 border-t border-white/5 pt-6 text-xs">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Cycle Cost:</span>
                          <span className="text-white font-bold">$3,499 / Month</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Next Payment Date:</span>
                          <span className="text-white font-bold">June 18, 2026</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Billing Account:</span>
                          <span className="text-white font-bold">ABC Tech LLC</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full mt-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Update Billing Info</span>
                    </button>
                  </div>

                  {/* Invoice list */}
                  <div className="lg:col-span-2 p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col gap-6">
                    <h4 className="text-lg font-bold text-white border-b border-white/5 pb-4">Invoice Ledger</h4>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-neutral-500" />
                          <div>
                            <p className="text-sm font-semibold text-white">Invoice #DG-2026-004</p>
                            <span className="text-[10px] text-neutral-500">Issued May 18, 2026</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-white">$3,499.00</span>
                          <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full font-bold">PAID</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-neutral-500" />
                          <div>
                            <p className="text-sm font-semibold text-white">Invoice #DG-2026-003</p>
                            <span className="text-[10px] text-neutral-500">Issued April 18, 2026</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-white">$3,499.00</span>
                          <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full font-bold">PAID</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* AGENCY DASHBOARD VIEWS                                   */}
          {/* ======================================================== */}
          {isAgency && (
            <motion.div
              key="agency-portal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8"
            >
              {/* Tab 1: Overview */}
              {activeTab === "overview" && (
                <>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-3xl font-black text-white">Agency Operations Dashboard</h2>
                      <p className="text-sm text-neutral-400 mt-1">Control active rosters, allocations, and client feedback pipelines.</p>
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-4">
                      <div className="p-3 bg-aqua/10 rounded-2xl text-aqua shrink-0">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Total Clients</p>
                        <h3 className="text-2xl font-black text-white mt-1">12 Partners</h3>
                      </div>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-4">
                      <div className="p-3 bg-mint/10 rounded-2xl text-mint shrink-0">
                        <Folder className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Active Sprints</p>
                        <h3 className="text-2xl font-black text-white mt-1">18 Pipelines</h3>
                      </div>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-4">
                      <div className="p-3 bg-fuchsia/10 rounded-2xl text-fuchsia shrink-0">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Roster Allocation</p>
                        <h3 className="text-2xl font-black text-white mt-1">94% Occupied</h3>
                      </div>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-4">
                      <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 shrink-0">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Monthly ARR</p>
                        <h3 className="text-2xl font-black text-white mt-1">$62,490 ARR</h3>
                      </div>
                    </div>
                  </div>

                  {/* Quick lists */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Active Workspaces */}
                    <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col gap-6">
                      <h4 className="text-lg font-bold text-white border-b border-white/5 pb-4">Core Partner Accounts</h4>
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div>
                            <p className="text-sm font-bold text-white">ABC Tech LLC</p>
                            <span className="text-xs text-neutral-400">Standard Dev Tier</span>
                          </div>
                          <span className="text-[10px] px-2.5 py-1 bg-green-500/15 text-green-400 rounded-full font-bold">ACTIVE SPRINT</span>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div>
                            <p className="text-sm font-bold text-white">Fitness CRM Platform</p>
                            <span className="text-xs text-neutral-400">Automated Enterprise Tier</span>
                          </div>
                          <span className="text-[10px] px-2.5 py-1 bg-green-500/15 text-green-400 rounded-full font-bold">ACTIVE SPRINT</span>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div>
                            <p className="text-sm font-bold text-white">Sutra Vedic E-commerce</p>
                            <span className="text-xs text-neutral-400">Maintenance Tier</span>
                          </div>
                          <span className="text-[10px] px-2.5 py-1 bg-yellow-500/15 text-yellow-400 rounded-full font-bold">ON HOLD</span>
                        </div>
                      </div>
                    </div>

                    {/* Developer Rosters summary */}
                    <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col gap-6">
                      <h4 className="text-lg font-bold text-white border-b border-white/5 pb-4">Team Availability Status</h4>
                      <div className="flex flex-col gap-3">
                        {agencyDevs.slice(0, 3).map((d, i) => (
                          <div key={i} className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-neutral-200">{d.name}</span>
                            <span className="text-neutral-400 truncate max-w-[180px]">{d.allocated}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setActiveTab("devs")}
                        className="w-full mt-auto py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-semibold text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Manage Developer Roster</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Tab 2: Developer Allocations */}
              {activeTab === "devs" && (
                <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-white">Co-Founder & Developer Allocations</h4>
                    <p className="text-xs text-neutral-400 mt-1">Re-allocate resource percentages for client workflows.</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="pb-3 text-neutral-400 font-semibold">Engineer</th>
                          <th className="pb-3 text-neutral-400 font-semibold">Specialization</th>
                          <th className="pb-3 text-neutral-400 font-semibold">Current Allocations</th>
                          <th className="pb-3 text-neutral-400 font-semibold text-right">Quick Settings</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {agencyDevs.map((dev, i) => (
                          <tr key={i}>
                            <td className="py-4 font-bold text-white">{dev.name}</td>
                            <td className="py-4 text-xs text-neutral-400">{dev.role}</td>
                            <td className="py-4 text-xs text-aqua">{dev.allocated}</td>
                            <td className="py-4 text-right flex justify-end gap-2">
                              <button
                                onClick={() => handleDevAllocation(i, "ABC Tech (100%)")}
                                className="px-2.5 py-1 bg-white/5 hover:bg-aqua hover:text-black border border-white/10 hover:border-transparent rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                              >
                                Allocate ABC Tech
                              </button>
                              <button
                                onClick={() => handleDevAllocation(i, "Bench / Free")}
                                className="px-2.5 py-1 bg-white/5 hover:bg-fuchsia hover:text-black border border-white/10 hover:border-transparent rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                              >
                                Release to Bench
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 3: Incoming Client Requests */}
              {activeTab === "clientRequests" && (
                <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col gap-6">
                  <h4 className="text-lg font-bold text-white border-b border-white/5 pb-4">Incoming Tickets Log</h4>
                  <div className="flex flex-col gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 bg-yellow-500/10 text-yellow-400 font-bold rounded-full">ABC TECH</span>
                          <span className="text-[10px] text-neutral-500">Submitted today</span>
                        </div>
                        <p className="text-sm font-bold text-white mt-1.5">Configure auto-scaling server triggers</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            confetti({ particleCount: 30, colors: ["#00f5d4"] });
                            alert("Approved ticket - Assigned to Aditya Jaif");
                          }}
                          className="px-3.5 py-1.5 bg-aqua text-black text-xs font-bold rounded-xl hover:brightness-110 transition-all cursor-pointer"
                        >
                          Approve & Assign
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 bg-yellow-500/10 text-yellow-400 font-bold rounded-full">ABC TECH</span>
                          <span className="text-[10px] text-neutral-500">Submitted June 4</span>
                        </div>
                        <p className="text-sm font-bold text-white mt-1.5">Add OAuth sign-in integration</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs text-neutral-500 font-semibold px-3 py-1 bg-white/5 rounded-xl border border-white/5">In Progress</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
