import React from "react";
import {
  Calendar,
  Briefcase,
  Building2,
  ChevronRight,
  FileText,
} from "lucide-react";

export default function JobCard({ application }) {
  const { company_name, job_title, job_type, status, applied_date, notes } =
    application;

  // Colors for Job Type Badges
  const typeStyles = {
    "Full-time":
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900",
    "Part-time":
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900",
    Internship:
      "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900",
  };

  // Colors for Application Status Badges
  const statusStyles = {
    Applied:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900",
    Interviewing:
      "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-900",
    Offer:
      "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-900",
    Rejected:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900",
  };

  return (
    <div className="group relative bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4">
      {/* CARD HEADER */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          {/* Company & Title */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
              <Building2 className="size-4 text-slate-400" />
              <span>{company_name}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {job_title}
            </h3>
          </div>

          {/* Action Arrow Icon on Hover */}
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg bg-slate-50 dark:bg-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* BADGES (Job Type & Status) */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${typeStyles[job_type] || "bg-slate-50 text-slate-700"}`}
          >
            {job_type}
          </span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${statusStyles[status] || "bg-slate-50 text-slate-700"}`}
          >
            {status}
          </span>
        </div>

        {/* NOTES SECTION (Optional) */}
        {notes ? (
          <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-neutral-800/50 rounded-lg p-2.5 border border-slate-100 dark:border-neutral-800/80 line-clamp-2">
            <FileText className="size-3.5 inline mr-1 text-slate-400 align-text-bottom" />
            {notes}
          </p>
        ) : (
          <p className="text-xs italic text-slate-400 dark:text-slate-600">
            No notes added yet.
          </p>
        )}
      </div>

      {/* CARD FOOTER */}
      <div className="pt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-medium">
        <div className="flex items-center gap-1">
          <Calendar className="size-3.5" />
          <span>
            Applied on{" "}
            {new Date(applied_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
