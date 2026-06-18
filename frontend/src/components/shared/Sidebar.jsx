import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle } from "lucide-react"; // सफा र राम्रो आइकनहरू
import logo from "../../assets/miniJob_logo.png";

// १. एकदम साधारण मेनु र पाथ (Path) भएको एरे (Array)
const MENU_ITEMS = [
  {
    path: "/",
    name: "My Applications",
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    path: "/add-job",
    name: "Add Job",
    icon: <PlusCircle className="size-5" />,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-50 bg-white dark:bg-neutral-900 border-r border-slate-300 dark:border-neutral-700 py-6 px-4 overflow-y-auto">
      {/* लोगो */}
      <div className="mb-8 px-3">
        <img src={logo} alt="Mini Job Tracker Logo" className="h-9 w-auto" />
      </div>

      {/* २. मेनु म्यापिङ (Map) */}
      <nav aria-label="Primary sidebar navigation">
        <ul className="space-y-1 text-sm text-slate-800 dark:text-slate-400 font-medium">
          {MENU_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                // React Router को `isActive` ले कुन पेज खुला छ आफैं पत्ता लगाउँछ
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors text-left
                  ${
                    isActive
                      ? "text-blue-700 dark:text-slate-50 bg-blue-50 dark:bg-neutral-800 font-semibold"
                      : "hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-neutral-800"
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
