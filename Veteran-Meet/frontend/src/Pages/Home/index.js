import React from "react";
import CreatePostForm from "../../components/Post/CreatePostForm";
import Post from "../../components/Post/Post";
import PostList from "../../components/Post/PostList";
import MainPage from "../Main";
import RightBar from "../Main/RightBar";

const Feed = () => {
  return (
    <div className="block md:grid md:grid-flow-row-dense md:grid-cols-3 md:grid-rows-3 ">
      <div className="col-span-2">
        <CreatePostForm />

        <PostList />
      </div>
      <RightBar />
    </div>
  );
};

function HomePage(props) {
  return (
    <MainPage>
      <Feed />
    </MainPage>
  );
}

export default HomePage;
