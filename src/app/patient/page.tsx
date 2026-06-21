"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PatientPortal() {
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl shadow-slate-950/40 space-y-6"
      >
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Medical Intelligence
          </span>
          <h2 className="text-2xl font-bold text-white mt-1 tracking-tight">
            Clinical Ingestion Center
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Securely upload prescriptions, diagnostic forms, or clinical
            summaries to extract structured data via Gemini AI.
          </p>
        </div>

        {/* Profile Dropdown Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Target Patient Profile
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none border border-slate-800 bg-slate-950 text-slate-200 rounded-xl p-3.5 shadow-inner text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition cursor-pointer pr-10"
              value={selectedPatientId}
              onChange={(e) => {
                setSelectedPatientId(e.target.value);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
            ></select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Upload Zone Component */}
        <div className="relative group border-2 border-dashed border-slate-800 hover:border-emerald-500/50 bg-slate-950/50 rounded-2xl p-8 text-center transition-all duration-300">
          <input
            type="file"
            accept="image/png, image/jpeg, application/pdf"
            className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
            disabled={loading}
          />
          <div className="space-y-3 pointer-events-none">
            <div className="mx-auto size-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/20 group-hover:shadow-lg group-hover:shadow-emerald-500/5 transition-all duration-300">
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                Drag & drop or click to upload record
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supports PDF, PNG, and JPEG files up to 4MB
              </p>
            </div>
          </div>
        </div>

        {/* Informational Alerts Section */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-3 text-sm font-medium"
            >
              <svg
                className="size-4 animate-spin shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H19"
                />
              </svg>
              <span>
                Analyzing record data layers with intelligence pipelines...
              </span>
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-rose-500/5 border border-rose-500/20 text-rose-400 rounded-xl text-sm flex gap-3 items-start"
            >
              <span className="text-base leading-none shrink-0">⚠️</span>
              <div>
                <span className="font-bold block text-rose-300 text-xs uppercase tracking-wide mb-0.5">
                  Ingestion Warning
                </span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  {errorMessage}
                </p>
              </div>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm font-medium flex items-center gap-2"
            >
              <svg
                className="size-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
