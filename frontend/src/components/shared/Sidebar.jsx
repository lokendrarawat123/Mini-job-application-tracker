import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle } from "lucide-react";
import logo from "../../assets/miniJob_logo.png";

const MENU_ITEMS = [
  { path: "/", name: "My Applications", icon: <LayoutDashboard className="size-5" /> },
  { path: "/add-job", name: "Add Application", icon: <PlusCircle className="size-5" /> },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-50 bg-white border-r border-slate-300 py-6 px-4 overflow-y-auto">
      <div className="mb-8 px-2">
        <div className="flex items-center gap-2.5 px-1">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600 shadow-md shadow-indigo-200 shrink-0">
            <img src={logo} alt="" className="w-5 h-5 object-contain brightness-0 invert" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-slate-900 tracking-tight">MiniJob</p>
            <p className="text-[10px] text-slate-400 font-medium">Application Tracker</p>
          </div>
        </div>
      </div>

      <nav aria-label="Primary sidebar navigation">
        <ul className="space-y-1 text-sm text-slate-800 font-medium">
          {MENU_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors text-left ${
                    isActive
                      ? "text-blue-700 bg-blue-50 font-semibold"
                      : "hover:text-slate-900 hover:bg-slate-100"
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
