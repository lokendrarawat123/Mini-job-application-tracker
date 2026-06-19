import React, { useState } from "react";
import {
  Calendar,
  Building2,
  FileText,
  Trash2,
  Edit3,
  Eye,
  Briefcase,
  Tag,
} from "lucide-react";
import Button from "../shared/Button";
import DeleteConfirmModal from "../shared/DeleteModal";
import DetailsModal from "../shared/modal";
import {
  useDeleteApplicationMutation,
  useUpdateApplicationMutation,
} from "../../redux/features/applicationSlice";
import { toast } from "react-toastify";
import ApplicationFormModal from "./applicatonModal";

export default function JobCard({ application }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const [deleteApplication, { isLoading: isDeleting }] = useDeleteApplicationMutation();
  const [updateApplication, { isLoading: isUpdating }] = useUpdateApplicationMutation();

  const typeStyles = {
    "full-time": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "part-time": "bg-amber-50 text-amber-700 border-amber-200",
    internship: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const statusStyles = {
    applied: "bg-blue-50 text-blue-700 border-blue-200",
    interviewing: "bg-indigo-50 text-indigo-700 border-indigo-200",
    offer: "bg-teal-50 text-teal-700 border-teal-200",
    rejected: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const handleUpdateSubmit = async (formData) => {
    try {
      await updateApplication({ id: application.id, data: formData }).unwrap();
      toast.success(`${formData.job_title} updated successfully!`);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update");
    } finally {
      setEditModal(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteApplication(application.id).unwrap();
      toast.success("Application deleted successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete");
    } finally {
      setDeleteModal(false);
    }
  };

  const viewFooter = (
    <div className="flex justify-end">
      <Button variant="secondary" onClick={() => setViewModal(false)} className="w-auto! px-5">
        Close
      </Button>
    </div>
  );

  return (
    <>
      <div className="group relative bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4">
        <div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
              <Building2 className="size-4 text-slate-400" />
              <span className="capitalize">{application.company_name}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">{application.job_title}</h3>
          </div>

          <div className="flex flex-wrap gap-2 mt-3 mb-4">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-md border capitalize ${typeStyles[application.job_type?.toLowerCase()] || "bg-slate-50"}`}
            >
              {application.job_type}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-md border capitalize ${statusStyles[application.status?.toLowerCase()] || "bg-slate-50"}`}
            >
              {application.status}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            <span>
              Applied on{" "}
              {new Date(application.applied_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setViewModal(true)}
              className="w-auto! text-slate-500 hover:text-blue-600 hover:bg-blue-50"
              title="See Details"
            >
              <Eye className="size-4" />
            </Button>

            <Button
              variant="secondary"
              size="sm"
              disabled={application.status?.toLowerCase() === "rejected"}
              onClick={() => {
                if (application.status?.toLowerCase() !== "rejected") setEditModal(true);
              }}
              className={`w-auto! text-slate-500 transition-all ${
                application.status?.toLowerCase() === "rejected"
                  ? "opacity-40 cursor-not-allowed hover:bg-transparent text-slate-400"
                  : "hover:text-amber-600 hover:bg-amber-50"
              }`}
              title={
                application.status?.toLowerCase() === "rejected"
                  ? "Rejected applications cannot be edited"
                  : "Edit Application"
              }
            >
              <Edit3 className="size-4" />
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDeleteModal(true)}
              className="w-auto! text-slate-500 hover:text-rose-600 hover:bg-rose-50"
              title="Delete Application"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <ApplicationFormModal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        mode="update"
        initialData={application}
        onSubmit={handleUpdateSubmit}
        isLoading={isUpdating}
      />

      <DetailsModal
        show={viewModal}
        onClose={() => setViewModal(false)}
        title="Application Details"
        size="md"
        footerContent={viewFooter}
      >
        <div className="space-y-5 text-slate-700">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-sm font-semibold text-indigo-600 mb-1 flex items-center gap-1.5">
              <Building2 className="size-4" /> {application.company_name}
            </div>
            <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="size-5 text-slate-500" /> {application.job_title}
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Job Type
              </span>
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg border capitalize ${typeStyles[application.job_type?.toLowerCase()] || "bg-slate-50"}`}
              >
                {application.job_type}
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Current Status
              </span>
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg border capitalize ${statusStyles[application.status?.toLowerCase()] || "bg-slate-50"}`}
              >
                {application.status}
              </span>
            </div>
            <div className="col-span-2">
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Applied On
              </span>
              <p className="font-medium text-slate-800 flex items-center gap-1.5">
                <Calendar className="size-4 text-slate-400" />
                {new Date(application.applied_date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="space-y-1.5 border-t border-slate-100 pt-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Notes / Reminders
            </span>
            {application.notes ? (
              <p className="bg-slate-50 text-sm border border-slate-100 rounded-xl p-3 text-slate-600 whitespace-pre-line leading-relaxed">
                {application.notes}
              </p>
            ) : (
              <p className="text-sm italic text-slate-400">No notes added for this job application.</p>
            )}
          </div>
        </div>
      </DetailsModal>

      <DeleteConfirmModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        companyName={application.company_name}
        jobTitle={application.job_title}
      />
    </>
  );
}
