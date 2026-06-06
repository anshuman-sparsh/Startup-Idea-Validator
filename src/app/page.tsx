"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { ValidationReport, HistoryItem } from "@/lib/types";

import SaaSHeader from "@/components/SaaSHeader";
import SaaSFooter from "@/components/SaaSFooter";
import LandingHero from "@/components/LandingHero";
import IdeaHistory from "@/components/IdeaHistory";
import LoadingState from "@/components/LoadingState";
import DashboardResults from "@/components/DashboardResults";

function ValidatorAppContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"landing" | "loading" | "results">("landing");
  const [idea, setIdea] = useState("");
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Load history from localstorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("startup_validator_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load history from localStorage:", err);
    }
    setIsInitializing(false);
  }, []);

  // Sync state with share parameter
  useEffect(() => {
    if (isInitializing) return;

    const ideaParam = searchParams.get("idea");
    if (ideaParam && ideaParam.trim().length > 0 && ideaParam !== idea) {
      // Clear URL params to prevent re-trigger on reload
      const newUrl = window.location.pathname;
      router.replace(newUrl);
      
      // Trigger validation
      handleAnalyze(ideaParam);
    }
  }, [searchParams, isInitializing]);

  const handleAnalyze = async (submittedIdea: string) => {
    setIdea(submittedIdea);
    setStep("loading");
    setError(null);
    setReport(null);

    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea: submittedIdea }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process the startup idea analysis.");
      }

      const newReport = data as ValidationReport;
      setReport(newReport);

      // Save to local storage history
      const newItem: HistoryItem = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        idea: submittedIdea,
        timestamp: Date.now(),
        report: newReport,
      };

      const updatedHistory = [newItem, ...history.filter(h => h.idea.toLowerCase() !== submittedIdea.toLowerCase())].slice(0, 15);
      setHistory(updatedHistory);
      localStorage.setItem("startup_validator_history", JSON.stringify(updatedHistory));

      setStep("results");
    } catch (err: any) {
      console.error("Validation error:", err);
      setError(err.message || "An unexpected network error occurred. Please try again.");
      setStep("landing");
    }
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setIdea(item.idea);
    setReport(item.report);
    setStep("results");
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteHistory = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("startup_validator_history", JSON.stringify(updated));
  };

  const handleClearAllHistory = () => {
    if (confirm("Are you sure you want to clear all validation history? This cannot be undone.")) {
      setHistory([]);
      localStorage.removeItem("startup_validator_history");
    }
  };

  const handleBackToLanding = () => {
    setStep("landing");
    setError(null);
    setReport(null);
    setIdea("");
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-black">
      {/* Background Radial Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-radial-glow opacity-60 -z-20 pointer-events-none" />

      {/* Decorative vector dots */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] -z-30 pointer-events-none" />

      <SaaSHeader />

      <main className="flex-grow flex flex-col justify-start px-4 sm:px-6 lg:px-8 py-8 md:py-12 z-10 w-full">
        {/* Error Notice */}
        {error && (
          <div className="w-full max-w-4xl mx-auto mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-300 text-xs md:text-sm flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Analysis Failed</span>
              <p>{error}</p>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 w-full"
            >
              <LandingHero onAnalyze={handleAnalyze} isLoading={false} />
              <IdeaHistory
                items={history}
                onSelect={handleSelectHistory}
                onDelete={handleDeleteHistory}
                onClearAll={handleClearAllHistory}
              />
            </motion.div>
          )}

          {step === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex items-center justify-center min-h-[60vh]"
            >
              <LoadingState />
            </motion.div>
          )}

          {step === "results" && report && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <DashboardResults idea={idea} report={report} onBack={handleBackToLanding} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <SaaSFooter />
    </div>
  );
}

// Wrap inside Suspense to avoid build-time deoptimization during Next.js static asset creation
export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-slate-100">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mb-2"></div>
        <p className="text-xs text-slate-500 uppercase tracking-widest">Loading Validator...</p>
      </div>
    }>
      <ValidatorAppContent />
    </Suspense>
  );
}
