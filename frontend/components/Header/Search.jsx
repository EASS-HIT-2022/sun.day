import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

function Search({ options, value, onChange }) {
  const [showOptions, setShowOptions] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const ref = useRef();

  const select = (option) => {
    onChange(option);
    setShowOptions(false);
  };

  const handleChange = (text) => {
    onChange(text);
    setCursor(-1);
    if (!showOptions) {
      setShowOptions(true);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.text.includes(value)
  );

  const moveCursorDown = () => {
    if (cursor < filteredOptions.length - 1) {
      setCursor((c) => c + 1);
    }
  };

  const moveCursorUp = () => {
    if (cursor > 0) {
      setCursor((c) => c - 1);
    }
  };

  const handleNav = (e) => {
    switch (e.key) {
      case "ArrowUp":
        moveCursorUp();
        break;
      case "ArrowDown":
        moveCursorDown();
        break;
      case "Enter":
        if (cursor >= 0 && cursor < filteredOptions.length) {
          select(filteredOptions[cursor]);
        }
        break;
    }
  };

  useEffect(() => {
    const listener = (e) => {
      if (!ref.current.contains(e.target)) {
        setShowOptions(false);
        setCursor(-1);
      }
    };

    document.addEventListener("click", listener);
    document.addEventListener("focusin", listener);
    return () => {
      document.removeEventListener("click", listener);
      document.removeEventListener("focusin", listener);
    };
  }, []);

  return (
    <div className="relative hidden md:flex" ref={ref} dir="rtl">
      <input
        dir="rtl"
        className="bg-graybg text-sm font-serif p-3 rounded-2xl w-full py-3 pr-3 pl-12 focus:ring-2 focus:ring-primary focus:outline-none focus:bg-white"
        placeholder="חיפוש לקוח... "
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setShowOptions(true)}
        onKeyDown={handleNav}
      />

      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none top-1/2 pt-1 left-4">
        <Image src="/assets/search.svg" width="16" height="16" />
      </span>

      <ul
        className={`absolute top-12 w-full rounded-lg shadow-lg bg-white ${
          !showOptions && "hidden"
        } select-none`}
      >
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, i, arr) => {
            let className = "px-4 hover:bg-gray-100 ";

            if (i === 0) className += "pt-2 pb-1 rounded-t-lg";
            else if (i === arr.length) className += "pt-1 pb-2 rounded-b-lg";
            else if (i === 0 && arr.length === 1)
              className += "py-2 rounded-lg";
            else className += "py-1";

            if (cursor === i) {
              className += " bg-gray-100";
            }

            return (
              <Link href={`/customers/${option.id}`} key={i}>
                <li
                  className={className}
                  key={option.text}
                  onClick={() => select(option.text)}
                >
                  {option.text}
                </li>
              </Link>
            );
          })
        ) : (
          <li className="px-4 py-2 text-gray-500">No results</li>
        )}
      </ul>
    </div>
  );
}

export default Search;
