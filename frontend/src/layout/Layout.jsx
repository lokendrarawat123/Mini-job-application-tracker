import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 ml-50 min-h-screen bg-gray-50 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
