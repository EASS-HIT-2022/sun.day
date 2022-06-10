import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import AuthService from "../services/auth";
import UserService from "../services/user";
import ErrorMessage from "../components/ErrorMessage";
import { StateContext, DispatchContext } from "../context/context";
import SubmitButton from "../components/SubmitButton";
import { useRouter } from "next/router";
import autoLogout from "../components/autoLogout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const router = useRouter();

  useEffect(() => {
    if (state.user) {
      router.push("/dashboard");
    }
  }, [state.user]);

  const AuthUser = async (token) => {
    dispatch({ type: "LOGIN" });
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
    router.push("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN" });
    if (email === "" || password === "") {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: { error: "חובה למלא את כל השדות" },
      });
      return;
    }
    try {
      const response = await AuthService.login(email, password);
      AuthUser(response.access_token);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: { error: err.message } });
    }
  };

  return (
    <div className="">
      <Head>
        <title>Sun.Day | כלי לניהול העסק</title>
        <link rel="icon" href="/favicon-sunday.svg" />
      </Head>
      <Header />
      <main
        className="min-h-[calc(100vh-158px)] flex flex-col justify-center bg-graybg text-center md:text-right font-sans"
        dir="rtl"
      >
        <section className="text-blueGray-700">
          <div className="items-center px-5 py-12 lg:px-20">
            <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
              <h1 className="text-3xl font-bold sm:text-5xl">התחברות</h1>

              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:ring-pink-500 focus:invalid:ring-offset-inherit"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-neutral-600">
                      {" "}
                      סיסמה:{" "}
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        required=""
                        placeholder="סיסמה"
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        placeholder="Your password"
                        className="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                      />
                      <label className="block mr-2 text-sm text-neutral-600">
                        {" "}
                        זכור אותי{" "}
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-primary hover:text-black"
                      >
                        {" "}
                        שכחת סיסמה?{" "}
                      </a>
                    </div>
                  </div>

                  <div>
                    <SubmitButton
                      style={
                        "flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-black hover:text-white transition duration-500 ease-in-out transform bg-primary rounded-xl hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      }
                    >
                      התחבר
                    </SubmitButton>
                    <ErrorMessage>{state.error}</ErrorMessage>
                  </div>
                </form>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-neutral-600 bg-white">
                      {" "}
                      או התחבר באמצעות{" "}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setError("חיבור עם גוגל לא זמין כרגע");
                    }}
                    type="submit"
                    className="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-blue-600 hover:text-white"
                  >
                    <div className="flex items-center justify-center">
                      <span className="ml-4"> התחברות עם גוגל</span>
                      <Image
                        src="/assets/icons/google.svg"
                        alt="google"
                        width={20}
                        height={20}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/logo.svg" alt="Sun.Day Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
