import React, { useState, useEffect } from "react";
import TagsInput from "../TagsInput";
import { DispatchContext, StateContext } from "../../context/context";
import UserService from "../../services/user";
import ErrorMessage from "../ErrorMessage";
import SubmitButton from "../SubmitButton";

function TaskForm(props) {
  const task = props.task;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setTags(task.tags);
      setStatus(task.status);
    }
  }, [task]);

  const dispatch = React.useContext(DispatchContext);
  const state = React.useContext(StateContext);

  const handleAddTask = async () => {
    dispatch({ type: "ADD_TASK" });

    if (title === "" || description === "") {
      dispatch({
        type: "ADD_CUSTOMER_FAILURE",
        payload: { error: "חובה למלא כותרת ותיאור למשימה" },
      });
      return;
    }

    try {
      const task = {
        title,
        description,
        tags: tags.join(","),
        created_at: new Date(),
      };

      const response = await UserService.addTask(
        state.token,
        props.customerId,
        task
      );

      props.setTasks([...props.tasks, response.data]);

      dispatch({ type: "ADD_TASK_SUCCESS", payload: { task: response.data } });
      props.toggleModal();
    } catch (err) {
      dispatch({
        type: "ADD_CUSTOMER_FAILURE",
        payload: { error: err.message },
      });
    }

    setTitle("");
    setDescription("");
    setTags([]);
  };

  const handleUpdateTask = async () => {
    dispatch({ type: "UPDATE_TASK" });

    if (title === "" || description === "") {
      dispatch({
        type: "UPDATE_TASK_FAILURE",
        payload: { error: "חובה למלא כותרת ותיאור למשימה" },
      });
      return;
    }

    try {
      const request = {
        ...task,
        title,
        description,
        tags: tags.join(","),
        status,
      };

      const response = await UserService.updateTask(state.token, request);

      props.setTasks(
        props.tasks.map((task) => {
          return task._id === request._id ? request : task;
        })
      );

      dispatch({ type: "UPDATE_TASK_SUCCESS", payload: { task: request } });
      props.toggleModal();
    } catch (err) {
      dispatch({
        type: "UPDATE_TASK_FAILURE",
        payload: { error: err.message },
      });
    }

    setTitle("");
    setDescription("");
    setTags([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task) {
      handleUpdateTask();
    } else {
      handleAddTask();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 mb-0 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-neutral-600">
          {" "}
          כותרת המשימה:{" "}
        </label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="block w-full px-3 py-2 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white"
          placeholder="כותרת המשימה"
          value={title}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-600">
          {" "}
          תיאור המשימה:{" "}
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="block w-full px-3 py-2 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white"
          placeholder="תיאור המשימה"
          value={description}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-600">
          {" "}
          בחר תגיות:{" "}
        </label>
        <TagsInput
          options={["עיצוב", "פיתוח", "תמיכה", "כספים"]}
          tags={tags}
          setTags={setTags}
        />
      </div>

      {task && (
        <div>
          <label className="block text-sm font-medium text-neutral-600">
            {" "}
            סטטוס:{" "}
          </label>
          {/* <select
            className="block w-full px-3 py-2 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white"
            value={task.status}
          >
            <option value="פתוחה">פתוחה</option>
            <option value="סגורה">סגורה</option>
          </select> */}
          <ul className="grid grid-cols-3 gap-x-4 max-w-md mx-auto">
            <li className="relative">
              <input
                className="sr-only peer"
                type="radio"
                value="todo"
                name="answer"
                id="answer_todo"
                checked={status === "todo"}
                onChange={() => setStatus("todo")}
              />
              <label
                className="flex p-4 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-red-500 peer-checked:ring-2 peer-checked:border-transparent"
                htmlFor="answer_todo"
              >
                ממתין
              </label>

              <div className="absolute hidden w-5 h-5 peer-checked:block top-5 left-3">
                ⏳
              </div>
            </li>

            <li className="relative">
              <input
                className="sr-only peer"
                type="radio"
                value="in_progress"
                name="answer"
                id="answer_in_progress"
                checked={status === "in_progress"}
                onChange={() => setStatus("in_progress")}
              />
              <label
                className="flex p-4 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-yellow-500 peer-checked:ring-2 peer-checked:border-transparent"
                htmlFor="answer_in_progress"
              >
                בביצוע
              </label>

              <div className="absolute hidden w-5 h-5 peer-checked:block top-5 left-3">
                🪄
              </div>
            </li>

            <li className="relative">
              <input
                className="sr-only peer"
                type="radio"
                value="done"
                name="answer"
                id="answer_done"
                checked={status === "done"}
                onChange={() => setStatus("done")}
              />
              <label
                className="flex p-4 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent"
                htmlFor="answer_done"
              >
                הושלם
              </label>

              <div className="absolute hidden w-5 h-5 peer-checked:block top-5 left-3">
                ✨
              </div>
            </li>
          </ul>
        </div>
      )}

      <div className="flex items-center gap-2">
        <SubmitButton
          style={
            "px-4 py-2 bg-primary hover:bg-black hover:text-white rounded-lg font-semibold focus:outline-none focus:shadow-outline"
          }
        >
          {task ? "עדכן משימה" : "הוסף משימה"}
        </SubmitButton>
        <button
          onClick={(event) => {
            event.preventDefault();
            props.toggleModal();
          }}
          className="px-4 py-2 rounded-lg font-semibold focus:outline-none focus:shadow-outline text-gray-500 bg-gray-100"
        >
          ביטול
        </button>
      </div>
      <ErrorMessage>{state.error}</ErrorMessage>
    </form>
  );
}

export default TaskForm;
