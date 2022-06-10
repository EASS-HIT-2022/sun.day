import React from "react";

function Avatar(props) {
  return (
    <div className="flex space-x-2">
      <div
        className={`relative ${
          props.size ? `w-${props.size} h-${props.size}` : "w-12 h-12"
        }`}
      >
        <img
          className={`rounded-full border border-gray-100 shadow-sm object-cover ${
            props.size ? `w-${props.size} h-${props.size}` : "w-12 h-12"
          }`}
          src={props.src ? props.src : "/assets/avatar.svg"}
          alt="user image"
        />
        {props.isAvailable && (
          <>
            <div className="animate-ping absolute bottom-0 right-0 h-3 w-3 my-1 rounded-full bg-green-300 z-2"></div>
            <div className="absolute bottom-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
          </>
        )}
      </div>
    </div>
  );
}
export default Avatar;
