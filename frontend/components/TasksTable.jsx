import React from "react";
import { StateContext } from "../context/context";

function Tasks() {
  const state = React.useContext(StateContext);

  const renderStatus = (status) => {
    let status_name = "";
    switch (status) {
      case "done":
        status_name = "הושלם";
        return (
          <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded text-xs font-medium">
            {status_name}
          </span>
        );
      case "in_progress":
        status_name = "בביצוע";
        return (
          <span className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded text-xs font-medium">
            {status_name}
          </span>
        );
      case "todo":
        status_name = "ממתין";
        return (
          <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-xs font-medium">
            {status_name}
          </span>
        );
      default:
        return <span className="text-gray-500">{status}</span>;
    }
  };

  return (
    <div className="overflow-y-auto">
      <table className="table-auto min-w-full text-sm border-collapse">
        <tbody className="divide-y-4 divide-white">
          {state.tasks.map((task, index) => (
            <tr className="even:bg-gray-50 hover:bg-gray-100" key={index}>
              <td className="p-4 font-semibold whitespace-nowrap rounded-r-2xl">
                {task.title}
              </td>
              <td className="p-4 font-medium whitespace-nowrap">
                {task.description}
              </td>
              <td className="p-4 whitespace-nowrap rounded-l-2xl">
                {renderStatus(task.status)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tasks;
