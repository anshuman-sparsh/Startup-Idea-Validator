"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Lightbulb } from "lucide-react";

interface LandingHeroProps {
  onAnalyze: (idea: string) => void;
  isLoading: boolean;
}

const exampleIdeas = [
  {
    title: "Uber for Pets",
    description: "An on-demand mobile app connecting pet owners with background-checked handlers for veterinary, daycare, and grooming transport.",
  },
  {
    title: "AI Code Reviewer",
    description: "A developer tool that hooks into GitHub PRs to automatically audit security vulnerabilities, performance bottlenecks, and logical bugs in real-time.",
  },
  {
    title: "Eco Carbon Tracker",
    description: "A B2B SaaS platform for logistics firms that aggregates hardware telemetry to measure, report, and automatically offset scope-3 carbon emissions.",
  },
  {
    title: "Decentralized Office Space",
    description: "An on-demand rental platform that allows companies to monetize empty office desks or meeting rooms for remote workers during off-hours.",
  },
];

export default function LandingHero({ onAnalyze, isLoading }: LandingHeroProps) {
  const [idea, setIdea] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim().length < 15) {
      setError("Please describe your idea in a bit more detail (at least 15 characters).");
      return;
    }
    setError("");
    onAnalyze(idea);
  };

  const handleExampleClick = (desc: string) => {
    setIdea(desc);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-20 px-4 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-300 uppercase tracking-widest"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Next Generation VC Analysis</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] max-w-3xl mx-auto"
        >
          Validate Your Startup Idea <span className="text-gradient-purple-blue">Before Building It</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
        >
          Submit your business concept in plain English. Our AI analyzer breaks down viability index, market sizing, target ICPs, monetization channels, SWOT, and MVP milestones.
        </motion.p>
      </div>

      {/* Idea Input Area */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onSubmit={handleSubmit}
        className="w-full"
      >
        <div className="glass-panel-glow p-3.5 rounded-2xl border border-white/10 bg-black/40 shadow-2xl relative">
          <textarea
            value={idea}
            onChange={(e) => {
              setIdea(e.target.value);
              if (error) setError("");
            }}
            placeholder="Describe your startup idea in detail... (e.g. A marketplace connecting verified local bakers with customers seeking custom cakes, with real-time tracking and delivery partners...)"
            rows={5}
            maxLength={1000}
            className="w-full bg-transparent border-0 resize-none p-3 text-slate-100 placeholder-slate-500 text-sm md:text-base focus:ring-0 focus:outline-none focus:border-0"
            disabled={isLoading}
          />

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-3 border-t border-white/5 mt-2">
            <span className="text-xs text-slate-500 self-center">
              {idea.length} / 1000 characters
            </span>
            
            <button
              type="submit"
              disabled={isLoading || idea.trim().length === 0}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-gradient-purple-blue hover:opacity-95 disabled:hover:opacity-100 disabled:opacity-40 text-white text-sm transition-all cursor-pointer shadow-lg shadow-purple-500/10"
            >
              <span>Analyze Idea</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-xs font-semibold mt-2.5 pl-2"
          >
            {error}
          </motion.p>
        )}
      </motion.form>

      {/* Example Startup Ideas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-4 pt-4"
      >
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-purple-400" />
          <span>Need Inspiration? Try one of these templates</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exampleIdeas.map((example, index) => (
            <div
              key={index}
              onClick={() => handleExampleClick(example.description)}
              className="glass-panel p-5 rounded-xl border border-white/5 hover:border-purple-500/20 bg-slate-900/10 hover:bg-purple-950/5 transition-all duration-300 cursor-pointer space-y-2 group"
            >
              <h3 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
                {example.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {example.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
