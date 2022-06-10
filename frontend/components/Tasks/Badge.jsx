import React from "react";

function Badge({ children, className, ...props }) {
  return (
    <strong
      className={`uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </strong>
    // <strong className=''></strong>
  );
}

export default Badge;
