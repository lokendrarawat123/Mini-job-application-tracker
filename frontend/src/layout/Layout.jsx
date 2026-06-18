import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* साइडबार */}
      <Sidebar />

      {/* मुख्य कन्टेन्ट एरिया */}
      <main className="flex-1 ml-64 min-h-screen bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
