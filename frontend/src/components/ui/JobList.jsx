import React, { useState } from "react";
import JobCard from "./JobCard";
import SearchFilter from "./SearchFilter";
import { useGetAllApplicationQuery } from "../../redux/features/applicationSlice";

const JobList = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const {
    data: applicationData,
    isLoading,
    error,
  } = useGetAllApplicationQuery({ status, search });

  const applications = applicationData?.data || [];

  if (isLoading) {
    return <div className="text-center p-10 text-slate-500">Loading applications...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-10 text-rose-500 font-medium">
        Something went wrong while fetching data!
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">Tracked Applications</h2>

      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      {applications.length === 0 ? (
        <div className="text-center p-12 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-500 font-medium">
            No applications found. Start by adding a new one!
          </p>
        </div>
      ) : (
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
