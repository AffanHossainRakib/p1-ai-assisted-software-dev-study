import { useMemo } from "react";
import { useTableState } from "../../hooks/useTableState";
import { controlClass } from "./formStyles";

// Generic comparator: numeric when both values look numeric, else localeCompare.
function compareValues(a, b) {
  if (a === null || a === undefined || a === "") return 1;
  if (b === null || b === undefined || b === "") return -1;
  const na = Number(a);
  const nb = Number(b);
  if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
  return String(a).localeCompare(String(b));
}

function SortIndicator({ active, order }) {
  if (!active) return <span className="text-slate-300">↕</span>;
  return <span className="text-indigo-600">{order === "asc" ? "↑" : "↓"}</span>;
}

// columns: [{ key, header, sortable?, render?(row), sortValue?(row), className? }]
export default function DataTable({
  columns,
  data,
  searchKeys = [],
  searchPlaceholder = "Search...",
  pageSize = 5,
  getRowKey = (row) => row.id,
  emptyMessage = "No records found.",
}) {
  const { search, sort, order, page, setSearch, setPage, toggleSort } =
    useTableState();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q || searchKeys.length === 0) return data;
    return data.filter((row) =>
      searchKeys.some((key) =>
        String(row[key] ?? "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [data, search, searchKeys]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.key === sort);
    const getValue = col?.sortValue ?? ((row) => row[sort]);
    const direction = order === "desc" ? -1 : 1;
    return [...filtered].sort(
      (a, b) => compareValues(getValue(a), getValue(b)) * direction
    );
  }, [filtered, sort, order, columns]);

  const totalRows = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageRows = sorted.slice(start, start + pageSize);

  const rangeFrom = totalRows === 0 ? 0 : start + 1;
  const rangeTo = Math.min(start + pageSize, totalRows);

  return (
    <div className="space-y-3">
      {searchKeys.length > 0 && (
        <div className="flex items-center justify-between gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className={`${controlClass()} max-w-xs`}
          />
          <span className="text-xs text-slate-500">
            {totalRows} record{totalRows === 1 ? "" : "s"}
          </span>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className="px-4 py-3 text-left font-semibold text-slate-600"
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className="inline-flex items-center gap-1 hover:text-slate-900"
                    >
                      {col.header}
                      <SortIndicator active={sort === col.key} order={order} />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr key={getRowKey(row)} className="hover:bg-slate-50">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 text-slate-700 ${col.className ?? ""}`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
        <span>
          {totalRows === 0
            ? "Showing 0 of 0"
            : `Showing ${rangeFrom}–${rangeTo} of ${totalRows}`}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-600 enabled:hover:bg-slate-100 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-slate-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-600 enabled:hover:bg-slate-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
