"use client";

import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-16 bg-slate-950/40 backdrop-blur-md text-slate-400 py-6 px-4 sm:px-6 lg:px-8 text-xs border-t border-slate-900 font-medium"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Architecture Identity Details */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="size-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse shrink-0" />
          <p className="tracking-wide">
            MediTrack Engineering Dashboard Architecture
            <span className="text-slate-600 mx-2">•</span>
            <span className="text-slate-500">
              Evaluation Prototype Assessment {currentYear}
            </span>
          </p>
        </div>

        {/* Network Nodes Status & Actions */}
        <div className="flex items-center gap-6 text-slate-500 text-[11px] font-mono tracking-tight">
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 border border-slate-900 rounded-lg">
            <span className="text-slate-600">NODE:</span>
            <span className="text-emerald-400 font-bold">SECURE_SSL</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              System Registry
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
