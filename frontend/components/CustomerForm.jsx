import React, { useState, useEffect } from "react";
import SubmitButton from "./SubmitButton";
import { StateContext, DispatchContext } from "../context/context";
import ErrorMessage from "./ErrorMessage";
import UserService from "../services/user";

function CustomerForm(props) {
  const customer = props.customer;
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (customer) {
      setFirstname(customer.firstname);
      setLastname(customer.lastname);
      setEmail(customer.email);
      setCompany(customer.company);
      setRole(customer.role);
      setPhone(customer.phone);
      setAddress(customer.address);
    }
  }, [customer]);

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const handleAddCustomer = async () => {
    dispatch({ type: "ADD_CUSTOMER" });

    if (firstname === "" || lastname === "" || email === "") {
      dispatch({
        type: "ADD_CUSTOMER_FAILURE",
        payload: { error: "חובה למלא שם פרטי, שם משפחה וכתובת דוא״ל" },
      });
      return;
    }

    try {
      const request = {
        firstname,
        lastname,
        email,
        company,
        role,
        phone,
        address,
      };

      const response = await UserService.addCustomer(state.token, request);

      const payload = {
        customer: response.data,
      };
      dispatch({ type: "ADD_CUSTOMER_SUCCESS", payload });

      props.toggleModal();

      setFirstname("");
      setLastname("");
      setEmail("");
      setCompany("");
      setRole("");
      setPhone("");
      setAddress("");
    } catch (err) {
      dispatch({
        type: "ADD_CUSTOMER_FAILURE",
        payload: { error: err.message },
      });
    }
  };

  const handleUpdateCustomer = async () => {
    dispatch({ type: "UPDATE_CUSTOMER" });

    if (firstname === "" || lastname === "" || email === "") {
      dispatch({
        type: "UPDATE_CUSTOMER_FAILURE",
        payload: { error: "חובה למלא שם פרטי, שם משפחה וכתובת דוא״ל" },
      });
      return;
    }

    try {
      const request = {
        firstname,
        lastname,
        email,
        company,
        role,
        phone,
        address,
        _id: customer._id,
      };

      const response = await UserService.updateCustomer(state.token, request);

      const payload = {
        customer: {
          ...response.data,
          _id: customer._id,
        },
      };
      dispatch({ type: "UPDATE_CUSTOMER_SUCCESS", payload });
      props.toggleModal();
    } catch (err) {
      dispatch({
        type: "UPDATE_CUSTOMER_FAILURE",
        payload: { error: err.message },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (customer) {
      handleUpdateCustomer();
    } else {
      handleAddCustomer();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 mb-0 space-y-4"
    >
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-600">
            {" "}
            שם פרטי:{" "}
          </label>
          <input
            onChange={(e) => setFirstname(e.target.value)}
            className="block w-full px-3 py-2 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white"
            type="text"
            placeholder="שם פרטי"
            value={firstname}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-600">
            {" "}
            שם משפחה:{" "}
          </label>
          <input
            onChange={(e) => setLastname(e.target.value)}
            className="block w-full px-3 py-2 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white"
            type="text"
            placeholder="שם משפחה"
            value={lastname}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-600">
            {" "}
            חברה:{" "}
          </label>
          <input
            className="block w-full px-3 py-2 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white"
            type="text"
            placeholder="חברה"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-600">
            {" "}
            תפקיד:{" "}
          </label>
          <input
            className="block w-full px-3 py-2 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white"
            type="text"
            placeholder="תפקיד"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-600">
          {" "}
          כתובת:{" "}
        </label>
        <input
          className="block w-full px-3 py-2 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white"
          type="text"
          placeholder="כתובת"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-600">
          {" "}
          דוא״ל:{" "}
        </label>
        <div className="mt-1">
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            required=""
            placeholder="דוא״ל"
            className="block w-full px-3 py-2 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white
                         focus:invalid:ring-pink-500 focus:invalid:ring-offset-inherit"
            value={email}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-600">
          {" "}
          טלפון:{" "}
        </label>
        <input
          className="block w-full px-3 py-2 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white"
          type="phone"
          placeholder="טלפון"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
      </div>

      <div className="flex items-center gap-2">
        <SubmitButton
          style={
            "px-4 py-2 bg-primary hover:bg-black hover:text-white rounded-lg font-semibold focus:outline-none focus:shadow-outline"
          }
        >
          {customer ? "עדכן לקוח" : "הוסף לקוח"}
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

export default CustomerForm;
