// Pure validation helpers. Each `validate*` returns an object of
// { fieldName: errorMessage }; an empty object means the record is valid.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Two-digit admission code for the current year, e.g. 2026 -> "26".
export function currentAdmissionCode() {
  return String(new Date().getFullYear()).slice(-2);
}

export const SHIFTS = { 1: "Morning", 2: "Day" };

// Validate the 7-digit student ID format: YYSNNNN
//   YY  = admission year (must be the current year)
//   S   = shift (1 = Morning, 2 = Day)
//   NNNN = serial number
// Returns an error string, or null when valid.
export function validateStudentId(id) {
  const value = String(id ?? "").trim();
  if (!value) return "Student ID is required.";
  if (!/^\d{7}$/.test(value)) return "Student ID must be exactly 7 digits.";

  const year = value.slice(0, 2);
  const shift = value[2];
  const expected = currentAdmissionCode();

  if (year !== expected) {
    return `Admission year must be ${expected} (registration is for the current year only).`;
  }
  if (shift !== "1" && shift !== "2") {
    return "Shift digit (3rd) must be 1 (Morning) or 2 (Day).";
  }
  return null;
}

// Human-readable breakdown of a valid student ID, for UI hints.
export function describeStudentId(id) {
  const value = String(id ?? "").trim();
  if (!/^\d{7}$/.test(value)) return null;
  return {
    admissionYear: `20${value.slice(0, 2)}`,
    shift: SHIFTS[value[2]] ?? "Unknown",
    serial: value.slice(3),
  };
}

export function validateStudent(values, existingStudents = []) {
  const errors = {};

  const idError = validateStudentId(values.id);
  if (idError) {
    errors.id = idError;
  } else if (existingStudents.some((s) => s.id === String(values.id).trim())) {
    errors.id = "A student with this ID already exists.";
  }

  if (!String(values.name ?? "").trim()) {
    errors.name = "Name is required.";
  }

  const email = String(values.email ?? "").trim();
  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!String(values.program ?? "").trim()) {
    errors.program = "Program is required.";
  }

  const year = Number(values.year);
  if (!values.year && values.year !== 0) {
    errors.year = "Academic year is required.";
  } else if (!Number.isInteger(year) || year < 1 || year > 5) {
    errors.year = "Academic year must be between 1 and 5.";
  }

  return errors;
}

export function validateEnrollment(values, { students = [], courses = [], enrollments = [] }) {
  const errors = {};

  const id = String(values.id ?? "").trim();
  if (!id) {
    errors.id = "Enrollment ID is required.";
  } else if (enrollments.some((e) => e.id === id)) {
    errors.id = "An enrollment with this ID already exists.";
  }

  const studentId = String(values.studentId ?? "").trim();
  if (!studentId) {
    errors.studentId = "Student is required.";
  } else if (!students.some((s) => s.id === studentId)) {
    errors.studentId = "No student found with this ID.";
  }

  const courseId = String(values.courseId ?? "").trim();
  if (!courseId) {
    errors.courseId = "Course is required.";
  } else if (!courses.some((c) => c.id === courseId)) {
    errors.courseId = "No course found with this ID.";
  }

  if (!String(values.date ?? "").trim()) {
    errors.date = "Enrollment date is required.";
  }

  return errors;
}

export function validateGrade(values, { students = [], courses = [], grades = [] }) {
  const errors = {};

  const id = String(values.id ?? "").trim();
  if (!id) {
    errors.id = "Grade ID is required.";
  } else if (grades.some((g) => g.id === id)) {
    errors.id = "A grade with this ID already exists.";
  }

  const studentId = String(values.studentId ?? "").trim();
  if (!studentId) {
    errors.studentId = "Student is required.";
  } else if (!students.some((s) => s.id === studentId)) {
    errors.studentId = "No student found with this ID.";
  }

  const courseId = String(values.courseId ?? "").trim();
  if (!courseId) {
    errors.courseId = "Course is required.";
  } else if (!courses.some((c) => c.id === courseId)) {
    errors.courseId = "No course found with this ID.";
  }

  if (values.grade === "" || values.grade === null || values.grade === undefined) {
    errors.grade = "Grade is required.";
  } else {
    const grade = Number(values.grade);
    if (Number.isNaN(grade) || grade < 0 || grade > 100) {
      errors.grade = "Grade must be between 0 and 100.";
    }
  }

  if (!String(values.semester ?? "").trim()) {
    errors.semester = "Semester is required.";
  }

  return errors;
}
