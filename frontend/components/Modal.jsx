import React from "react";
import { XIcon } from "@heroicons/react/outline";

function Modal(props) {
  return (
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-60 p-6 ${
        !props?.show && "hidden"
      }`}
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-lg">
        <div className="absolute top-4 left-4 p-4">
          <button
            className="border-2 border-black hover:border-rose-700 hover:text-rose-700 hover:scale-110 duration-200 rounded-full"
            aria-label="Close"
            onClick={() => props.toggleModal()}
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 flex flex-col justify-center items-center">
          <h1 className="my-6 text-3xl font-extrabold border-b-8 border-primary leading-4 w-fit">
            {props.title}
          </h1>
          <div className=" w-3/4 px-2">
            {props.children}
            <div className="hidden">
              לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מודוף
              קונסקטורר אדיפיסינג אלית קולורס מודוף קונסקטורר אדיפיסינג אלית
              קולורס מודוף קונסקטורר אדיפיסינג אלית קולורס מודוף קונסקטורר
              אדיפיסינג אלית קולורס מודוף קונסקטורר אדיפיסינג אלית קולורס מודוף
              קונסקטורר אדיפיסינג אלית קולורס מודוף קונסקטורר אדיפיסינג אלית
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
