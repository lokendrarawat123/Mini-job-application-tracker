import React, { useState } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";

export default function Hero() {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTitle, "in", searchLocation);
    // Add your search routing or API logic here
  };

  const popularTags = ["React", "Remote", "Python", "Designer", "Marketing"];

  return (
    <section className="relative bg-linear-to-br from-blue-50 via-white to-indigo-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-20 md:py-32 px-4 overflow-hidden">
      {/* Decorative Background Blur Elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-300 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-300 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Active Jobs Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-400 text-xs md:text-sm font-medium px-4 py-1.5 rounded-full shadow-sm">
          <Briefcase className="size-4" />
          <span>Over 25,000+ active jobs listed today</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Discover Your Dream{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Career
          </span>{" "}
          Path
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal">
          Find internships, part-time shifts, and full-time positions from the
          world's leading companies and tech startups.
        </p>

        {/* Search Input Box */}
        <form
          onSubmit={handleSearch}
          className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-3 md:p-4 rounded-2xl shadow-xl max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-2"
        >
          {/* Job Title Field */}
          <div className="w-full flex items-center gap-2.5 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-100 dark:border-neutral-800">
            <Search className="text-slate-400 dark:text-slate-500 size-5 shrink-0" />
            <input
              type="text"
              placeholder="Job title, keywords, or company..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-sm md:text-base"
            />
          </div>

          {/* Location Field */}
          <div className="w-full flex items-center gap-2.5 px-3 py-2">
            <MapPin className="text-slate-400 dark:text-slate-500 size-5 shrink-0" />
            <input
              type="text"
              placeholder="City, state, or Remote..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-sm md:text-base"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-8 py-3 rounded-xl shadow-md transition-all duration-200 text-sm md:text-base whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
          >
            Find Jobs
          </button>
        </form>

        {/* Quick Search Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm text-slate-500 dark:text-slate-400">
          <span className="font-medium">Popular searches:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchTitle(tag)}
              className="bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
