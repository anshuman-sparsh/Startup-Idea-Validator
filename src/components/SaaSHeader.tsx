"use client";

import React from "react";
import { Sparkles, Activity } from "lucide-react";

export default function SaaSHeader() {
  return (
    <header className="no-print border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.location.href = "/"}>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-purple-blue">
            <Activity className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-extrabold tracking-tight text-white text-sm md:text-base">
            Startup Idea <span className="text-gradient-purple-blue">Validator AI</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-widest animate-pulse">
            <Sparkles className="w-3 h-3" />
            <span>Gemini 3.5 Flash</span>
          </div>
        </div>
      </div>
    </header>
  );
}
