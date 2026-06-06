"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign, Layers, ShoppingBag, Landmark, Sparkles, HelpCircle } from "lucide-react";

interface RevenueModelsProps {
  models: string[];
}

export default function RevenueModels({ models }: RevenueModelsProps) {
  // Utility function to get matching icon & style based on model name
  const getModelDetails = (modelName: string) => {
    const nameLower = modelName.toLowerCase();
    
    if (nameLower.includes("sub") || nameLower.includes("saas")) {
      return {
        icon: Layers,
        color: "text-purple-400 border-purple-500/20 bg-purple-500/5",
        label: "Subscription / SaaS"
      };
    }
    if (nameLower.includes("free") || nameLower.includes("tier")) {
      return {
        icon: Sparkles,
        color: "text-blue-400 border-blue-500/20 bg-blue-500/5",
        label: "Freemium"
      };
    }
    if (nameLower.includes("market") || nameLower.includes("platform") || nameLower.includes("commiss")) {
      return {
        icon: ShoppingBag,
        color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
        label: "Marketplace / Commission"
      };
    }
    if (nameLower.includes("enterprise") || nameLower.includes("b2b") || nameLower.includes("contract")) {
      return {
        icon: Landmark,
        color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
        label: "Enterprise Contracts"
      };
    }
    return {
      icon: DollarSign,
      color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      label: "Custom Revenue Model"
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-emerald-400" />
        <h2 className="text-xl font-bold tracking-tight text-white">Revenue Models</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {models.map((model, idx) => {
          const details = getModelDetails(model);
          const IconComponent = details.icon;

          return (
            <div
              key={idx}
              className={`glass-panel p-5 rounded-xl border flex gap-4 items-start ${details.color}`}
            >
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 shrink-0">
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-white text-sm">
                  {idx + 1}. {model.split(":")[0]}
                </h3>
                {model.includes(":") ? (
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {model.split(":").slice(1).join(":")}
                  </p>
                ) : (
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Recommended strategy to monetize this target user base.
                  </p>
                )}
              </div>
            </div>
          );
        })}
        {models.length === 0 && (
          <div className="col-span-2 glass-panel p-6 text-center text-sm text-slate-400 italic">
            No monetization strategies recommended.
          </div>
        )}
      </div>
    </motion.div>
  );
}
