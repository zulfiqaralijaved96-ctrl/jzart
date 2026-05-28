import React from "react";

export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-pulse w-full">
      
      {/* Header and Button skeleton */}
      <div className="flex justify-between items-center w-full">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/3 min-w-[200px]" />
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-full w-32" />
      </div>

      {/* Grid of Stat Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4"
          >
            <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-100" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-slate-100 rounded w-2/3" />
              <div className="h-7 bg-slate-200 rounded-lg w-1/2" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Table / Form Container skeleton */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-6">
        
        {/* Table Search & Filter Bar skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-900 mb-2 w-full">
          <div className="h-10 bg-slate-250 dark:bg-slate-800 rounded-lg w-full sm:w-80" />
          <div className="h-10 bg-slate-250 dark:bg-slate-800 rounded-lg w-full sm:w-48" />
        </div>

        {/* Table Headers skeleton */}
        <div className="border-b border-slate-100 dark:border-slate-850 pb-4">
          <div className="grid grid-cols-6 gap-4">
            <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded w-2/3" />
            <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded w-1/2" />
            <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded w-1/2" />
            <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded w-1/4 text-right" />
          </div>
        </div>

        {/* Table Rows skeleton */}
        <div className="space-y-4 pt-2">
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="grid grid-cols-6 gap-4 py-2 border-b border-slate-50 dark:border-slate-900/50 last:border-none">
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/2 text-right justify-self-end" />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
