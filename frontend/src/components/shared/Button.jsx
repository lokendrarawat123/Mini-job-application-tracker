import React from "react";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  onClick,
  className = "",
}) {
  const baseStyles =
    "flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none w-full sm:w-auto";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-100",
    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-md gap-1.5",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base rounded-xl gap-2.5",
    xl: "px-6 py-3.5 text-lg rounded-xl gap-3",
    "2xl": "px-7 py-4 text-xl rounded-2xl gap-3.5",
    "3xl": "px-8 py-5 text-2xl rounded-3xl gap-4",
  };

  const iconSizes = {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
    xl: "size-6",
    "2xl": "size-7",
    "3xl": "size-8",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {isLoading && <Loader2 className={`animate-spin ${iconSizes[size]}`} />}
      {children}
    </button>
  );
}
