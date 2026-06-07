import { useMemo } from "react";
import DataTable from "../../components/shared/DataTable";
import { useData } from "../../context/data-context";
import EnrollmentForm from "./EnrollmentForm";

function NamedRef({ name, id }) {
  return (
    <span className="flex flex-col">
      <span className="text-slate-800">{name}</span>
      <span className="text-xs text-slate-400">{id}</span>
    </span>
  );
}

const COLUMNS = [
  { key: "id", header: "Enrollment ID", sortable: true },
  {
    key: "studentName",
    header: "Student",
    sortable: true,
    render: (row) => <NamedRef name={row.studentName} id={row.studentId} />,
  },
  {
    key: "courseName",
    header: "Course",
    sortable: true,
    render: (row) => <NamedRef name={row.courseName} id={row.courseId} />,
  },
  { key: "date", header: "Date", sortable: true },
];

export default function Enrollments() {
  const { enrollments, students, courses } = useData();

  const rows = useMemo(() => {
    const studentName = new Map(students.map((s) => [s.id, s.name]));
    const courseName = new Map(courses.map((c) => [c.id, c.name]));
    return enrollments.map((e) => ({
      ...e,
      studentName: studentName.get(e.studentId) ?? "Unknown",
      courseName: courseName.get(e.courseId) ?? "Unknown",
    }));
  }, [enrollments, students, courses]);

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Enrollments</h1>
        <p className="mt-1 text-sm text-slate-500">
          Enroll students into courses and review existing enrollments.
        </p>
      </header>

      <EnrollmentForm />

      <div className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900">All Enrollments</h2>
        <DataTable
          columns={COLUMNS}
          data={rows}
          searchKeys={["id", "studentId", "studentName", "courseId", "courseName"]}
          searchPlaceholder="Search enrollments…"
          emptyMessage="No enrollments yet. Add one above."
        />
      </div>
    </section>
  );
}
