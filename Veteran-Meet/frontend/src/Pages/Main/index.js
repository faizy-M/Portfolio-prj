import React from "react";
import CreatePostForm from "../../components/Post/CreatePostForm";
import Post from "../../components/Post/Post";
import Profile from "../Profile";
import Header from "./Header";
import RightBar from "./RightBar";
import Sidebar from "./Sidebar";

const Feed = () => {
  return (
    <div className="block md:grid md:grid-flow-row-dense md:grid-cols-3 md:grid-rows-3 ">
      <div className="col-span-2">
        <CreatePostForm />

        <Post />
      </div>
      <RightBar />
    </div>
  );
};

function MainPage(props) {
  return (
    <div
      className="flex h-screen  dark:bg-gray-900"
      style={{ overflowHidden: "isSideMenuOpen" }}
    >
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />
        <main className="h-full px-4 pb-16 overflow-y-auto">
          {props.children}
        </main>
      </div>
    </div>
  );
}

export default MainPage;
