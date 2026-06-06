"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Cpu, BarChart3, ShieldAlert } from "lucide-react";

const loadingSteps = [
  { text: "Scanning global market size and addressable TAM...", icon: BarChart3 },
  { text: "Mapping major competitors and identifying vulnerabilities...", icon: Brain },
  { text: "Running SWOT analysis quadrants...", icon: Sparkles },
  { text: "Assessing technical feasibility and adoption friction...", icon: Cpu },
  { text: "Synthesizing monetization channels & pricing strategy...", icon: Brain },
  { text: "Drafting Phase 1, 2, and 3 product roadmap...", icon: Cpu },
  { text: "Calculating overall viability index score...", icon: ShieldAlert },
  { text: "Finalizing VC investor thesis and verdict...", icon: Sparkles },
];

export default function LoadingState() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % loadingSteps.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = loadingSteps[stepIndex].icon;

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto py-12">
      {/* Animated Brain Scanner */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-blue-500/20 animate-pulse" />
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 border border-white/10 shadow-lg shadow-purple-500/30">
            <CurrentIcon className="w-6 h-6 text-white animate-pulse" />
          </div>
        </div>

        <div className="space-y-1.5 h-12 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-semibold tracking-wide text-gradient-purple-blue"
            >
              {loadingSteps[stepIndex].text}
            </motion.p>
          </AnimatePresence>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
            Startup Analyst AI is working
          </span>
        </div>
      </div>

      {/* Dashboard Skeleton Screen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40 select-none pointer-events-none">
        
        {/* Skeleton Viability Score */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/10 flex flex-col items-center justify-center min-h-[300px] animate-pulse">
          <div className="w-24 h-4 bg-slate-800 rounded mb-6" />
          <div className="w-32 h-32 rounded-full border-8 border-slate-800 flex items-center justify-center">
            <div className="w-12 h-8 bg-slate-800 rounded" />
          </div>
          <div className="w-full h-3 bg-slate-800 rounded mt-6" />
          <div className="w-2/3 h-3 bg-slate-800 rounded mt-2" />
        </div>

        {/* Skeleton Market Opportunity */}
        <div className="col-span-2 space-y-6 animate-pulse">
          <div className="w-48 h-6 bg-slate-800 rounded" />
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-xl border border-white/5 bg-slate-900/10 h-32" />
            <div className="glass-panel p-5 rounded-xl border border-white/5 bg-slate-900/10 h-32" />
            <div className="glass-panel p-5 rounded-xl border border-white/5 bg-slate-900/10 h-32" />
          </div>
          <div className="glass-panel p-5 rounded-xl border border-white/5 bg-slate-900/10 h-24" />
        </div>

        {/* Skeleton Target Audience */}
        <div className="space-y-4 animate-pulse">
          <div className="w-36 h-6 bg-slate-800 rounded" />
          <div className="glass-panel p-5 rounded-xl border border-white/5 bg-slate-900/10 h-32" />
          <div className="glass-panel p-5 rounded-xl border border-white/5 bg-slate-900/10 h-32" />
        </div>

        {/* Skeleton Competitor landscape */}
        <div className="col-span-2 space-y-4 animate-pulse">
          <div className="w-44 h-6 bg-slate-800 rounded" />
          <div className="glass-panel p-5 rounded-xl border border-white/5 bg-slate-900/10 h-52" />
        </div>

        {/* Skeleton Revenue Models */}
        <div className="space-y-4 animate-pulse">
          <div className="w-40 h-6 bg-slate-800 rounded" />
          <div className="glass-panel p-5 rounded-xl border border-white/5 bg-slate-900/10 h-44" />
        </div>

        {/* Skeleton Risk Assessment */}
        <div className="col-span-2 space-y-4 animate-pulse">
          <div className="w-44 h-6 bg-slate-800 rounded" />
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-xl border border-white/5 bg-slate-900/10 h-32" />
            <div className="glass-panel p-5 rounded-xl border border-white/5 bg-slate-900/10 h-32" />
            <div className="glass-panel p-5 rounded-xl border border-white/5 bg-slate-900/10 h-32" />
          </div>
        </div>

      </div>
    </div>
  );
}
