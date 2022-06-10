import React from "react";
import TaskItem from "./TaskItem";

function Tasks(props) {
  const tasks = props.tasks
    .map((task) => {
      return {
        ...task,
        tags: task.tags.split(","),
      };
    })
    .filter((task) => {
      return task.status === props.status;
    });
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold">{props.title}</h3>
      {!props.tasks && ( // if there are no tasks
        <div className="rounded-xl bg- opacity-10 bg-gradient-to-r py-1 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"></div>
      )}
      {tasks?.map(
        (
          task,
          index // if there are <tasks>
        ) => (
          <TaskItem
            task={task}
            style={
              props.title === "משימות בביצוע:"
                ? "border-r-2 border-primary"
                : "" || props.title === "משימות שהושלמו:"
                ? "border-r-2 border-green-400"
                : ""
            }
            key={index}
            setSelectedTask={props.setSelectedTask}
            deleteModal={props.deleteModal}
            editModal={props.editModal}
          />
        )
      )}
    </div>
  );
}

export default Tasks;
