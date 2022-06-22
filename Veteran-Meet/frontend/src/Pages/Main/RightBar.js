import React from "react";
import AXIOS from "../../services/AXIOS";
import { userState } from "../../states/userState";

function RightBar() {
  const [user, setUser] = userState.use();
  // React.useEffect(() => {
  //   let data = {
  //     lat: user.profile.address.lattitude,
  //     lng: user.profile.address.longitude,
  //     radius: 50000000,
  //     veteran: user.profile._id,
  //   };
  //   AXIOS.get("/veterans/nearby", { params: data }).then((res) => {
  //     console.log(res.data);
  //   });
  // }, []);

  const getSearchedVeterans = (e) => {
    AXIOS.get("/veterans", { params: { query: e.target.value } }).then(
      (res) => {
        console.log(res.data);
      }
    );
  };

  return (
    <div className="hidden md:block lg:block py-8  sticky top-6">
      <input
        type="search"
        className="mx-4 w-5/6 py-2 pl-4 px-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-gray-50 focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
        style={{ borderRadius: "25px" }}
        placeholder="Search"
        autocomplete="off"
        onChange={getSearchedVeterans}
      />
      <card className=" w-96 rounded-lg shadow-lg">
        <header className="font-bold text-2xl px-5 py-4">
          Connect with People
        </header>

        <main className="px-5">
          <content className="grid grid-cols-6">
            <div className="">
              <img
                src="https://picsum.photos/200/200"
                className="h-8 w-8 rounded-full"
              />
            </div>

            <div className="col-span-3 px-1 font-semibold flex flex-col">
              <div className="text-sm"> Sangwa Albine </div>
              <div className="text-xm text-gray-700 font-light">
                {" "}
                @__svngwa._{" "}
              </div>
            </div>

            <div className="col-span-2 py-2 justify-self-end">
              <button className=" text-blue-500 text-xs font-semibold text-md rounded-full py-1 px-4">
                .Follow
              </button>
            </div>
          </content>

          <content className="grid grid-cols-6 mt-6">
            <div className="">
              <img
                src="https://picsum.photos/200/200?i=200"
                className="h-8 w-8 rounded-full"
              />
            </div>

            <div className="col-span-3 px-1 font-semibold flex flex-col ">
              <div className="text-sm"> Mbonyintege </div>
              <div className="text-xm text-gray-700 font-light"> @Cpwr</div>
            </div>

            <div className="col-span-2 py-2 justify-self-end">
              <button className=" text-blue-500 text-xs font-semibold text-md rounded-full py-1 px-4">
                .Follow
              </button>
            </div>
          </content>
        </main>
      </card>

      <div className="max-w-sm rounded-lg overflow-hidden shadow-sm m-4 mt-5">
        <div className="flex">
          <div className="flex-1">
            <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
              1 . Trending
            </p>
            <h2 className="px-4 ml-2 w-48 font-bold ">#Microsoft363</h2>
            <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
              5,466 posts
            </p>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <a
              href=""
              className=" text-2xl rounded-full text-gray-400 hover:bg-gray-800 hover:text-blue-300 float-right"
            >
              <svg
                className="m-2 h-5 w-5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
              2 . Politics . Trending
            </p>
            <h2 className="px-4 ml-2 w-48 font-bold ">#HI-Fashion</h2>
            <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
              8,464 posts
            </p>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <a
              href=""
              className=" text-2xl rounded-full text-gray-400 hover:bg-gray-800 hover:text-blue-300 float-right"
            >
              <svg
                className="m-2 h-5 w-5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
              3 . Rock . Trending
            </p>
            <h2 className="px-4 ml-2 w-48 font-bold ">#Ferrari</h2>
            <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
              5,586 Concepts
            </p>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <a
              href=""
              className=" text-2xl rounded-full text-gray-400 hover:bg-gray-800 hover:text-blue-300 float-right"
            >
              <svg
                className="m-2 h-5 w-5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 p-4">
            <h2 className="px-4 ml-2 w-48 font-semibold text-sm text-blue-400">
              Show more
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
