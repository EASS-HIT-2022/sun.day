import React, { useState } from "react";
import Layout from "../../components/Layout";
import Widget from "../../components/Widget/Widget";
import Statistic from "../../components/Statistic";
import Tasks from "../../components/TasksTable";
import Customers from "../../components/Customers";
import {
  CollectionIcon,
  SparklesIcon,
  UserAddIcon,
  UserGroupIcon,
  ClipboardListIcon,
} from "@heroicons/react/outline";
import { StateContext, DispatchContext } from "../../context/context";
import { useRouter } from "next/router";
import Modal from "../../components/Modal";
import CustomerForm from "../../components/CustomerForm";

function dashboard() {
  let msg = "";

  const day = new Date();
  const hr = day.getHours();
  if (hr >= 0 && hr < 12) {
    msg = "בוקר טוב";
  } else if (hr >= 12 && hr <= 17) {
    msg = "צהריים טובים";
  } else {
    msg = "לילה טוב";
  }

  const renderWelcome = (name) => {
    return (
      <div className="">
        <h1 className="font-bold text-4xl">{`${msg}, ${name}`}</h1>
        <p className="font-semibold text-lg">
          {" "}
          {` ${day.toLocaleString("he-il", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
            |
            ${day.getHours()}:${day.getMinutes()}`}
        </p>
      </div>
    );
  };

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const router = useRouter();

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 font-sans">
        <Modal title="יצירת לקוח חדש" show={modal} toggleModal={toggleModal}>
          <CustomerForm toggleModal={toggleModal} />
        </Modal>
        <div className="flex flex-col md:flex-row justify-between font-sans items-center gap-6">
          {renderWelcome(state.user?.firstname)}
          <div className="add-customer">
            <button
              onClick={() => toggleModal()}
              className="bg-white p-6 rounded-3xl font-bold text-lg flex items-center justify-between gap-16"
            >
              יצירת לקוח חדש
              <UserAddIcon className="h-16 w-16 bg-primary p-4 rounded-2xl" />
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <Widget style="lg:w-1/3 h-48" title="פרויקטים פעילים">
            <Statistic
              icon={CollectionIcon}
              value={state.tasks.length.toLocaleString("he-IL", {
                minimumIntegerDigits: 2,
              })}
            />
          </Widget>
          <Widget style="lg:w-1/3 h-48" title="נקודות שצברת השבוע">
            <Statistic icon={SparklesIcon} value="12" />
          </Widget>
          <Widget style="lg:w-1/3 h-48" title="לקוחות">
            <Statistic
              icon={UserGroupIcon}
              value={state.customers.length.toLocaleString("he-IL", {
                minimumIntegerDigits: 2,
              })}
            />
          </Widget>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <Widget style="lg:w-1/2 h-56" title="פרויקטים">
            {state.tasks.length > 0 ? (
              <Tasks />
            ) : (
              <div className="flex flex-col items-center justify-items-start min-h-full gap-2">
                <ClipboardListIcon className="h-28 w-28 bg-gray-50 text-gray-300 p-4 rounded-full" />
                אין פרויקטים פעילים
              </div>
            )}
          </Widget>
          <Widget style="lg:w-1/2 h-56" title="פעילות אחרונה">
            <div className="flex flex-col items-center justify-items-start min-h-full gap-2">
              <ClipboardListIcon className="h-28 w-28 bg-gray-50 text-gray-300 p-4 rounded-full" />
              עדיין לא ביצעת פעולות
            </div>
          </Widget>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <Widget style="lg:w-full max-h-64" title="לקוחות">
            <Customers />
          </Widget>
        </div>
      </div>
    </Layout>
  );
}

export default dashboard;
