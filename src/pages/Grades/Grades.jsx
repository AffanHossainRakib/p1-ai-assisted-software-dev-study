import { useMemo } from "react";
import DataTable from "../../components/shared/DataTable";
import { useData } from "../../context/data-context";
import GradeForm from "./GradeForm";

function NamedRef({ name, id }) {
  return (
    <span className="flex flex-col">
      <span className="text-slate-800">{name}</span>
      <span className="text-xs text-slate-400">{id}</span>
    </span>
  );
}

function GradeBadge({ value }) {
  const color =
    value >= 80
      ? "bg-green-100 text-green-700"
      : value >= 50
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-700";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${color}`}>
      {value}
    </span>
  );
}

const COLUMNS = [
  { key: "id", header: "Grade ID", sortable: true },
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
  {
    key: "grade",
    header: "Grade",
    sortable: true,
    render: (row) => <GradeBadge value={row.grade} />,
  },
  { key: "semester", header: "Semester", sortable: true },
];

export default function Grades() {
  const { grades, students, courses } = useData();

  const rows = useMemo(() => {
    const studentName = new Map(students.map((s) => [s.id, s.name]));
    const courseName = new Map(courses.map((c) => [c.id, c.name]));
    return grades.map((g) => ({
      ...g,
      studentName: studentName.get(g.studentId) ?? "Unknown",
      courseName: courseName.get(g.courseId) ?? "Unknown",
    }));
  }, [grades, students, courses]);

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Grades</h1>
        <p className="mt-1 text-sm text-slate-500">
          Submit grades (0–100) and review submitted results.
        </p>
      </header>

      <GradeForm />

      <div className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900">All Grades</h2>
        <DataTable
          columns={COLUMNS}
          data={rows}
          searchKeys={["id", "studentId", "studentName", "courseId", "courseName", "semester"]}
          searchPlaceholder="Search grades…"
          emptyMessage="No grades yet. Submit one above."
        />
      </div>
    </section>
  );
}
