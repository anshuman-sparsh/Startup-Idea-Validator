"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle, HelpCircle, AlertTriangle, XOctagon } from "lucide-react";

interface FinalVerdictProps {
  verdict: string;
  reasoning: string;
}

export default function FinalVerdict({ verdict, reasoning }: FinalVerdictProps) {
  // Helper to parse verdict characteristics
  const getVerdictDetails = (verdictText: string) => {
    const text = verdictText.trim().toLowerCase();
    
    if (text.includes("strong opportunity")) {
      return {
        title: "Strong Opportunity",
        icon: CheckCircle,
        color: "from-green-500/20 via-emerald-500/10 to-transparent border-green-500/30 text-green-400",
        badge: "bg-green-500/10 text-green-400 border-green-500/20",
        glow: "rgba(34, 197, 94, 0.15)",
        advice: "This concept displays strong validation markers. The market size, timing, and feasibility line up. We recommend building a rapid MVP and getting it in front of users immediately.",
      };
    }
    if (text.includes("worth testing")) {
      return {
        title: "Worth Testing",
        icon: HelpCircle,
        color: "from-blue-500/20 via-indigo-500/10 to-transparent border-blue-500/30 text-blue-400",
        badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        glow: "rgba(59, 130, 246, 0.15)",
        advice: "There is clear utility in this concept, but some assumptions (monetization or user acquisition) need vetting. Create landing page tests or conduct interviews to validate demand before writing code.",
      };
    }
    if (text.includes("high risk")) {
      return {
        title: "High Risk",
        icon: AlertTriangle,
        color: "from-yellow-500/20 via-amber-500/10 to-transparent border-yellow-500/30 text-yellow-400",
        badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        glow: "rgba(234, 179, 8, 0.15)",
        advice: "This concept has fundamental bottlenecks: thin margins, long sales cycles, or high customer acquisition costs. Proceed with caution and resolve the primary structural risk first.",
      };
    }
    if (text.includes("not recommended")) {
      return {
        title: "Not Recommended",
        icon: XOctagon,
        color: "from-red-500/20 via-rose-500/10 to-transparent border-red-500/30 text-red-400",
        badge: "bg-red-500/10 text-red-400 border-red-500/20",
        glow: "rgba(239, 68, 68, 0.15)",
        advice: "The analysis indicates highly unfavorable conditions: saturated landscape, low user willingness to pay, or major adoption friction. We recommend going back to the drawing board or pivoting.",
      };
    }
    // Fallback for general matches
    return {
      title: verdict,
      icon: Award,
      color: "from-purple-500/20 via-indigo-500/10 to-transparent border-purple-500/30 text-purple-400",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      glow: "rgba(168, 85, 247, 0.15)",
      advice: "Review the strengths, weaknesses, and SWOT details to design targeted verification tests to validate critical assumptions.",
    };
  };

  const details = getVerdictDetails(verdict);
  const IconComponent = details.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="relative"
    >
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 -z-10 opacity-20 pointer-events-none rounded-2xl" 
        style={{
          background: `radial-gradient(circle at center, ${details.glow} 0%, transparent 80%)`
        }}
      />

      <div className={`glass-panel-glow p-8 rounded-2xl border bg-gradient-to-b ${details.color.split(" ")[0]} ${details.color.split(" ")[1]} ${details.color.split(" ")[2]} space-y-6`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Strategic Evaluation
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Final Verdict
            </h2>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold uppercase tracking-wider self-start sm:self-center ${details.badge}`}>
            <IconComponent className="w-5 h-5 shrink-0" />
            <span>{details.title}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Analyst Thesis
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              {reasoning}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Next Steps & Strategic Advice
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              {details.advice}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
