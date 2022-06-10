import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { MenuIcon, MenuAlt3Icon, HomeIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Breadcrumb from "../components/Breadcrumb";
import BreadcrumbItem from "../components/BreadcrumbItem";
import { StateContext } from "../context/context";

function Layout({ children }) {
  const [breadcrumbs, setBreadcrumbs] = useState();
  const [collapse, setCollapse] = useState(false);
  const state = React.useContext(StateContext);
  const router = useRouter();

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    if (!state.user) {
      router.push("/login");
    }

    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");

      const breadCrumbTranslate = {
        Customers: "לקוחות",
        Statistics: "סטטיסטיקות",
        Tasks: "משימות",
        Diary: "יומן",
      };

      const dynamicBreadCrumb = path.charAt(0).toUpperCase() + path.slice(1);

      const title = breadCrumbTranslate[dynamicBreadCrumb] || dynamicBreadCrumb;

      return {
        href,
        label: title,
        isCurrent: index === pathArray.length - 1,
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  return (
    state.user && (
      <div className="layout">
        {/* Header Section */}
        <div className="flex">
          <div className="flex-1">
            <Header />
          </div>

          <div className={`flex md:w-60 justify-center items-center`}>
            <div className="md:flex items-center">
              <p className="font-sans font-semibold text-lg hidden lg:flex">
                העסק שלי
              </p>
              <button
                className="p-2 text-black"
                type="button"
                onClick={() => toggleCollapse()}
              >
                <span className="sr-only">Open menu</span>
                {collapse ? (
                  <MenuAlt3Icon className="h-6" />
                ) : (
                  <MenuIcon className="h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu & Content */}
        <div dir="rtl" className="flex flex-col md:flex-row">
          <aside
            className={`bg-white w-full md:min-h-screen animate duration-500 ${
              collapse ? "md:w-40 hidden md:block" : "md:w-80"
            }`}
          >
            <Nav collapse={collapse} />
          </aside>
          <main className="bg-graybg w-full rounded-tr-[38px] p-10">
            {/* {children} */}
            <div className="border-dashed mx-auto max-w-screen-xl border-2 rounded-2xl p-10">
              {router.pathname != "/dashboard" && (
                <Breadcrumb>
                  <BreadcrumbItem
                    isCurrent={router.pathname === "/dashboard"}
                    href="/dashboard"
                  >
                    <HomeIcon className="w-6 ml-4" />
                  </BreadcrumbItem>
                  {breadcrumbs &&
                    breadcrumbs.map((breadcrumb) => (
                      <BreadcrumbItem
                        key={breadcrumb.href}
                        href={breadcrumb.href}
                        isCurrent={breadcrumb.isCurrent}
                      >
                        {breadcrumb.label}
                      </BreadcrumbItem>
                    ))}
                </Breadcrumb>
              )}
              {children}
            </div>
            <div className="flex justify-center font-sans items-center pt-6">
              All Rights Reserved Niv Huga 2022 ©
            </div>
          </main>
        </div>
      </div>
    )
  );
}

export default Layout;
