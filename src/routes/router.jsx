import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../layout/RootLayout";
import Students from "../pages/Students/Students";
import Enrollments from "../pages/Enrollments/Enrollments";
import Grades from "../pages/Grades/Grades";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Navigate to="/students" replace />,
      },
      {
        path: "students",
        Component: Students,
      },
      {
        path: "enrollments",
        Component: Enrollments,
      },
      {
        path: "grades",
        Component: Grades,
      },
    ],
  },
]);

export default router;
