import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* साइडबार */}
      <Sidebar />

      {/* मुख्य कन्टेन्ट एरिया */}
      <main className="flex-1 ml-50 min-h-screen bg-gray-50 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
