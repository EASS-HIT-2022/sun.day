import React from "react";

function Notifications() {
  return (
    <button
      className="hidden sm:flex py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full "
      aria-label="Bell"
    >
      <img src="/assets/ic_bell.svg" />
      <span className="absolute inset-0 object-right-top -mr-6">
        <div className="inline-flex items-center justify-center w-6 h-6 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-primary">
          12
        </div>
      </span>
    </button>
  );
}

export default Notifications;
