import Home from "../components/page/Home";
import JobDashboard from "../components/page/JobDashboard";

export const UserRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "add-job",
    element: <JobDashboard />,
  },
];
