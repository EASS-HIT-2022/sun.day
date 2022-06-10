import React, { useState } from "react";
import Layout from "../../components/Layout";
import Widget from "../../components/Widget/Widget";
import { UserAddIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Customers from "../../components/Customers";
import Modal from "../../components/Modal";
import CustomerForm from "../../components/CustomerForm";
import { StateContext } from "../../context/context";

function customers() {
  const [modal, setModal] = useState(false);
  const state = React.useContext(StateContext);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <Layout>
      <Head>
        <title>לקוחות</title>
      </Head>
      <div className="flex flex-col gap-6 font-sans mt-6">
        <Modal title="יצירת לקוח חדש" show={modal} toggleModal={toggleModal}>
          <CustomerForm toggleModal={toggleModal} />
        </Modal>
        <div className="add-customer">
          <button
            onClick={() => toggleModal()}
            className="bg-white p-6 rounded-3xl font-bold text-lg flex items-center justify-between gap-16"
          >
            יצירת לקוח חדש
            <UserAddIcon className="h-16 w-16 bg-primary p-4 rounded-2xl" />
          </button>
        </div>
        <Widget title="לקוחות" icon="/assets/icons/PersonBadgeFill.svg">
          <div className="mt-4">
            <Customers />
          </div>
        </Widget>
      </div>
    </Layout>
  );
}

export default customers;
