import React from "react";
import { X } from "lucide-react";

const sizeClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
  "6xl": "sm:max-w-6xl",
  "7xl": "sm:max-w-7xl",
};

const DetailsModal = ({
  show = false,
  onClose,
  title = "Details",
  children,
  footerContent = null,
  size = "md",
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0 overflow-hidden">
      <div className="fixed inset-0 transition-opacity" onClick={onClose}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
      </div>

      <div
        className={`bg-white text-left shadow-2xl transform transition-all ${sizeClasses[size]} w-full relative max-h-[90vh] flex flex-col rounded-2xl border border-gray-200/80 z-10`}
      >
        <div className="relative bg-white border-b border-gray-100 shrink-0">
          <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-7 bg-indigo-600 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="group p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <X className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 sm:px-8 sm:py-6 overflow-y-auto flex-1 text-slate-700">
          {children}
        </div>

        {footerContent && (
          <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-4 border-t border-gray-100 shrink-0 rounded-b-2xl">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsModal;
