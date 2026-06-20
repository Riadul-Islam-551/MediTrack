"use client";

import {ArrowDownFromLine, ShieldExclamation} from '@gravity-ui/icons';
import { motion } from "framer-motion";

export default function AdminPortal() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-100">
      {/* Evaluator Blueprint Actions */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-xl"
      >
        <div className="mb-4">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
            Administrative Override
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
            Evaluator Governance Dashboard
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Isolate core functional environments, seed active mock matrices, or
            execute total environment resets.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-xs font-semibold border border-slate-800 text-slate-200 px-4 py-3 rounded-xl transition-all hover:border-slate-700">
            <ArrowDownFromLine></ArrowDownFromLine> Inject Standard Mock Seed
          </button>
          <button className="flex items-center gap-2 bg-rose-950/20 hover:bg-rose-950/50 border border-rose-900 text-rose-400 text-xs font-semibold px-4 py-3 rounded-xl transition-all">
            <ShieldExclamation></ShieldExclamation> Wipe Local Storage Ledger
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
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Identity Directory Provisioning
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Register verified cryptographic profile indexes to the running
              master node pipeline.
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                Patient Access ID
              </label>
              <input
                type="text"
                required
                placeholder="e.g., PAT-5521"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-sky-500 transition"
                value={""}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                Full Identity String
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Dr. Alice Vance"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-sky-500 transition"
                value={""}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-500 text-white py-3 rounded-xl text-xs font-bold transition shadow-lg shadow-sky-950/40"
            >
              Initialize Access Credentials
            </button>
          </form>
        </motion.div>

        {/* System Directories Table View */}
      </div>

      {/* Audit Pipeline Monitoring Log Module */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4"
      >
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Pipeline Execution & Intelligence Audit Logs
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Immutable monitoring tracking block activities across system
            endpoints.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
