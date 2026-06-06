"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, Award } from "lucide-react";
import { Competitor } from "@/lib/types";

interface CompetitorAnalysisProps {
  competitors: Competitor[];
}

export default function CompetitorAnalysis({ competitors }: CompetitorAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2">
        <Award className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-bold tracking-tight text-white">Competitor Landscape</h2>
      </div>

      <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
        {/* Desktop Table Layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/40">
                <th className="p-4 text-xs font-semibold tracking-wider text-slate-300 uppercase w-1/4">
                  Competitor
                </th>
                <th className="p-4 text-xs font-semibold tracking-wider text-slate-300 uppercase w-3/8">
                  Core Strength
                </th>
                <th className="p-4 text-xs font-semibold tracking-wider text-slate-300 uppercase w-3/8">
                  Core Weakness / Vulnerability
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {competitors.map((comp, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-semibold text-white text-sm">
                    {comp.name}
                  </td>
                  <td className="p-4 text-slate-300 text-sm">
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <span>{comp.strength}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300 text-sm">
                    <div className="flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{comp.weakness}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {competitors.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-sm text-slate-400 italic">
                    No competitors listed.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="block md:hidden divide-y divide-white/5">
          {competitors.map((comp, idx) => (
            <div key={idx} className="p-5 space-y-3">
              <div className="font-bold text-white text-base">
                {comp.name}
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-400 block mb-0.5">STRENGTH</span>
                    {comp.strength}
                  </div>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-400 block mb-0.5">WEAKNESS</span>
                    {comp.weakness}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {competitors.length === 0 && (
            <div className="p-6 text-center text-sm text-slate-400 italic">
              No competitors listed.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
