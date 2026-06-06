"use client";

import React from "react";
import { motion } from "framer-motion";
import { Milestone, CheckCircle2, ArrowRight } from "lucide-react";
import { Roadmap } from "@/lib/types";

interface MvpRoadmapProps {
  roadmap: Roadmap;
}

export default function MvpRoadmap({ roadmap }: MvpRoadmapProps) {
  const phases = [
    {
      key: "phase_1",
      title: "Phase 1: Core MVP & Launch",
      subtitle: "Focus on primary value proposition (Month 1-2)",
      color: "from-purple-500/10 to-indigo-500/5 border-purple-500/20",
      dotColor: "bg-purple-500 ring-purple-500/30",
      features: roadmap.phase_1 || [],
    },
    {
      key: "phase_2",
      title: "Phase 2: Feedback & Iteration",
      subtitle: "Refining UX and adding essential validation features (Month 3-4)",
      color: "from-blue-500/10 to-indigo-500/5 border-blue-500/20",
      dotColor: "bg-blue-500 ring-blue-500/30",
      features: roadmap.phase_2 || [],
    },
    {
      key: "phase_3",
      title: "Phase 3: Monetization & Scale",
      subtitle: "Launch monetization channels & advanced integrations (Month 5-6)",
      color: "from-emerald-500/10 to-teal-500/5 border-emerald-500/20",
      dotColor: "bg-emerald-500 ring-emerald-500/30",
      features: roadmap.phase_3 || [],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2">
        <Milestone className="w-5 h-5 text-indigo-400" />
        <h2 className="text-xl font-bold tracking-tight text-white">MVP Implementation Roadmap</h2>
      </div>

      <div className="relative pl-6 md:pl-8 space-y-6 border-l-2 border-slate-800 timeline-line">
        {phases.map((phase, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot Indicator */}
            <span className={`absolute -left-[31px] md:-left-[39px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full ${phase.dotColor} ring-4`}>
              <span className="h-1.5 w-1.5 rounded-full bg-black" />
            </span>

            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`glass-panel p-6 rounded-xl border bg-gradient-to-r ${phase.color} transition-all duration-300 hover:border-white/10`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {phase.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">{phase.subtitle}</p>
                </div>
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950/40 px-2 py-1 rounded border border-indigo-900/50 self-start md:self-center">
                  Stage {idx + 1}
                </div>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {phase.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-slate-300 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
                {phase.features.length === 0 && (
                  <li className="text-slate-400 text-xs italic">
                    No features recommended for this phase.
                  </li>
                )}
              </ul>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
