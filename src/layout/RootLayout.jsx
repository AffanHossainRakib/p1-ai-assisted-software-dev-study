import { NavLink, Outlet } from "react-router";
import { Toaster } from "sonner";
import { DataProvider } from "../context/DataContext";

const NAV_ITEMS = [
  { to: "/students", label: "Students" },
  { to: "/enrollments", label: "Enrollments" },
  { to: "/grades", label: "Grades" },
];

function navLinkClass({ isActive }) {
  const base =
    "rounded-md px-3 py-2 text-sm font-medium transition-colors";
  return isActive
    ? `${base} bg-indigo-600 text-white`
    : `${base} text-slate-600 hover:bg-slate-100 hover:text-slate-900`;
}

export default function RootLayout() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <span className="text-lg font-semibold text-slate-900">
              Student Management System
            </span>
            <nav className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.to} to={item.to} className={navLinkClass}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">
          <Outlet />
        </main>

        <Toaster richColors position="top-right" />
      </div>
    </DataProvider>
  );
}
