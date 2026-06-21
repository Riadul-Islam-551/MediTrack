"use client";

import { useState, useEffect } from "react";
import { AppStorageState } from "@/app/types/medical";
import { initialMockPatients } from "@/utils/mockData";

const STORAGE_KEY = "meditrack_state";

const defaultState: AppStorageState = {
  patients: initialMockPatients,
  logs: [
    {
      id: "LOG-1",
      timestamp: new Date().toLocaleString(),
      status: "SUCCESS",
      fileName: "seed_file.pdf",
    },
  ],
};

export function useLocalStorage() {
  const [state, setState] = useState<AppStorageState | null>(null);

  useEffect(() => {
    const loadState = async () => {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));

        // Wait for something (optional)
        await Promise.resolve();

        setState(defaultState);
      } else {
        try {
          setState(JSON.parse(raw));
        } catch {
          setState(defaultState);
        }
      }
    };

    loadState();
  }, []);

  const updateState = (newState: AppStorageState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    setState(newState);
  };

  const clearStorage = () => {
    const cleared: AppStorageState = { patients: [], logs: [] };
    updateState(cleared);
  };

  const resetToMock = () => {
    updateState(defaultState);
  };

  return { state, updateState, clearStorage, resetToMock };
}
