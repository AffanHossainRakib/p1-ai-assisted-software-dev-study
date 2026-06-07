import { useState } from "react";
import { toast } from "sonner";
import Field from "../../components/shared/Field";
import { controlClass } from "../../components/shared/formStyles";
import { useData } from "../../context/data-context";
import {
  validateStudent,
  describeStudentId,
  currentAdmissionCode,
} from "../../lib/validation";

const PROGRAMS = ["CSE", "EEE", "BBA", "Civil", "Mechanical", "English"];
const YEARS = [1, 2, 3, 4, 5];

const EMPTY = { id: "", name: "", email: "", program: "", year: "" };

export default function StudentForm() {
  const { students, addStudent } = useData();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const setField = (key) => (e) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateStudent(values, students);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    const name = values.name.trim();
    addStudent({
      id: values.id.trim(),
      name,
      email: values.email.trim(),
      program: values.program,
      year: Number(values.year),
    });
    toast.success(`Student "${name}" registered.`);
    setValues(EMPTY);
    setErrors({});
  };

  const breakdown = describeStudentId(values.id);
  const idHint = breakdown
    ? `Admission ${breakdown.admissionYear} · ${breakdown.shift} shift · Serial ${breakdown.serial}`
    : `7 digits — ${currentAdmissionCode()}(year) + shift(1=Morning,2=Day) + 4-digit serial`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-base font-semibold text-slate-900">Register Student</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Student ID" htmlFor="student-id" required error={errors.id} hint={idHint}>
          <input
            id="student-id"
            value={values.id}
            onChange={setField("id")}
            placeholder="2620009"
            inputMode="numeric"
            className={controlClass(!!errors.id)}
          />
        </Field>

        <Field label="Name" htmlFor="student-name" required error={errors.name}>
          <input
            id="student-name"
            value={values.name}
            onChange={setField("name")}
            placeholder="Ayesha Rahman"
            className={controlClass(!!errors.name)}
          />
        </Field>

        <Field label="Email" htmlFor="student-email" required error={errors.email}>
          <input
            id="student-email"
            type="email"
            value={values.email}
            onChange={setField("email")}
            placeholder="ayesha@uni.edu"
            className={controlClass(!!errors.email)}
          />
        </Field>

        <Field label="Program" htmlFor="student-program" required error={errors.program}>
          <select
            id="student-program"
            value={values.program}
            onChange={setField("program")}
            className={controlClass(!!errors.program)}
          >
            <option value="">Select program…</option>
            {PROGRAMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Academic Year" htmlFor="student-year" required error={errors.year}>
          <select
            id="student-year"
            value={values.year}
            onChange={setField("year")}
            className={controlClass(!!errors.year)}
          >
            <option value="">Select year…</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                Year {y}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        >
          Add Student
        </button>
      </div>
    </form>
  );
}
