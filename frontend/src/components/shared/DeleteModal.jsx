import React from "react";
// तपाईंको मोडलको पाथ
import Button from "../shared/Button";
import { AlertTriangle } from "lucide-react";
import DetailsModal from "./modal";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  companyName = "",
  jobTitle = "",
}) {
  // मोडलको तल बस्ने एक्सन बटनहरू (Footer)
  const footerButtons = (
    <div className="flex items-center justify-end gap-3 w-full">
      <Button
        variant="secondary"
        size="md"
        onClick={onClose}
        className="w-auto!"
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button
        type="button"
        variant="danger"
        size="md"
        isLoading={isLoading}
        className="w-auto! bg-red-600 hover:bg-red-700 shadow-rose-100"
        onClick={onConfirm}
      >
        Yes, Delete
      </Button>
    </div>
  );

  return (
    <DetailsModal
      show={isOpen}
      onClose={onClose}
      title="Delete Application?"
      size="md" // डिलिट वार्निङका लागि सानो 'md' साइज एकदम ठीक हुन्छ
      footerContent={footerButtons}
    >
      {/* MODAL CONTENT */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
        {/* Warning Icon Background */}
        <div className="p-3 bg-red-50 dark:bg-rose-950/30 rounded-2xl text-red-600 shrink-0">
          <AlertTriangle className="size-6" />
        </div>

        {/* Warning Message */}
        <div className="space-y-1.5">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Are you sure you want to delete this job application?
          </p>
          {(companyName || jobTitle) && (
            <p className="text-xs text-gray-500 bg-gray-50 dark:bg-neutral-800 p-2 border border-gray-100 dark:border-neutral-700/50 rounded-lg inline-block">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {jobTitle}
              </span>
              {""} <span className="text-black">at</span> {""}
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {companyName}
              </span>
            </p>
          )}
        </div>
      </div>
    </DetailsModal>
  );
}
