import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const API_URL = publicRuntimeConfig.API_URL + "/api/v1/";

const getUser = async (token) => {
  const response = await fetch(API_URL + "users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      // logout();
    }

    throw new Error(data.detail);
  }

  return data;
};

const getCustomers = async (token) => {
  const response = await fetch(API_URL + "customers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
};

const addCustomer = async (token, customer) => {
  const response = await fetch(API_URL + "customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(customer),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
};

const updateCustomer = async (token, customer) => {
  const response = await fetch(API_URL + "customers/" + customer._id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(customer),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
};

const deleteCustomer = async (token, customerId) => {
  const response = await fetch(API_URL + "customers/" + customerId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
};

const getCustomer = async (token, customerId) => {
  const response = await fetch(API_URL + "customers/" + customerId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
    }
    throw new Error(data.detail);
  }

  return data;
};

const getTasks = async (token) => {
  const response = await fetch(API_URL + "tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
};

const getTasksByCustomer = async (token, customerId) => {
  const response = await fetch(API_URL + "tasks/customer/" + customerId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
};

const addTask = async (token, customerId, task) => {
  const response = await fetch(API_URL + "tasks/" + customerId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
};

const deleteTask = async (token, taskId) => {
  const response = await fetch(API_URL + "tasks/" + taskId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
};

const updateTask = async (token, task) => {
  const response = await fetch(API_URL + "tasks/" + task._id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
};

const UserService = {
  getCustomers,
  getUser,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer,
  getTasks,
  getTasksByCustomer,
  addTask,
  deleteTask,
  updateTask,
};

export default UserService;
