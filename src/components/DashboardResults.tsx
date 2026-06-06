"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Copy, Share2, ArrowLeft, Check, Sparkles, Building } from "lucide-react";
import { ValidationReport } from "@/lib/types";

import ViabilityScore from "./ViabilityScore";
import MarketOpportunity from "./MarketOpportunity";
import TargetAudience from "./TargetAudience";
import CompetitorAnalysis from "./CompetitorAnalysis";
import RevenueModels from "./RevenueModels";
import RiskAssessment from "./RiskAssessment";
import MvpRoadmap from "./MvpRoadmap";
import SwotAnalysis from "./SwotAnalysis";
import FinalVerdict from "./FinalVerdict";

interface DashboardResultsProps {
  idea: string;
  report: ValidationReport;
  onBack: () => void;
}

export default function DashboardResults({ idea, report, onBack }: DashboardResultsProps) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = async () => {
    try {
      const markdownText = `
# Startup Validation Report: ${report.startup_name_suggestion}
**Idea:** "${idea}"
**Verdict:** ${report.verdict}
**Viability Score:** ${report.viability_score}/100

## Summary
${report.one_line_summary}

## Strategic Thesis
${report.reasoning}

## Market Opportunity
- Demand Level: ${report.market_opportunity.demand_level}
- Target Market Size: ${report.market_opportunity.market_size}
- Timing & Trends: ${report.market_opportunity.timing}

## Target Audience
- Customer Profile: ${report.target_audience.customer_profile}
- Primary Segment: ${report.target_audience.primary_users.join(", ")}
- Secondary Segment: ${report.target_audience.secondary_users.join(", ")}

## Competitors
${report.competitors.map(c => `- ${c.name} | Strength: ${c.strength} | Weakness: ${c.weakness}`).join("\n")}

## Recommended Revenue Models
${report.revenue_models.map((r, i) => `${i + 1}. ${r}`).join("\n")}

## Risks
- Technical: ${report.risks.technical}
- Business: ${report.risks.business}
- Adoption: ${report.risks.adoption}

## MVP Feature Recommendations
${report.mvp_features.map(f => `- ${f}`).join("\n")}

## SWOT Analysis
- Strengths: ${report.swot.strengths.join(", ")}
- Weaknesses: ${report.swot.weaknesses.join(", ")}
- Opportunities: ${report.swot.opportunities.join(", ")}
- Threats: ${report.swot.threats.join(", ")}
`;
      await navigator.clipboard.writeText(markdownText.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy report:", err);
    }
  };

  const handleShare = async () => {
    try {
      // In a real local storage application, sharing copies the text/details or details of search to clipboard as a link
      const shareUrl = `${window.location.origin}/?idea=${encodeURIComponent(idea)}`;
      await navigator.clipboard.writeText(shareUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (err) {
      console.error("Failed to share link:", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-24">
      {/* Action Header Panel (Hidden during Print) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print border-b border-white/5 pb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Validate Another Idea</span>
        </button>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copied Markdown!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Report</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 transition-all cursor-pointer"
          >
            {shared ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share Link</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-gradient-purple-blue hover:opacity-95 text-white transition-all cursor-pointer shadow-lg shadow-purple-500/10"
          >
            <Download className="w-4 h-4" />
            <span>Export Report PDF</span>
          </button>
        </div>
      </div>

      {/* Main Report Visual Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest no-print">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Validation Analysis Complete</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          {report.startup_name_suggestion}
        </h1>
        
        <p className="text-slate-300 text-base font-medium max-w-3xl leading-relaxed">
          {report.one_line_summary}
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1 mt-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Submitted Concept</span>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            "{idea}"
          </p>
        </div>
      </div>

      {/* Grid Dashboard Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Left column on Desktop: Score & Verdict */}
        <div className="md:col-span-1 space-y-6">
          <ViabilityScore score={report.viability_score} />
          
          <div className="hidden md:block">
            <FinalVerdict verdict={report.verdict} reasoning={report.reasoning} />
          </div>
        </div>

        {/* Right columns on Desktop: Details & SWOT */}
        <div className="md:col-span-2 space-y-8">
          <MarketOpportunity data={report.market_opportunity} painPoints={report.mvp_features.slice(0, 3).map(f => `Mitigate hurdle: ${f.toLowerCase()}`)} />
          <TargetAudience data={report.target_audience} />
          <CompetitorAnalysis competitors={report.competitors} />
        </div>
      </div>

      {/* Extra Grid Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <RevenueModels models={report.revenue_models} />
        <RiskAssessment risks={report.risks} />
      </div>

      {/* Verdict block duplicated for mobile views under the details */}
      <div className="block md:hidden">
        <FinalVerdict verdict={report.verdict} reasoning={report.reasoning} />
      </div>

      {/* MVP Roadmap Section (Spans full width) */}
      <div className="pt-2">
        <MvpRoadmap roadmap={report.roadmap} />
      </div>

      {/* SWOT Analysis Section (Spans full width) */}
      <div className="pt-2">
        <SwotAnalysis swot={report.swot} />
      </div>

      {/* Report Footer */}
      <div className="text-center pt-12 border-t border-white/5 text-xs text-slate-500">
        <p>This validation report was generated dynamically by Startup Analyst AI leveraging the Gemini 3.5 Flash model.</p>
        <p className="mt-1">All data is advisory and generated in real-time. Verify core metrics before investing capital.</p>
      </div>
    </div>
  );
}
