import React, { useState, useEffect } from "react";
import { StateContext, DispatchContext } from "../../context/context";
import Image from "next/image";
import Search from "./Search";
import User from "./User";
import Notifications from "./Notifications";
import Link from "next/link";

function Header() {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (state.customers) {
      setOptions(
        state.customers.map((customer) => {
          return {
            text: customer.firstname + " " + customer.lastname,
            id: customer._id,
          };
        })
      );
    }
  }, [state.customers]);

  return (
    <header className="max-w-screen-xl p-4 mx-auto">
      <div className="flex items-center justify-between space-x-4 lg:space-x-10 font-sans">
        <Image src="/logo.svg" alt="logo" width="136" height="47" />

        {state.token ? (
          <>
            <Search options={options} value={search} onChange={setSearch} />
            <div dir="rtl" className="flex flex-row gap-4">
              <Notifications />
              <User user={state.user} />
            </div>
          </>
        ) : (
          <>
            <nav
              className="hidden space-x-8 text-sm md:flex space-x-reverse text-black font-semibold"
              dir="rtl"
            >
              <Link href="/">
                <a className="border-b-2 border-black pb-2">עמוד הבית</a>
              </Link>
              <a
                className="hover:border-b-2 hover:border-black hover:pb-2 duration-200"
                href=""
              >
                מי אנחנו
              </a>
              <a
                className="hover:border-b-2 hover:border-black hover:pb-2 duration-200"
                href=""
              >
                צור קשר
              </a>
            </nav>

            <div className="items-center justify-end hidden space-x-4 sm:flex">
              <Link href="/login">
                <a className="px-5 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg">
                  כניסה ללקוחות
                </a>
              </Link>

              <Link href="/register">
                <a className="px-5 py-2 text-sm font-medium text-black bg-primary rounded-lg">
                  הרשמה
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
