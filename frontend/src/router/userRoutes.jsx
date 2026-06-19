import AddJob from "../components/page/AddJob";
import Home from "../components/page/Home";

export const UserRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "add-job",
    element: <AddJob />,
  },
];
