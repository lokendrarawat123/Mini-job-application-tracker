import React from "react";
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
  const footerButtons = (
    <div className="flex items-center justify-end gap-3 w-full">
      <Button variant="secondary" size="md" onClick={onClose} className="w-auto!" disabled={isLoading}>
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
      size="md"
      footerContent={footerButtons}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
        <div className="p-3 bg-red-50 rounded-2xl text-red-600 shrink-0">
          <AlertTriangle className="size-6" />
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-semibold text-gray-900">
            Are you sure you want to delete this job application?
          </p>
          {(companyName || jobTitle) && (
            <p className="text-xs text-gray-500 bg-gray-50 p-2 border border-gray-100 rounded-lg inline-block">
              <span className="font-bold text-gray-700">{jobTitle}</span>{" "}
              <span className="text-black">at</span>{" "}
              <span className="font-bold text-gray-700">{companyName}</span>
            </p>
          )}
        </div>
      </div>
    </DetailsModal>
  );
}
