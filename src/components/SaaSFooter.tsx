"use client";

import React from "react";

export default function SaaSFooter() {
  return (
    <footer className="no-print border-t border-white/5 bg-black/40 py-8 mt-auto">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div>
          <p>© {new Date().getFullYear()} Startup Idea Validator AI. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms</span>
          <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-slate-400 transition-colors cursor-pointer">VC partner tools</span>
        </div>
        <div>
          <p>Powered by Gemini 3.5 Flash & Next.js 15</p>
        </div>
      </div>
    </footer>
  );
}
