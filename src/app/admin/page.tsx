'use client';

import React, { useState } from 'react';
import { PatientProfile } from '@/app/types/medical';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function AdminPortal() {
  const { state, updateState, clearStorage, resetToMock } = useLocalStorage();
  const [newPatientId, setNewPatientId] = useState<string>('');
  const [newPatientName, setNewPatientName] = useState<string>('');

  if (!state) {
    return (
      <div className="p-12 text-center text-slate-500 text-sm font-medium animate-pulse tracking-wide">
        Loading Governance Core Framework...
      </div>
    );
  }

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientId || !newPatientName) return;

    const checking = state.patients.some(p => p.patientId.toUpperCase() === newPatientId.toUpperCase());
    if (checking) {
      alert("This Access Profile ID is already allocated within the master ledger index.");
      return;
    }

    const newProfile: PatientProfile = {
      patientId: newPatientId.trim().toUpperCase(),
      fullName: newPatientName.trim(),
      status: 'Active',
      records: []
    };

    updateState({ ...state, patients: [...state.patients, newProfile] });
    setNewPatientId('');
    setNewPatientName('');
  };

  const toggleStatus = (id: string) => {
    const updated = state.patients.map(p => {
      if (p.patientId === id) {
        return { ...p, status: p.status === 'Active' ? 'Suspended' : 'Active' } as PatientProfile;
      }
      return p;
    });
    updateState({ ...state, patients: updated });
  };

  const deletePatient = (id: string) => {
    if (!confirm("Confirm complete clinical data wipe? This operation cannot be undone.")) return;
    const updated = state.patients.filter(p => p.patientId !== id);
    updateState({ ...state, patients: updated });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-100">
      
      {/* Evaluator Blueprint Actions */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-xl"
      >
        <div className="mb-4">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Administrative Override</span>
          <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">Evaluator Governance Dashboard</h2>
          <p className="text-slate-400 text-xs mt-1">Isolate core functional environments, seed active mock matrices, or execute total environment resets.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => { resetToMock(); }}
            className="bg-slate-950 hover:bg-slate-900 text-xs font-semibold border border-slate-800 text-slate-200 px-4 py-3 rounded-xl transition-all hover:border-slate-700"
          >
            🔄 Inject Standard Mock Seed
          </button>
          <button 
            onClick={() => { clearStorage(); }}
            className="bg-rose-950/20 hover:bg-rose-950/50 border border-rose-900 text-rose-400 text-xs font-semibold px-4 py-3 rounded-xl transition-all"
          >
            ⚠️ Wipe Local Storage Ledger
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Registration Module Component */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-5 h-fit"
        >
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Identity Directory Provisioning</h3>
            <p className="text-xs text-slate-500 mt-1">Register verified cryptographic profile indexes to the running master node pipeline.</p>
          </div>
          
          <form onSubmit={handleRegisterPatient} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">Patient Access ID</label>
              <input 
                type="text" 
                required
                placeholder="e.g., PAT-5521"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-sky-500 transition"
                value={newPatientId}
                onChange={(e) => setNewPatientId(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">Full Identity String</label>
              <input 
                type="text" 
                required
                placeholder="e.g., Dr. Alice Vance"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-sky-500 transition"
                value={newPatientName}
                onChange={(e) => setNewPatientName(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white py-3 rounded-xl text-xs font-bold transition shadow-lg shadow-sky-950/40">
              Initialize Access Credentials
            </button>
          </form>
        </motion.div>

        {/* System Directories Table View */}
        <motion.div 
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4"
        >
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Active Patient Authorization Index</h3>
          <div className="overflow-hidden border border-slate-850 rounded-xl bg-slate-950/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-850 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-4">Access ID</th>
                    <th className="p-4">Identity Signature</th>
                    <th className="p-4">Encounters</th>
                    <th className="p-4 text-center">Authorization Status</th>
                    <th className="p-4 text-right">Administrative Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850/60">
                  {state.patients.map((p) => (
                    <tr key={p.patientId} className="hover:bg-slate-900/30 transition-colors">
                      <td className="p-4 font-mono font-bold text-sky-400">{p.patientId}</td>
                      <td className="p-4 font-semibold text-slate-200">{p.fullName}</td>
                      <td className="p-4 text-slate-400 font-medium">{p.records.length} records</td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <button 
                          onClick={() => toggleStatus(p.patientId)}
                          className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-medium px-2.5 py-1.5 rounded-lg text-[11px] transition"
                        >
                          Toggle Status
                        </button>
                        <button 
                          onClick={() => deletePatient(p.patientId)}
                          className="bg-rose-950/20 hover:bg-rose-950/60 border border-rose-900/60 text-rose-400 font-medium px-2.5 py-1.5 rounded-lg text-[11px] transition"
                        >
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Audit Pipeline Monitoring Log Module */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4"
      >
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Pipeline Execution & Intelligence Audit Logs</h3>
          <p className="text-xs text-slate-500 mt-1">Immutable monitoring tracking block activities across system endpoints.</p>
        </div>
        
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          <AnimatePresence>
            {state.logs.map((log) => (
              <motion.div 
                key={log.id} 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-slate-950 border border-slate-850 rounded-xl text-xs flex flex-col sm:flex-row justify-between sm:items-center gap-3"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-slate-500 font-semibold bg-slate-900 px-1.5 py-0.5 border border-slate-800 rounded">
                      {log.id}
                    </span>
                    <span className="font-bold text-slate-200">Payload: {log.fileName}</span>
                    <span className="text-slate-500 font-medium">at {log.timestamp}</span>
                  </div>
                  {log.errorMessage && (
                    <p className="text-rose-400 font-mono text-[11px] bg-rose-500/5 p-2 rounded-lg border border-rose-950 mt-1.5 leading-relaxed">
                      Error Response: {log.errorMessage}
                    </p>
                  )}
                </div>
                <span className={`self-start sm:self-auto font-mono px-2.5 py-1 rounded-lg font-bold text-[10px] uppercase tracking-widest border shrink-0 ${
                  log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  {log.status}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {state.logs.length === 0 && (
            <p className="text-slate-500 text-xs text-center py-8 border border-dashed border-slate-800 rounded-xl">
              No audit records initialized inside local memory caches.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}