import React, { useState, useEffect } from "react";
import Button from "../shared/Button";
import DetailsModal from "../shared/modal";

export default function ApplicationFormModal({
  isOpen,
  onClose,
  mode = "update",
  initialData,
  onSubmit,
  isLoading,
}) {
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    company_name: "",
    job_title: "",
    job_type: "full-time",
    status: "applied",
    applied_date: getTodayDate(),
    notes: "",
  });

  useEffect(() => {
    if (mode === "update" && initialData) {
      const formattedDate = initialData.applied_date
        ? new Date(initialData.applied_date).toISOString().split("T")[0]
        : getTodayDate();
      setFormData({ ...initialData, applied_date: formattedDate });
    } else if (mode === "add") {
      setFormData({
        company_name: "",
        job_title: "",
        job_type: "full-time",
        status: "applied",
        applied_date: getTodayDate(),
        notes: "",
      });
    }
  }, [initialData, mode, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const footerContent = (
    <div className="flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-2 w-full sm:w-auto">
      <Button
        variant="secondary"
        onClick={onClose}
        disabled={isLoading}
        className="w-full sm:!w-auto justify-center"
      >
        Cancel
      </Button>
      <Button
        onClick={handleSubmit}
        isLoading={isLoading}
        className="w-full sm:!w-auto justify-center bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm whitespace-nowrap"
      >
        {mode === "update" ? "Save Changes" : "Add Application"}
      </Button>
    </div>
  );

  return (
    <DetailsModal
      show={isOpen}
      onClose={onClose}
      title={mode === "update" ? "Update Application" : "Add New Application"}
      size="lg"
      footerContent={footerContent}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5 text-left max-h-[60vh] sm:max-h-none overflow-y-auto px-1 py-2"
      >
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Company Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
            placeholder="e.g. Next Infosys"
            className="w-full p-2.5 border rounded-xl bg-white border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Job Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            required
            placeholder="e.g. React Developer"
            className="w-full p-2.5 border rounded-xl bg-white border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Job Type</label>
            <select
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-xl bg-white border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all capitalize"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-xl bg-white border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all capitalize"
            >
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Applied Date <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            name="applied_date"
            value={formData.applied_date}
            onChange={handleChange}
            required
            className="w-full p-2.5 border rounded-xl bg-white border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">Notes</label>
          <textarea
            name="notes"
            value={formData.notes || ""}
            onChange={handleChange}
            rows={3}
            placeholder="Add specific details..."
            className="w-full p-2.5 border rounded-xl bg-white border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none"
          />
        </div>
      </form>
    </DetailsModal>
  );
}
