import { useSearchParams } from "react-router";

// Table view state (search query, sort field/direction, current page) backed
// by the URL query string so refreshing or sharing the link preserves the view.
// Defaults are kept OUT of the URL to keep it clean, e.g.
//   /students?page=2&search=ayesha&sort=name&order=asc

// A key/value pair is dropped from the URL when it equals its default.
function isRemovable(key, value) {
  if (value === "" || value === null || value === undefined) return true;
  if (key === "page" && Number(value) <= 1) return true;
  return false;
}

export function useTableState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const order = searchParams.get("order") === "desc" ? "desc" : "asc";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  // Merge a partial set of changes into the existing query string.
  const update = (changes) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        for (const [key, value] of Object.entries(changes)) {
          if (isRemovable(key, value)) {
            params.delete(key);
          } else {
            params.set(key, String(value));
          }
        }
        return params;
      },
      { replace: true }
    );
  };

  const setSearch = (value) => update({ search: value, page: 1 });

  const setPage = (value) => update({ page: value });

  // First click sorts asc, second flips to desc, third clears the sort.
  const toggleSort = (field) => {
    if (sort !== field) {
      update({ sort: field, order: "asc", page: 1 });
    } else if (order === "asc") {
      update({ order: "desc" });
    } else {
      update({ sort: "", order: "" });
    }
  };

  return { search, sort, order, page, setSearch, setPage, toggleSort };
}
