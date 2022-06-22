import React from "react";

function Header() {
  return (
    <header className="z-10 py-4  shadow-xs ">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <button className="p-1 -ml-1 mr-5 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple">
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <input
          type="search"
          className="block md:hidden lg:hidden w-1/2 py-2 pl-4 px-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-gray-50 focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
          style={{ borderRadius: "25px" }}
          placeholder="Search"
          autocomplete="off"
        />
      </div>
    </header>
  );
}

export default Header;
