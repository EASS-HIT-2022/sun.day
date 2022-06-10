import React from "react";

function CustomerCardLoading() {
  return (
    <div className="flex flex-col gap-4 justify-between bg-white rounded-3xl font-sans p-6 shadow-sm">
      <div className="flex gap-3 font-semibold text-lg">
        <img src="/assets/icons/PersonBadgeFill.svg" className="w-6" />
        כרטיס לקוח:
      </div>
      <div className="animate-pulse flex gap-4 space-x-4 justify-center items-center">
        <div className="rounded-full bg-slate-300 h-28 w-28"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-3 bg-slate-300 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-300 rounded col-span-1"></div>
              <div className="h-3 bg-slate-300 rounded col-span-1"></div>
              <div className="h-3 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-300 rounded col-span-1"></div>
              <div className="h-3 bg-slate-300 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerCardLoading;
