import React from "react";
import { DotsVerticalIcon } from "@heroicons/react/outline";

function Widget(props) {
  const renderIcon = () => {
    return (
      <div className="flex gap-3">
        <img src={props.icon} className="w-6" />
        {props.title}
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col justify-between bg-white rounded-3xl font-sans p-6 shadow-sm ${props.style}`}
    >
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">
          {props.icon ? renderIcon() : props.title}
        </h3>
        <button className="">
          <DotsVerticalIcon className="h-6 w-6" />
        </button>
      </div>
      {props.children}
    </div>
  );
}

export default Widget;
