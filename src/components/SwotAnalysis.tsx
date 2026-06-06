"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, TrendingUp, AlertOctagon, HelpCircle } from "lucide-react";
import { Swot } from "@/lib/types";

interface SwotAnalysisProps {
  swot: Swot;
}

export default function SwotAnalysis({ swot }: SwotAnalysisProps) {
  const quadrants = [
    {
      title: "Strengths",
      icon: Shield,
      items: swot.strengths || [],
      color: "from-green-500/10 to-transparent border-green-500/10",
      textColor: "text-green-400",
      iconColor: "text-green-400",
      bgBadge: "bg-green-500/10",
    },
    {
      title: "Weaknesses",
      icon: AlertOctagon,
      items: swot.weaknesses || [],
      color: "from-red-500/10 to-transparent border-red-500/10",
      textColor: "text-red-400",
      iconColor: "text-red-400",
      bgBadge: "bg-red-500/10",
    },
    {
      title: "Opportunities",
      icon: TrendingUp,
      items: swot.opportunities || [],
      color: "from-blue-500/10 to-transparent border-blue-500/10",
      textColor: "text-blue-400",
      iconColor: "text-blue-400",
      bgBadge: "bg-blue-500/10",
    },
    {
      title: "Threats",
      icon: Sparkles, // Use Sparkles as a metaphor for volatility/threat threats
      items: swot.threats || [],
      color: "from-amber-500/10 to-transparent border-amber-500/10",
      textColor: "text-amber-400",
      iconColor: "text-amber-400",
      bgBadge: "bg-amber-500/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-bold tracking-tight text-white">SWOT Analysis</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quadrants.map((quad, index) => (
          <div
            key={index}
            className={`glass-panel p-6 rounded-xl border bg-gradient-to-br ${quad.color} flex flex-col space-y-4`}
          >
            <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
              <span className={`p-1.5 rounded-lg ${quad.bgBadge}`}>
                <quad.icon className={`w-4 h-4 ${quad.iconColor}`} />
              </span>
              <h3 className={`text-sm font-bold uppercase tracking-wider ${quad.textColor}`}>
                {quad.title}
              </h3>
            </div>

            <ul className="space-y-2.5 flex-grow">
              {quad.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2 text-slate-300 text-xs">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${quad.iconColor}`} />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
              {quad.items.length === 0 && (
                <li className="text-slate-400 text-xs italic">
                  No factors analyzed.
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
