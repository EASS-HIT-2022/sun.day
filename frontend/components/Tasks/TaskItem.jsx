import React, { useState } from "react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import Badge from "./Badge";
import Section from "../Dropdown/Section";

function TaskItem(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div
      className={`flex flex-col relative justify-between bg-white rounded-3xl font-sans p-6 shadow-sm ${props.style}`}
    >
      <div className="">
        <button onClick={toggle} className="absolute inset-y-0 left-4">
          <DotsVerticalIcon className="h-6 w-6 hover:scale-110 hover:text-sky-600 duration-200" />
        </button>

        {isOpen && (
          <div
            className="absolute left-4 mt-14 w-24 rounded-md shadow-lg z-50 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <Section>
              <a
                onClick={() => {
                  props.setSelectedTask(props.task);
                  toggle();
                  props.editModal();
                }}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                id="menu-item-2"
              >
                עריכה
              </a>
            </Section>
            <Section>
              <a
                onClick={() => {
                  props.setSelectedTask(props.task);
                  toggle();
                  props.deleteModal();
                }}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                id="menu-item-2"
              >
                מחיקה
              </a>
            </Section>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">{props.task.title}</h3>
        <h3 className="font-semibold text-lg text-gray-300 pl-6">
          {
            // date to string day and month
            new Date(props.task.created_at).toLocaleDateString("he-IL", {
              day: "numeric",
              month: "long",
            })
          }
        </h3>
      </div>
      <div className="flex gap-1">
        {props.task.tags.map((tag, index) => {
          return (
            tag !== "" && (
              <Badge
                className={`bg-sky-500 text-white font-semibold`}
                key={index}
              >
                {tag}
              </Badge>
            )
          );
        })}
      </div>
      {props.task.description}
    </div>
  );
}

export default TaskItem;
