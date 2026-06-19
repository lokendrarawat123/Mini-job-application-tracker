import React from "react";
import { Search, X } from "lucide-react";

const STATUS_TABS = ["all", "applied", "interviewing", "offer", "rejected"];

export default function SearchFilter({ search, onSearchChange, status, onStatusChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by company or job title..."
          className="w-full pl-9 pr-9 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onStatusChange(tab === "all" ? "" : tab)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border capitalize transition-all ${
              (tab === "all" && status === "") || status === tab
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
