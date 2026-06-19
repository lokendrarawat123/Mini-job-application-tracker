import React from "react";

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [], // [{ value: 'applied', label: 'Applied' }]
  error,
  required = false,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      {/* Select Tag */}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full appearance-none bg-white dark:bg-neutral-900 border ${
            error
              ? "border-rose-500 focus:ring-rose-500"
              : "border-slate-200 dark:border-neutral-800 focus:border-blue-500 focus:ring-blue-500/20"
          } rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-size-[1.25rem] bg-position-[right_0.875rem_center] bg-no-repeat`}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <span className="text-xs font-medium text-rose-500 mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
}
