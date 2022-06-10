import React from "react";

function Statistic(props) {
  return (
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-4xl">{props.value}</h3>
      <props.icon className="h-20 w-20 bg-[#FFF8E8] text-primary p-5 rounded-3xl" />
    </div>
  );
}

export default Statistic;
