import React from "react";
import { useNavigate } from "react-router-dom";
// 🌟 हामीले अघि सुधारेको साझा मोडल
import { useAddApplicationMutation } from "../../redux/features/applicationSlice"; // 🌟 स्लाइसको Add Mutation
import { toast } from "react-toastify";
import { PlusCircle } from "lucide-react";
import ApplicationFormModal from "../ui/applicatonModal";

export default function AddJob() {
  const navigate = useNavigate();
  const [addApplication, { isLoading }] = useAddApplicationMutation();

  // फर्म सबमिट हुँदा चल्ने फङ्सन
  const handleAddSubmit = async (formData) => {
    try {
      // 🌟 ब्याकइन्डमा नयाँ डाटा POST गर्न स्लाइस कल गरेको
      // तपाईंको स्लाइसमा सिधै 'body: data' भएकोले यहाँ 'formData' मात्र पास गरे पुग्छ
      await addApplication(formData).unwrap();

      toast.success(`${formData.job_title} application added successfully!`);

      // थपिसकेपछि युजरलाई लिस्ट भएको मुख्य पेजमा फर्काइदिने
      navigate("/");
    } catch (error) {
      // ब्याकइन्डबाट एरर आए त्यो देखाउने, नत्र डिफल्ट मेसेज
      const errorMessage =
        error?.data?.message ||
        error?.data?.error ||
        "Failed to add the application";
      toast.error(errorMessage);
      console.error("Add Application Error:", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* पेजको हेडिङ */}
      <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-neutral-800 pb-4">
        <PlusCircle className="size-7 text-indigo-600" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Add New Job Application
        </h2>
      </div>

      {/* 🌟 मोडललाई नै हामीले मोडेल नबनाई सिधै पेजको फर्म जस्तै प्रयोग गर्न सक्छौँ।
        यसका लागि 'isOpen={true}' दिने र 'onClose' मा मुख्य पेजमा ड्यासबोर्डमा फर्काइदिने (Navigate गर्ने)।
      */}
      <ApplicationFormModal
        isOpen={true}
        onClose={() => navigate("/")} // Cancel थिच्दा मुख्य पेजमा फर्कने
        mode="add" // 🌟 मोड 'add' भयो, जसले गर्दा इनपुटहरू खाली हुन्छन् र बटनमा "Add Application" लेखिन्छ
        onSubmit={handleAddSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
