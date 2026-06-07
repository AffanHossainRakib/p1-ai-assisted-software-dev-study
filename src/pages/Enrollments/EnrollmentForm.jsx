import { useState } from "react";
import { toast } from "sonner";
import Field from "../../components/shared/Field";
import { controlClass } from "../../components/shared/formStyles";
import { useData } from "../../context/data-context";
import { validateEnrollment } from "../../lib/validation";

const EMPTY = { id: "", studentId: "", courseId: "", date: "" };

export default function EnrollmentForm() {
  const { students, courses, enrollments, addEnrollment } = useData();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const setField = (key) => (e) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateEnrollment(values, { students, courses, enrollments });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    addEnrollment({
      id: values.id.trim(),
      studentId: values.studentId,
      courseId: values.courseId,
      date: values.date,
    });
    toast.success(`Enrollment "${values.id.trim()}" recorded.`);
    setValues(EMPTY);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-base font-semibold text-slate-900">Enroll Student</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Enrollment ID" htmlFor="enrollment-id" required error={errors.id}>
          <input
            id="enrollment-id"
            value={values.id}
            onChange={setField("id")}
            placeholder="E003"
            className={controlClass(!!errors.id)}
          />
        </Field>

        <Field label="Enrollment Date" htmlFor="enrollment-date" required error={errors.date}>
          <input
            id="enrollment-date"
            type="date"
            value={values.date}
            onChange={setField("date")}
            className={controlClass(!!errors.date)}
          />
        </Field>

        <Field label="Student" htmlFor="enrollment-student" required error={errors.studentId}>
          <select
            id="enrollment-student"
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

        <Field label="Course" htmlFor="enrollment-course" required error={errors.courseId}>
          <select
            id="enrollment-course"
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
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        >
          Add Enrollment
        </button>
      </div>
    </form>
  );
}
