import { useState } from "react";
import { toast } from "sonner";
import Field from "../../components/shared/Field";
import { controlClass } from "../../components/shared/formStyles";
import { useData } from "../../context/data-context";
import { validateGrade } from "../../lib/validation";

const EMPTY = { id: "", studentId: "", courseId: "", grade: "", semester: "" };

export default function GradeForm() {
  const { students, courses, grades, addGrade } = useData();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const setField = (key) => (e) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateGrade(values, { students, courses, grades });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    addGrade({
      id: values.id.trim(),
      studentId: values.studentId,
      courseId: values.courseId,
      grade: Number(values.grade),
      semester: values.semester.trim(),
    });
    toast.success(`Grade "${values.id.trim()}" submitted.`);
    setValues(EMPTY);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-base font-semibold text-slate-900">Submit Grade</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Grade ID" htmlFor="grade-id" required error={errors.id}>
          <input
            id="grade-id"
            value={values.id}
            onChange={setField("id")}
            placeholder="G002"
            className={controlClass(!!errors.id)}
          />
        </Field>

        <Field
          label="Grade (0–100)"
          htmlFor="grade-value"
          required
          error={errors.grade}
        >
          <input
            id="grade-value"
            type="number"
            min="0"
            max="100"
            value={values.grade}
            onChange={setField("grade")}
            placeholder="88"
            className={controlClass(!!errors.grade)}
          />
        </Field>

        <Field label="Student" htmlFor="grade-student" required error={errors.studentId}>
          <select
            id="grade-student"
            value={values.studentId}
            onChange={setField("studentId")}
            className={controlClass(!!errors.studentId)}
          >
            <option value="">Select student…</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id} — {s.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Course" htmlFor="grade-course" required error={errors.courseId}>
          <select
            id="grade-course"
            value={values.courseId}
            onChange={setField("courseId")}
            className={controlClass(!!errors.courseId)}
          >
            <option value="">Select course…</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} — {c.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Semester" htmlFor="grade-semester" required error={errors.semester}>
          <input
            id="grade-semester"
            value={values.semester}
            onChange={setField("semester")}
            placeholder="Spring 2026"
            className={controlClass(!!errors.semester)}
          />
        </Field>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        >
          Add Grade
        </button>
      </div>
    </form>
  );
}
