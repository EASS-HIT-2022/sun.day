import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import AuthService from "../services/auth";
import UserService from "../services/user";
import ErrorMessage from "../components/ErrorMessage";
import SubmitButton from "../components/SubmitButton";
import { StateContext, DispatchContext } from "../context/context";
import { useRouter } from "next/router";
import autoLogout from "../components/autoLogout";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER" });
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: { error: "חובה למלא את כל השדות" },
      });
      return;
    }
    try {
      await AuthService.register(email, password, firstName, lastName);
      const response = await AuthService.login(email, password);
      const user = await UserService.getUser(response.access_token);

      const payload = {
        access_token: response.access_token,
        user: user,
      };

      autoLogout(response.access_token, router, dispatch);

      dispatch({ type: "REGISTER_SUCCESS", payload });
      router.push("/dashboard");
    } catch (err) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: { error: err.message },
      });
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
              <h1 className="text-3xl font-bold sm:text-5xl">הרשמה</h1>

              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-600">
                        {" "}
                        שם פרטי:{" "}
                      </label>
                      <input
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white"
                        type="text"
                        placeholder="שם פרטי"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-600">
                        {" "}
                        שם משפחה:{" "}
                      </label>
                      <input
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white"
                        type="text"
                        placeholder="שם משפחה"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
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
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white
                         focus:invalid:ring-pink-500 focus:invalid:ring-offset-inherit"
                      />
                    </div>
                  </div>

                  <div>
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

                  <div>
                    <SubmitButton
                      style={
                        "flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-black hover:text-white transition duration-500 ease-in-out transform bg-primary rounded-xl hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      }
                    >
                      הרשמה
                    </SubmitButton>
                    <ErrorMessage>{state.error}</ErrorMessage>
                  </div>
                </form>
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
