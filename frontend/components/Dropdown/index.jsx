import React from "react";

function Dropdown(props) {
  return (
    <>
      {props.isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg z-50 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {props.children}
        </div>
      )}
    </>
  );
}

export default Dropdown;
