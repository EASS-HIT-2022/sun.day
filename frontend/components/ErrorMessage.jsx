import React from "react";

function ErrorMessage({ children }) {
  return <div className="mt-6 text-sm text-red-600">{children}</div>;
}

export default ErrorMessage;
