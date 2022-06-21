import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const API_URL = publicRuntimeConfig.API_URL + "/api/v1/users/";

const login = async (email, password) => {
  const response = await fetch(API_URL + "token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(
      `grant_type=password&username=${email}&password=${password}&client_id=sunday-client&client_secret=sunday-secret`
    ),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
};

const register = async (email, password, firstname, lastname) => {
  const response = await fetch(API_URL + "register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      email,
      password,
      firstname,
      lastname,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
};

const AuthService = {
  login,
  register,
};

export default AuthService;
