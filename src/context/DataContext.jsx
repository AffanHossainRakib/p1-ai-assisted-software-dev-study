// Single source of truth for all collections. Hydrates from localStorage
// (seeding on first run) and persists every mutation back.
import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEYS, loadAll, save } from "../lib/storage";
import { DataContext } from "./data-context";

export function DataProvider({ children }) {
  const [data, setData] = useState(() => loadAll());

  // Keep each collection mirrored to localStorage whenever it changes.
  useEffect(() => save(STORAGE_KEYS.students, data.students), [data.students]);
  useEffect(() => save(STORAGE_KEYS.courses, data.courses), [data.courses]);
  useEffect(
    () => save(STORAGE_KEYS.enrollments, data.enrollments),
    [data.enrollments],
  );
  useEffect(() => save(STORAGE_KEYS.grades, data.grades), [data.grades]);

  const addStudent = useCallback((student) => {
    setData((prev) => ({ ...prev, students: [...prev.students, student] }));
  }, []);

  const addEnrollment = useCallback((enrollment) => {
    setData((prev) => ({
      ...prev,
      enrollments: [...prev.enrollments, enrollment],
    }));
  }, []);

  const addGrade = useCallback((grade) => {
    setData((prev) => ({ ...prev, grades: [...prev.grades, grade] }));
  }, []);

  const value = {
    students: data.students,
    courses: data.courses,
    enrollments: data.enrollments,
    grades: data.grades,
    addStudent,
    addEnrollment,
    addGrade,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
