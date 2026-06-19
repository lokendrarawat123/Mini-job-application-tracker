import React from "react";
import { useNavigate } from "react-router-dom";
import { useAddApplicationMutation } from "../../redux/features/applicationSlice";
import { toast } from "react-toastify";
import { PlusCircle } from "lucide-react";
import ApplicationFormModal from "../ui/applicatonModal";

export default function AddJob() {
  const navigate = useNavigate();
  const [addApplication, { isLoading }] = useAddApplicationMutation();

  const handleAddSubmit = async (formData) => {
    try {
      await addApplication(formData).unwrap();
      toast.success(`${formData.job_title} application added successfully!`);
      navigate("/");
    } catch (error) {
      toast.error(
        error?.data?.message || error?.data?.error || "Failed to add the application"
      );
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
        <PlusCircle className="size-7 text-indigo-600" />
        <h2 className="text-2xl font-bold text-slate-900">Add New Job Application</h2>
      </div>

      <ApplicationFormModal
        isOpen={true}
        onClose={() => navigate("/")}
        mode="add"
        onSubmit={handleAddSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
