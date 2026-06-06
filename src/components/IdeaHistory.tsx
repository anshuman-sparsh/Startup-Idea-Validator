"use client";

import React from "react";
import { motion } from "framer-motion";
import { History, Trash2, Calendar, ChevronRight, RefreshCw } from "lucide-react";
import { HistoryItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface IdeaHistoryProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export default function IdeaHistory({ items, onSelect, onDelete, onClearAll }: IdeaHistoryProps) {
  if (items.length === 0) return null;

  // Helper to color-code score badges in history list
  const getScoreColor = (score: number) => {
    if (score <= 40) return "text-red-400 bg-red-500/10 border-red-500/20";
    if (score <= 70) return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    return "text-green-400 bg-green-500/10 border-green-500/20";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-4 py-8 border-t border-white/5 space-y-6"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-slate-300 text-sm font-bold uppercase tracking-wider">
          <History className="w-4 h-4 text-purple-400" />
          <span>Your History ({items.length})</span>
        </div>
        
        <button
          onClick={onClearAll}
          className="text-xs font-semibold text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-5 rounded-xl border border-white/5 hover:border-purple-500/20 bg-slate-900/5 hover:bg-purple-950/[0.02] flex items-start justify-between gap-4 transition-all duration-300 group relative"
          >
            {/* Clickable Area to Select */}
            <div 
              onClick={() => onSelect(item)}
              className="flex-grow space-y-3 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getScoreColor(item.report.viability_score)}`}>
                  {item.report.viability_score} Score
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold uppercase">
                  <Calendar className="w-3 h-3" />
                  {formatDate(item.timestamp)}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors flex items-center gap-1">
                  <span>{item.report.startup_name_suggestion}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                </h3>
                <p className="text-slate-400 text-xs line-clamp-2 mt-1 leading-relaxed">
                  {item.idea}
                </p>
              </div>
            </div>

            {/* Trash Delete Action */}
            <button
              onClick={() => onDelete(item.id)}
              className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors shrink-0 z-10 cursor-pointer self-start"
              title="Delete from history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
