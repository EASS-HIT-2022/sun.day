import Link from "next/link";
import React from "react";

function Item(props) {
  return (
    <Link href={props.href}>
      <a
        className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
        role="menuitem"
        id="menu-item-2"
      >
        {props.children}
      </a>
    </Link>
  );
}

export default Item;
