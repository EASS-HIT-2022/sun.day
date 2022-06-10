import React, { useState, useEffect, useRef } from "react";

function TagsInput({ options, tags, setTags }) {
  const [field, setField] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const ref = useRef();

  const select = (option) => {
    setField("");
    // onChange(option);
    if (!tags.includes(option)) {
      addTag(option);
    }
    setShowOptions(false);
  };

  const handleChange = (text) => {
    setField(text);
    // setTags(text);
    setCursor(-1);
    if (!showOptions) {
      setShowOptions(true);
    }
  };

  // array sub array filter includes

  const filteredOptions = options.filter(
    (option) => !tags.includes(option) && option.includes(field)
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

  const addTag = (tag) => {
    // setTags([...tags, tag]);
    setTags([...tags, tag]);
  };

  const removeTag = (tag) => {
    // setTags(tags.filter((t) => t !== tag));
    setTags(tags.filter((t) => t !== tag));
  };

  const renderTag = (tag, index) => {
    return (
      <span
        key={index}
        className="flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-3xl cursor-pointer bg-sky-500 text-gray-200 hover:bg-sky-600 hover:text-gray-100"
      >
        {tag}
        <svg
          onClick={() => removeTag(tag)}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-3 hover:text-gray-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative" ref={ref}>
        <input
          type="text"
          className="block w-full px-3 py-2 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-100 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:bg-white"
          value={field}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setShowOptions(true)}
          onKeyDown={handleNav}
          placeholder="בחר תגיות..."
        />

        <ul
          className={`absolute -mt-0.5 w-full rounded-lg shadow-lg bg-white ${
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
                <li
                  className={className}
                  key={option}
                  onClick={() => select(option)}
                >
                  {option}
                </li>
              );
            })
          ) : (
            <li className="px-4 py-2 text-gray-500">No results</li>
          )}
        </ul>
      </div>

      <div className="flex flex-wrap rounded-lg">
        {tags.map((tag, index) => {
          return renderTag(tag, index);
        })}
      </div>
    </div>
  );
}

export default TagsInput;
