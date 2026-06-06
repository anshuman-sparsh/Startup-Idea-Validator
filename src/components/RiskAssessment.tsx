"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Cpu, Landmark, Users } from "lucide-react";
import { Risks } from "@/lib/types";

interface RiskAssessmentProps {
  risks: Risks;
}

export default function RiskAssessment({ risks }: RiskAssessmentProps) {
  // Helper to parse risk level from text
  const parseRiskLevel = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.startsWith("high") || lower.includes(" critical") || lower.includes("high risk")) {
      return { label: "High Risk", color: "text-red-400 bg-red-500/10 border-red-500/20", percentage: 85, progressColor: "bg-red-500" };
    }
    if (lower.startsWith("low") || lower.includes("minimal") || lower.includes("low risk")) {
      return { label: "Low Risk", color: "text-green-400 bg-green-500/10 border-green-500/20", percentage: 25, progressColor: "bg-green-500" };
    }
    // Default to medium
    return { label: "Medium Risk", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", percentage: 55, progressColor: "bg-yellow-500" };
  };

  const riskCategories = [
    {
      title: "Technical Risk",
      description: risks.technical,
      icon: Cpu,
      ...parseRiskLevel(risks.technical),
    },
    {
      title: "Business Risk",
      description: risks.business,
      icon: Landmark,
      ...parseRiskLevel(risks.business),
    },
    {
      title: "Adoption Risk",
      description: risks.adoption,
      icon: Users,
      ...parseRiskLevel(risks.adoption),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2">
        <ShieldAlert className="w-5 h-5 text-red-400" />
        <h2 className="text-xl font-bold tracking-tight text-white">Risk Assessment</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {riskCategories.map((risk, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 rounded-xl border border-white/5 bg-slate-900/10 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <risk.icon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-semibold text-white">{risk.title}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${risk.color}`}>
                  {risk.label}
                </span>
              </div>
              
              <p className="text-slate-300 text-xs leading-relaxed">
                {risk.description}
              </p>
            </div>

            {/* Visual Progress/Gauge Meter */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[10px] font-medium text-slate-400">
                <span>IMPACT SEVERITY</span>
                <span>{risk.percentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${risk.percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                  className={`h-full rounded-full ${risk.progressColor}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
