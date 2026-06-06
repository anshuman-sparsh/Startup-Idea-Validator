"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface ViabilityScoreProps {
  score: number;
}

export default function ViabilityScore({ score }: ViabilityScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Smooth counting animation
  useEffect(() => {
    let start = 0;
    const end = score;
    if (start === end) {
      setAnimatedScore(end);
      return;
    }

    const duration = 1.5; // seconds
    const totalFrames = 60 * duration;
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const current = Math.round(start + (end - start) * (progress * (2 - progress)));
      
      if (frame >= totalFrames) {
        setAnimatedScore(end);
        clearInterval(counter);
      } else {
        setAnimatedScore(current);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [score]);

  // Color determination based on score
  const getColor = (val: number) => {
    if (val <= 40) return { stroke: "#ef4444", text: "text-red-500", glow: "shadow-red-500/20" }; // Red
    if (val <= 70) return { stroke: "#eab308", text: "text-yellow-500", glow: "shadow-yellow-500/20" }; // Yellow
    return { stroke: "#22c55e", text: "text-green-500", glow: "shadow-green-500/20" }; // Green
  };

  const colorConfig = getColor(score);

  // SVG parameters
  const radius = 70;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`glass-panel-glow relative flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5 bg-black/40 overflow-hidden`}
    >
      {/* Background glow matching the score color */}
      <div 
        className="absolute inset-0 -z-10 opacity-10 transition-colors duration-1000" 
        style={{
          background: `radial-gradient(circle at center, ${colorConfig.stroke} 0%, transparent 70%)`
        }}
      />
      
      <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-6">
        Viability Score
      </h3>

      <div className="relative flex items-center justify-center w-48 h-48">
        {/* SVG Circle Gauge */}
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle track */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Foreground animated progress circle */}
          <motion.circle
            cx="96"
            cy="96"
            r={radius}
            stroke={colorConfig.stroke}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Text displaying the animated score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-extrabold tracking-tight ${colorConfig.text}`}>
            {animatedScore}
          </span>
          <span className="text-xs text-muted-foreground font-medium uppercase mt-1">
            out of 100
          </span>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-slate-300 max-w-xs leading-relaxed">
          {score <= 40 && "This idea faces significant structural barriers, market saturated or weak monetization mechanics. Pivoting is highly recommended."}
          {score > 40 && score <= 70 && "Solid potential with some addressable bottlenecks. Worth proceeding to initial validation tests, user surveys, and MVP."}
          {score > 70 && "Strong indicators for high market demand, clear monetization, and solid viability. Highly recommended to begin MVP development."}
        </p>
      </div>
    </motion.div>
  );
}
