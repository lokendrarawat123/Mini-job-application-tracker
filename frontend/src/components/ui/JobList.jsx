import React from "react";
import JobCard from "./JobCard";
// 🌟 १. useGetAllApplicationQuery इम्पोर्ट गर्नुहोस् (सबै लिस्ट तान्नका लागि)
import { useGetAllApplicationQuery } from "../../redux/features/applicationSlice";

const JobList = () => {
  // 🌟 २. सबै एप्लिकेसन तान्न यो हुक चलाउनुहोस्
  const {
    data: applicationData,
    isLoading: applicationLoading,
    error: applicationError,
  } = useGetAllApplicationQuery();

  // ब्याकइन्डबाट आएको एरेलाई सुरक्षित तरिकाले थुत्ने (तपाईंको रेस्पोन्स अनुसार data?.data मा एरे हुन्छ)
  const applications = applicationData?.data || [];

  // ३. यदि डाटाहरू लोड हुँदैछन् भने लोडिङ देखाउने (यसले म्याप एरर आउन दिँदैन)
  if (applicationLoading) {
    return (
      <div className="text-center p-10 text-slate-500">
        Loading applications...
      </div>
    );
  }

  // ४. यदि ब्याकइन्ड बन्द छ वा केही एरर आयो भने यो देखाउने
  if (applicationError) {
    return (
      <div className="text-center p-10 text-rose-500 font-medium">
        Something went wrong while fetching data!
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        Tracked Applications
      </h2>

      {/* 🌟 ५. यदि एरे खाली छ (Length === 0) छ भने सन्देश देखाउने, नत्र लिस्ट म्याप गर्ने */}
      {applications.length === 0 ? (
        <div className="text-center p-12 bg-slate-50 dark:bg-neutral-950 border border-dashed border-slate-200 dark:border-neutral-800 rounded-xl">
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            No applications found. Start by adding a new one!
          </p>
        </div>
      ) : (
        /* RESPONSIVE GRID LAYOUT */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <JobCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
