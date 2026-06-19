import React from "react";
import { X } from "lucide-react";

const DetailsModal = ({
  show = false,
  onClose,
  title = "Details",
  children,
  footerContent = null,
  size = "md",
}) => {
  if (!show) return null;

  // विभिन्न साइजका लागि बूटस्ट्र्याप/टेलविन्ड म्याक्स-विड्थ क्लासहरू
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

  return (
    // मुख्य र्‍यापर: यसले मोडललाई स्क्रिनको बीचमा (होरिजोन्टल र भर्टिकल दुवै) राख्छ
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0 overflow-hidden">
      {/* Background Overlay (कालो धमिलो पृष्ठभूमि) */}
      <div className="fixed inset-0 transition-opacity" onClick={onClose}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
      </div>

      {/* Modal Container (मुख्य सेतो बाकस) */}
      <div
        className={`bg-white text-left shadow-2xl transform transition-all 
          ${sizeClasses[size]} w-full relative 
          max-h-[90vh] flex flex-col rounded-2xl border border-gray-200/80 z-10`}
      >
        {/* Modern Header (फिक्स्ड हेडलाइन एरिया) */}
        <div className="relative bg-white border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5">
            <div className="flex items-center space-x-3">
              {/* बायाँ पट्टिको इन्डिगो धर्का */}
              <div className="w-1 h-7 bg-indigo-600 rounded-full"></div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  {title}
                </h3>
              </div>
            </div>

            {/* बन्द गर्ने (X) बटन */}
            <button
              onClick={onClose}
              className="group p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <X className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>
          </div>
        </div>

        {/* Content Area (यो मात्र स्क्रोल हुन्छ, फुटर र हेडर हल्लिँदैनन्) */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 overflow-y-auto flex-1 text-slate-700">
          {children}
        </div>

        {/* Optional Footer (फिक्स्ड एक्सन बटन एरिया) */}
        {footerContent && (
          <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-4 border-t border-gray-100 flex-shrink-0 rounded-b-2xl">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsModal;
