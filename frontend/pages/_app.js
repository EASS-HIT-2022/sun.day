import "../styles/globals.css";
import { useEffect, useReducer } from "react";
import { reducer } from "../context/reducer";
import { StateContext, DispatchContext } from "../context/context";
import UserService from "../services/user";
import autoLogout from "../components/autoLogout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const initialState = {
    token: null,
    user: null,
    customers: [],
    tasks: [],
    isLoading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const AuthUser = async (token) => {
    dispatch({ type: "LOGIN" });
    try {
      const user = await UserService.getUser(token);
      const customers = await UserService.getCustomers(token).catch((err) => {
        customers = [];
      });
      const tasks = await UserService.getTasks(token).catch((err) => {
        tasks = [];
      });

      const payload = {
        access_token: token,
        user,
        customers,
        tasks,
      };

      autoLogout(token, router, dispatch);

      dispatch({ type: "LOGIN_SUCCESS", payload });
    } catch (err) {
      dispatch({ type: "LOGOUT" });
    }
  };

  const CheckToken = async (token) => {
    try {
      const user = await UserService.getUser(token);
      return user;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = CheckToken(token)
        .then(() => {
          AuthUser(token);
        })
        .catch(() => {
          console.log("Invalid token");
          dispatch({ type: "LOGOUT" });
        });
    }
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Component {...pageProps} />
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default MyApp;
