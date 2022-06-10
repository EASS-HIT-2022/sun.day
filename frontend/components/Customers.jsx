import React, { useState } from "react";
import Avatar from "./Header/Avatar";
import {
  PencilIcon,
  EyeIcon,
  TrashIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";
import { StateContext, DispatchContext } from "../context/context";
import UserService from "../services/user";
import CustomerForm from "./CustomerForm";
import Modal from "../components/Modal";
import { useRouter } from "next/router";

function Projects() {
  const router = useRouter();
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const [customer, setCustomer] = useState(null);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const deleteCustomerTasks = async (customerId) => {
    try {
      const tasks = await UserService.getTasksByCustomer(
        state.token,
        customerId
      );
      tasks.forEach((task) => {
        dispatch({
          type: "DELETE_TASK_SUCCESS",
          payload: { taskId: task._id },
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (customerId) => {
    dispatch({ type: "DELETE_CUSTOMER" });
    try {
      deleteCustomerTasks(customerId);

      await UserService.deleteCustomer(state.token, customerId);
      const payload = {
        customerId,
      };
      dispatch({ type: "DELETE_CUSTOMER_SUCCESS", payload });
    } catch (err) {
      dispatch({
        type: "DELETE_CUSTOMER_FAILURE",
        payload: { error: err.message },
      });
    }

    toggleDeleteModal();
  };

  const renderActions = (customer) => {
    return (
      <div className="flex justify-center items-center gap-1">
        <button
          onClick={() => {
            router.push(`/customers/${customer._id}`);
          }}
          className="rounded-full p-2 transition ease-in-out duration-300 text-gray-600 hover:text-blue-600 hover:scale-125"
        >
          <EyeIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            setCustomer(customer);
            toggleModal();
          }}
          className="rounded-full p-2 transition ease-in-out duration-300 text-gray-600 hover:text-primary hover:scale-125"
        >
          <PencilIcon className="h-4 w-4" />
        </button>

        <button
          onClick={() => {
            setCustomer(customer);
            toggleDeleteModal();
          }}
          className="rounded-full p-2 transition ease-in-out duration-300 text-gray-600 hover:text-red-600 hover:scale-125"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    );
  };

  return (
    <>
      <Modal title="עריכת לקוח" show={modal} toggleModal={toggleModal}>
        <CustomerForm toggleModal={toggleModal} customer={customer} />
      </Modal>
      <Modal
        title="מחיקת לקוח"
        show={deleteModal}
        toggleModal={toggleDeleteModal}
      >
        <p className="mb-2">
          האם אתה בטוח שברצונך למחוק את הלקוח{" "}
          <span className="font-bold underline">
            {customer?.firstname + " " + customer?.lastname}
          </span>{" "}
          ?
        </p>
        <p className="bg-red-50 p-4 border-l-4 rounded-r-xl border-red-700 text-red-700 my-8 justify-center flex gap-3">
          <ExclamationIcon className="h-6 w-6" /> פעולה זו לא ניתנת לביטול
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              handleDelete(customer._id);
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
      <div className="overflow-y-auto">
        <table className="table-auto min-w-full text-sm border-collapse">
          <thead>
            <tr className="text-xs text-black">
              <th className="font-extralight">איש קשר</th>
              <th className="font-extralight">חברה</th>
              <th className="font-extralight">דוא״ל</th>
              <th className="font-extralight">טלפון</th>
              <th className="font-extralight">משימות</th>
              <th className="font-extralight">פעולות</th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-white text-center">
            {state.customers.map((customer, index) => (
              <tr className="even:bg-gray-50 hover:bg-gray-100" key={index}>
                <td className="p-2 font-semibold whitespace-nowrap rounded-r-2xl">
                  <div className="flex">
                    <div className="w-10 h-10">
                      <Avatar
                        size="10"
                        src={
                          (customer?.avatar && customer.avatar) || "/34.jpeg"
                        }
                      />
                    </div>
                    <div className="mr-3 text-right">
                      {`${customer.firstname} ${customer.lastname}`}
                      <p className="text-xs text-gray-500">{customer.role}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-medium whitespace-nowrap">
                  {customer.company}
                </td>
                <td className="p-4 font-medium whitespace-nowrap">
                  {customer.email}
                </td>
                <td className="p-4 font-medium whitespace-nowrap">
                  {customer.phone}
                </td>
                <td className="p-4 font-medium whitespace-nowrap">
                  {customer.tasks}
                </td>
                <td className="p-4 whitespace-nowrap rounded-l-2xl">
                  {renderActions(customer)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Projects;
