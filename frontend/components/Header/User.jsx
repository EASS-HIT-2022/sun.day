import React, { useState } from "react";
import Avatar from "./Avatar";
import Dropdown from "../Dropdown";
import Item from "../Dropdown/Item";
import Section from "../Dropdown/Section";
import { DispatchContext } from "../../context/context";
import { useRouter } from "next/router";

function User(props) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = React.useContext(DispatchContext);

  const router = useRouter();

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="flex items-center" dir="rtl">
      <div className="relative">
        <a onClick={toggle} className="cursor-pointer">
          <Avatar isAvailable />
        </a>
        <Dropdown isOpen={isOpen} toggle={toggle}>
          <Section>
            <div
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-0"
            >
              אתה מחובר כ-
              <div className="text-gray-900 font-bold">{props.user.email}</div>
            </div>
          </Section>
          <Section>
            <Item href="/dashboard">הגדרות חשבון</Item>
            <Item href="/dashboard">תמיכה</Item>
            <Item href="/dashboard">רישיון</Item>
          </Section>
          <Section>
            <a
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              id="menu-item-2"
              onClick={() => {
                dispatch({ type: "LOGOUT" });
                router.push("/");
              }}
            >
              התנתק
            </a>
          </Section>
        </Dropdown>
      </div>
      <div className="font-sans pr-5">
        <p className="font-bold">{`${props.user.firstname} ${props.user.lastname}`}</p>
        <p className="text-slate-400 text-xs">
          {props.user.role || "Software Engineer"}
        </p>
      </div>
    </div>
  );
}

export default User;
