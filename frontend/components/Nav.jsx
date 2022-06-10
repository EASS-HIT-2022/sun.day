import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Nav(props) {
  const menuItems = [
    {
      href: "/dashboard",
      title: "העסק שלי",
      icon: "/assets/icons/dashboard.svg",
    },
    {
      href: "/customers",
      title: "לקוחות",
      icon: "/assets/icons/customers.svg",
    },
    {
      href: "/statistics",
      title: "סטטיסטיקות",
      icon: "/assets/icons/stats-active.svg",
    },
    {
      href: "/diary",
      title: "יומן",
      icon: "/assets/icons/time-active.svg",
    },
  ];

  const router = useRouter();

  return (
    <nav>
      <ul>
        {menuItems.map(({ href, title, icon }) => (
          <li className="mx-10 my-4" key={title}>
            <Link href={href}>
              <a
                className={`flex gap-4 grayscale hover:grayscale-0 transition duration-400 ${
                  props.collapse ? "w-fit" : "w-full"
                } px-4 py-4 rounded-xl font-sans font-semibold hover:bg-black hover:text-white cursor-pointer brightness-50 hover:filter-none ${
                  router.pathname.includes(href)
                    ? "bg-black text-white filter-none"
                    : ""
                }`}
              >
                <img src={icon} alt={title} />

                <div className={`${props.collapse ? "hidden" : ""}`}>
                  {title}
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
