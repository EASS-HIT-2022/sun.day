import React from "react";

function Section(props) {
  return (
    <div className="py-1" role="none">
      {props.children}
    </div>
  );
}

export default Section;
