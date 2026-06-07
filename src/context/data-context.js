import { createContext, useContext } from "react";

// Context object + consumer hook live here (no components) so the provider
// file stays Fast-Refresh friendly.
export const DataContext = createContext(null);

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useData must be used within a DataProvider");
  }
  return ctx;
}
