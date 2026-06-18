import React from "react";
import JobCard from "./JobCard";
import { jobs } from "../../static/job";

const JobList = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        Tracked Applications
      </h2>

      {/* RESPONSIVE GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} application={job} />
        ))}
      </div>
    </div>
  );
};
export default JobList;
