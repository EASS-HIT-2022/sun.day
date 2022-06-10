import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../components/Layout";
import Widget from "../../components/Widget/Widget";
import Avatar from "../../components/Header/Avatar";
import Tasks from "../../components/Tasks";
import Modal from "../../components/Modal";
import TaskForm from "../../components/Tasks/TaskForm";
import UserService from "../../services/user";
import CustomerCardLoading from "../../components/CustomerCardLoading";
import EmptyState from "../../components/EmptyState";
import { ClipboardListIcon, ExclamationIcon } from "@heroicons/react/outline";
import { StateContext, DispatchContext } from "../../context/context";

function customer() {
  const router = useRouter();
  const { id } = router.query;
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [customerObject, setCustomerObject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const fetchCustomer = async () => {
    try {
      const customer = await UserService.getCustomer(state.token, id);
      setCustomerObject(customer);

      const tasks = await UserService.getTasksByCustomer(state.token, id);
      setTasks(tasks);
    } catch (err) {
      setTasks([]);
    }
  };

  useEffect(() => {
    if (state.token) {
      fetchCustomer();
    }
  }, [state.token, id]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const renderField = (key, value) => {
    return (
      <div className="">
        <h3 className="font-semibold text-gray-400 text-sm">{key}</h3>
        <p className="font-semibold text-md">{value}</p>
      </div>
    );
  };

  const renderDetails = (contact) => {
    return (
      <div className="flex flex-col w-full gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="">
            <h3 className="font-semibold text-gray-400 text-sm">איש קשר</h3>
            <div className="flex flex-col">
              <p className="font-semibold text-md">
                {contact?.firstname + " " + contact?.lastname}
              </p>
              <p className="font-normal text-xs">{contact?.role}</p>
            </div>
          </div>

          {renderField("דוא״ל", contact?.email)}

          {renderField("כתובת", contact?.address)}

          {renderField("חברה", contact?.company)}

          {renderField("טלפון", contact?.phone)}
        </div>
      </div>
    );
  };

  const handleDelete = async (taskId) => {
    try {
      await UserService.deleteTask(state.token, taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
      dispatch({ type: "DELETE_TASK_SUCCESS", payload: { taskId } });
    } catch (err) {
      console.log(err);
    }

    toggleDeleteModal();
  };

  return (
    <Layout>
      <Head>
        <title>
          כרטיס לקוח:{" "}
          {customerObject?.firstname + " " + customerObject?.lastname}
        </title>
      </Head>
      <div className="flex flex-col gap-6 font-sans mt-6">
        {!customerObject ? (
          <CustomerCardLoading />
        ) : (
          <Widget title="כרטיס לקוח" icon="/assets/icons/PersonBadgeFill.svg">
            <div className="flex flex-col md:flex-row gap-6 py-4 items-center">
              <Avatar size="28" />
              {renderDetails(customerObject)}
            </div>
          </Widget>
        )}

        <Modal title="משימה חדשה" show={modal} toggleModal={toggleModal}>
          <TaskForm
            toggleModal={toggleModal}
            customerId={id}
            tasks={tasks}
            setTasks={setTasks}
          />
        </Modal>
        <button
          className="flex flex-col items-center justify-center font-semibold text-black transition-all duration-200 border-2 border-dashed rounded-2xl py-6 hover:border-solid hover:border-primary hover:text-black hover:bg-white"
          onClick={() => toggleModal()}
        >
          <ClipboardListIcon className="h-6 w-6" />
          משימה חדשה
        </button>

        {tasks.length > 0 ? (
          <>
            <Tasks
              title="משימות:"
              tasks={tasks}
              setTasks={setTasks}
              status="todo"
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              deleteModal={toggleDeleteModal}
              editModal={toggleEditModal}
            />
            <Tasks
              title="משימות בביצוע:"
              tasks={tasks}
              setTasks={setTasks}
              status="in_progress"
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              deleteModal={toggleDeleteModal}
              editModal={toggleEditModal}
            />
            <Tasks
              title="משימות שהושלמו:"
              tasks={tasks}
              setTasks={setTasks}
              status="done"
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              deleteModal={toggleDeleteModal}
              editModal={toggleEditModal}
            />
          </>
        ) : (
          <EmptyState
            title={"אופס, לא נמצאו משימות ללקוח זה"}
            description="אם אתה מעוניין ליצור משימה חדשה, לחץ על הכפתור למעלה כדי להתחיל."
          />
        )}

        <Modal
          title="מחיקת משימה"
          show={deleteModal}
          toggleModal={toggleDeleteModal}
        >
          <p className="mb-2">
            האם אתה בטוח שברצונך למחוק את המשימה{" "}
            <span className="font-bold underline">
              {/* {customer?.firstname + " " + customer?.lastname} */}
              {selectedTask?.title}
            </span>{" "}
            ?
          </p>
          <p className="bg-red-50 p-4 border-l-4 rounded-r-xl border-red-700 text-red-700 my-8 justify-center flex gap-3">
            <ExclamationIcon className="h-6 w-6" /> פעולה זו לא ניתנת לביטול
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleDelete(selectedTask._id);
              }}
              className="px-7 py-2 bg-primary hover:bg-black hover:text-white rounded-lg font-semibold focus:outline-none focus:shadow-outline"
            >
              {state.isLoading ? (
                // processing
                <div className="flex items-center justify-center gap-4">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  טוען...
                </div>
              ) : (
                "אישור"
              )}
            </button>
            <button
              onClick={() => {
                toggleDeleteModal();
              }}
              className="px-4 py-2 rounded-lg font-semibold focus:outline-none focus:shadow-outline text-gray-500 bg-gray-100"
            >
              ביטול
            </button>
          </div>
        </Modal>

        <Modal
          title="עריכת משימה"
          show={editModal}
          toggleModal={toggleEditModal}
        >
          <TaskForm
            toggleModal={toggleEditModal}
            customerId={id}
            tasks={tasks}
            setTasks={setTasks}
            task={selectedTask}
          />
        </Modal>
      </div>
    </Layout>
  );
}

export default customer;
