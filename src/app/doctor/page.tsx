"use client";

import React, { useState } from "react";
import {
  PatientProfile,
  MedicalRecord,
  Medicine,
  TestResult,
} from "@/app/types/medical";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const TABS = [
  "Antibiotics",
  "Vitamins",
  "Calcium",
  "Gastric Medicine",
] as const;

export default function DoctorPortal() {
  const { state } = useLocalStorage();
  const [searchId, setSearchId] = useState<string>("");
  const [activePatient, setActivePatient] = useState<PatientProfile | null>(
    null,
  );
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>("Antibiotics");
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(
    null,
  );
  const [consoleError, setConsoleError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setConsoleError(null);
    if (!state) return;

    const patient = state.patients.find(
      (p) => p.patientId.trim().toUpperCase() === searchId.trim().toUpperCase(),
    );

    if (patient) {
      if (patient.status === "Suspended") {
        setConsoleError(
          "Access Denied: This clinical record has been explicitly suspended by administrative authority overrides.",
        );
        setActivePatient(null);
        return;
      }
      setActivePatient(patient);
      setSelectedRecord(null);
    } else {
      setConsoleError(
        "No corresponding health records matching that target identification parameter found.",
      );
      setActivePatient(null);
    }
  };

  if (!state) {
    return (
      <div className="p-12 text-center text-slate-500 text-sm font-medium animate-pulse tracking-wide">
        Loading Diagnostic Intelligence Databases...
      </div>
    );
  }

  // Aggregate global analytics structures
  const allHistoricalMedicines =
    activePatient?.records.flatMap((r) => r.medicines) || [];
  const antibioticCount = allHistoricalMedicines.filter(
    (m) => m.category === "Antibiotics",
  ).length;
  const currentTabMedicines = allHistoricalMedicines.filter(
    (m) => m.category === activeTab,
  );

  const analyticsTests =
    activePatient?.records.flatMap((r) =>
      r.testResults.map((t) => ({
        date: r.date,
        testName: t.testName,
        value: t.value,
        unit: t.unit,
      })),
    ) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-100">
      {/* Search Console Hub */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-xl"
      >
        <div className="mb-4">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Secure Provider Network
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
            Doctor Consultation Search Console
          </h2>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Query by Patient Access ID (e.g., PAT-8812)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition shadow-lg shadow-sky-950/50 shrink-0"
          >
            Query Master Records
          </button>
        </form>

        <AnimatePresence>
          {consoleError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-3.5 bg-rose-500/5 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex gap-2.5 items-center"
            >
              <span>⚠️</span>
              <p className="font-medium">{consoleError}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Main Clinical Intelligence Layout Workspace */}
      <AnimatePresence mode="wait">
        {activePatient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Columns - Detailed Metrics & Trackers */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6">
                {/* Header Information Bar */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800/80 pb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {activePatient.fullName}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Master Index Ref: {activePatient.patientId}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                      Verified Clinical File
                    </span>
                  </div>
                </div>

                {/* Analytical High Density Summary Panels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
                      🦠
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Antibiotic Stewardship
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-2xl font-extrabold text-amber-400 tracking-tight">
                          {antibioticCount}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          historical courses
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-sky-500/10 text-sky-400">
                      📊
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Total Encounters
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-2xl font-extrabold text-sky-400 tracking-tight">
                          {activePatient.records.length}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          consultation entries
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pharmacotherapy Categorization Dynamic Tabs System */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                    Pharmacotherapy Audit Records
                  </h4>
                  <div className="flex border-b border-slate-800/80 gap-1 overflow-x-auto pb-px">
                    {TABS.map((tab) => {
                      const active = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`relative px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-colors duration-200 outline-none z-10 ${
                            active
                              ? "text-sky-400"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {active && (
                            <motion.div
                              layoutId="doctorTabIndicator"
                              className="absolute inset-x-0 bottom-0 h-0.5 bg-sky-500"
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                              }}
                            />
                          )}
                          {tab}
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-slate-950/60 rounded-xl border border-slate-850 p-4 min-h-35">
                    <AnimatePresence mode="wait">
                      {currentTabMedicines.length > 0 ? (
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                          {currentTabMedicines.map((med, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex justify-between items-center text-xs"
                            >
                              <div>
                                <span className="font-bold text-slate-200 block text-sm">
                                  {med.name}
                                </span>
                                <span className="text-slate-400 font-medium mt-0.5 block">
                                  Dosage: {med.dosage}
                                </span>
                              </div>
                              <span className="text-[10px] uppercase font-bold bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-400">
                                {med.duration}
                              </span>
                            </div>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.p
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-slate-500 text-xs text-center py-10"
                        >
                          No active treatments found within this diagnostic
                          categorization tab.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Patient Diagnostic Tracker Log Matrix */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                    Diagnostic Chronological Matrix
                  </h4>
                  {analyticsTests.length > 0 ? (
                    <div className="overflow-hidden border border-slate-850 rounded-xl bg-slate-950/30">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-950 border-b border-slate-850 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                              <th className="p-4">Date</th>
                              <th className="p-4">Parameter Target</th>
                              <th className="p-4 text-right">Value Metric</th>
                            </tr>
                          </thead>
                        </table>
                        <div className="max-h-60 overflow-y-auto divide-y divide-slate-850/60">
                          <table className="w-full text-left text-xs border-collapse">
                            <tbody className="divide-y divide-slate-850/60">
                              {analyticsTests.map((t, idx) => (
                                <tr
                                  key={idx}
                                  className="hover:bg-slate-900/40 transition-colors"
                                >
                                  <td className="p-4 text-slate-400 font-medium">
                                    {t.date}
                                  </td>
                                  <td className="p-4 font-bold text-slate-200">
                                    {t.testName}
                                  </td>
                                  <td className="p-4 text-right font-mono text-sky-400 font-bold">
                                    {t.value}{" "}
                                    <span className="text-[10px] text-slate-500 font-normal">
                                      {t.unit}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-500 text-xs py-6 border border-dashed border-slate-800 rounded-xl text-center">
                      No quantified structural testing trends mapped yet.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Column - History Ledger & Panel Overlays */}
            <div className="space-y-6">
              {/* Encounter Logs Panel */}
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-xl space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                  Historical Encounters Ledger
                </h3>

                <div className="space-y-2.5 max-h-90 overflow-y-auto pr-1">
                  {activePatient.records.map((rec) => {
                    const isSelected =
                      selectedRecord?.recordId === rec.recordId;
                    return (
                      <button
                        key={rec.recordId}
                        onClick={() => setSelectedRecord(rec)}
                        className={`w-full text-left p-4 rounded-xl border text-xs block transition-all duration-200 ${
                          isSelected
                            ? "border-sky-500 bg-sky-500/5 shadow-lg shadow-sky-950/20"
                            : "border-slate-850 bg-slate-950/60 hover:bg-slate-900/60 hover:border-slate-800"
                        }`}
                      >
                        <div className="flex justify-between font-bold text-slate-200 mb-1.5">
                          <span>{rec.date}</span>
                          <span className="text-slate-500 font-mono text-[10px]">
                            {rec.recordId}
                          </span>
                        </div>
                        <p className="text-slate-300 font-semibold truncate mb-1">
                          Attending: {rec.doctorName}
                        </p>
                        <p className="text-slate-400 text-[11px] line-clamp-2 italic leading-relaxed">
                          &quot;{rec.patientCase}&quot;
                        </p>
                      </button>
                    );
                  })}
                  {activePatient.records.length === 0 && (
                    <p className="text-slate-500 text-xs text-center py-8">
                      No historical tracking metrics integrated.
                    </p>
                  )}
                </div>
              </div>

              {/* Patient Record Deep-Dive Summary Container */}
              <AnimatePresence mode="wait">
                {selectedRecord ? (
                  <motion.div
                    key={selectedRecord.recordId}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4 relative"
                  >
                    <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-sky-400">
                          Encounter Analysis
                        </h4>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {selectedRecord.recordId} | {selectedRecord.date}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedRecord(null)}
                        className="text-slate-400 hover:text-white text-[11px] font-medium bg-slate-800 px-2 py-1 rounded-lg border border-slate-700/60 transition"
                      >
                        Dismiss
                      </button>
                    </div>

                    <div className="text-xs space-y-4">
                      <div>
                        <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block">
                          Attending Provider
                        </span>
                        <p className="font-semibold text-slate-200 mt-0.5">
                          {selectedRecord.doctorName}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block">
                          Clinical Notes Summary
                        </span>
                        <p className="italic text-slate-300 leading-relaxed mt-1 bg-slate-950 p-3 rounded-xl border border-slate-850">
                          &quot;{selectedRecord.patientCase}&quot;
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block">
                          Extracted Biomarker Vitals
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                            <span className="text-[10px] text-slate-500 font-medium block">
                              Respiratory Rate
                            </span>
                            <p className="font-mono text-emerald-400 font-bold text-sm mt-0.5">
                              {selectedRecord.vitals.respiratoryRate || "N/A"}
                            </p>
                          </div>
                          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                            <span className="text-[10px] text-slate-500 font-medium block">
                              Blood Pressure
                            </span>
                            <p className="font-mono text-emerald-400 font-bold text-sm mt-0.5">
                              {selectedRecord.vitals.bloodPressure || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 text-center border border-dashed border-slate-800 rounded-2xl text-xs text-slate-500 leading-relaxed"
                  >
                    Select an entry snapshot from the chronological ledger to
                    isolate specific biomarkers and physiological updates.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
