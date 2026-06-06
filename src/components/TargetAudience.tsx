"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, Compass } from "lucide-react";
import { TargetAudience as TargetAudienceType } from "@/lib/types";

interface TargetAudienceProps {
  data: TargetAudienceType;
}

export default function TargetAudience({ data }: TargetAudienceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-bold tracking-tight text-white">Target Audience</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Segments */}
        <div className="space-y-4">
          {/* Primary Users */}
          <div className="glass-panel p-5 rounded-xl border border-white/5 bg-slate-900/10 space-y-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">
                Primary Users
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.primary_users.map((user, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20"
                >
                  {user}
                </span>
              ))}
              {data.primary_users.length === 0 && (
                <span className="text-sm text-slate-400 italic">No primary users identified.</span>
              )}
            </div>
          </div>

          {/* Secondary Users */}
          <div className="glass-panel p-5 rounded-xl border border-white/5 bg-slate-900/10 space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">
                Secondary Users
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.secondary_users.map((user, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20"
                >
                  {user}
                </span>
              ))}
              {data.secondary_users.length === 0 && (
                <span className="text-sm text-slate-400 italic">No secondary users identified.</span>
              )}
            </div>
          </div>
        </div>

        {/* ICP Card */}
        <div className="glass-panel p-6 rounded-xl border border-white/5 bg-gradient-to-br from-slate-900/30 to-blue-900/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">
                Ideal Customer Profile (ICP)
              </h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {data.customer_profile}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Focus Area: Direct-to-Consumer / Business Profile</span>
            <span className="font-semibold text-blue-400">High Intent Segment</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
