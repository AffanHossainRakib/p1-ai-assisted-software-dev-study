// Thin, safe wrapper around localStorage plus first-run seeding.
import { seedData } from "../data/seedData";

const PREFIX = "sms";

export const STORAGE_KEYS = {
  students: `${PREFIX}.students`,
  courses: `${PREFIX}.courses`,
  enrollments: `${PREFIX}.enrollments`,
  grades: `${PREFIX}.grades`,
};

// Read a JSON value from localStorage, falling back when missing/corrupt.
export function load(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

// Persist a JSON-serialisable value.
export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable (private mode, quota). Fail silently.
  }
}

// Seed each collection only if it has never been written before, so user
// edits survive reloads while a fresh browser starts from the seed data.
export function seedIfEmpty() {
  const map = {
    [STORAGE_KEYS.students]: seedData.students,
    [STORAGE_KEYS.courses]: seedData.courses,
    [STORAGE_KEYS.enrollments]: seedData.enrollments,
    [STORAGE_KEYS.grades]: seedData.grades,
  };

  for (const [key, value] of Object.entries(map)) {
    if (localStorage.getItem(key) === null) {
      save(key, value);
    }
  }
}

// Load every collection at once after ensuring seed data exists.
export function loadAll() {
  seedIfEmpty();
  return {
    students: load(STORAGE_KEYS.students),
    courses: load(STORAGE_KEYS.courses),
    enrollments: load(STORAGE_KEYS.enrollments),
    grades: load(STORAGE_KEYS.grades),
  };
}
