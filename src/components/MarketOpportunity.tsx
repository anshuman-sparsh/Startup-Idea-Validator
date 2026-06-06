"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Clock, AlertTriangle } from "lucide-react";
import { MarketOpportunity as MarketOpportunityType } from "@/lib/types";

interface MarketOpportunityProps {
  data: MarketOpportunityType;
  painPoints?: string[]; // Adding support for custom pain points if returned, or we will generate mock/AI pain points based on reasoning
}

export default function MarketOpportunity({ data, painPoints = [] }: MarketOpportunityProps) {
  // Safe fallbacks for pain points in case the AI includes it in target audience or reasoning
  const derivedPainPoints = painPoints.length > 0 
    ? painPoints 
    : [
        "High barrier to entry or high cost of current solutions",
        "Inefficient workflows and time-consuming manual processes",
        "Lack of direct integration or modern automated tools"
      ];

  const cards = [
    {
      title: "Market Demand",
      value: data.demand_level,
      icon: TrendingUp,
      color: "from-purple-500/10 to-indigo-500/10 border-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      title: "Market Size / TAM",
      value: data.market_size,
      icon: BarChart3,
      color: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Timing & Trends",
      value: data.timing,
      icon: Clock,
      color: "from-indigo-500/10 to-blue-500/10 border-indigo-500/20",
      iconColor: "text-indigo-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-bold tracking-tight text-white">Market Opportunity</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`glass-panel p-6 rounded-xl border bg-gradient-to-br ${card.color} flex flex-col justify-between min-h-[160px]`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-slate-400">{card.title}</span>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <p className="text-base font-semibold text-slate-200 leading-snug">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Customer Pain Points Card */}
      <div className="glass-panel p-6 rounded-xl border border-white/5 bg-slate-900/10">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">
            Key Customer Pain Points
          </h3>
        </div>
        <ul className="space-y-3">
          {derivedPainPoints.map((pain, index) => (
            <li key={index} className="flex items-start gap-3 text-slate-300 text-sm">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-xs font-semibold text-purple-400 mt-0.5 shrink-0">
                {index + 1}
              </span>
              <span className="leading-relaxed">{pain}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
