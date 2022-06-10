import React from "react";

function EmptyState({ title, description }) {
  return (
    <section className="max-w-lg px-4 py-20 mx-auto space-y-1 text-center">
      <img className="mx-auto sm:w-1/4" src="/assets/empty.png" />
      <h2 className="text-lg font-medium text-gray-800">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </section>
  );
}

export default EmptyState;
