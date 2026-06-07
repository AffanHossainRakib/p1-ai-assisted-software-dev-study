import DataTable from "../../components/shared/DataTable";
import { useData } from "../../context/data-context";
import StudentForm from "./StudentForm";

const COLUMNS = [
  { key: "id", header: "Student ID", sortable: true },
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "program", header: "Program", sortable: true },
  {
    key: "year",
    header: "Year",
    sortable: true,
    render: (row) => `Year ${row.year}`,
  },
];

export default function Students() {
  const { students } = useData();

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Students</h1>
        <p className="mt-1 text-sm text-slate-500">
          Register students and browse the department roster.
        </p>
      </header>

      <StudentForm />

      <div className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900">All Students</h2>
        <DataTable
          columns={COLUMNS}
          data={students}
          searchKeys={["id", "name", "email", "program"]}
          searchPlaceholder="Search students…"
          emptyMessage="No students yet. Register one above."
        />
      </div>
    </section>
  );
}
