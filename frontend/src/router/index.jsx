import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/layout";
import { UserRoutes } from "./userRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: UserRoutes,
  },

  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
]);
