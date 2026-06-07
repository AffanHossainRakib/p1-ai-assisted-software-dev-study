// Shared form-control styling. Kept in a plain module (not a component file)
// so the JSX components stay Fast-Refresh friendly.
export function controlClass(hasError = false) {
  const base =
    "block w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500/30";
  return hasError
    ? `${base} border-red-400 focus:border-red-500`
    : `${base} border-slate-300 focus:border-indigo-500`;
}
