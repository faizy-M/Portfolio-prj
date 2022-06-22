import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Sidebar() {
  const history = useHistory();
  return (
    <aside className="z-20 hidden w-70 mr-4 overflow-y-auto  md:block flex-shrink-0">
      <div className=" h-14 flex justify-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/004/890/405/original/two-healthy-people-with-mechanical-gear-on-the-top-free-vector.jpg"
          className="w-32 h-24 mt-10"
        />
      </div>
      <div className=" mt-24 p-2 flex ">
        <button
          onClick={() => history.push("/profile")}
          className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
        >
          <span className="inline-flex justify-center items-center ml-4">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">Profile</span>
        </button>
      </div>

      <div className=" my-2 p-2 flex ">
        <button
          href="#"
          onClick={() => history.push("/events")}
          className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
        >
          <span className="inline-flex justify-center items-center ml-4">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">Events</span>
        </button>
      </div>

      <div className=" my-2 p-2 flex ">
        <button
          onClick={() => history.push("/chat")}
          href="#"
          className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
        >
          <span className="inline-flex justify-center items-center ml-4">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              ></path>
            </svg>
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">Messages</span>
        </button>
      </div>

      <div className=" my-2 p-2 flex ">
        <button
          onClick={() => history.push("/followers")}
          href="#"
          className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
        >
          <span className="inline-flex justify-center items-center ml-4">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">Followers</span>
          <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">
            (15)
          </span>
        </button>
      </div>

      <div className=" my-2 p-2 flex ">
        <button
          href="#"
          onClick={() => history.push("/organizations")}
          className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
        >
          <span className="inline-flex justify-center items-center ml-4">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">
            Organizations
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
