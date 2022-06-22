import React from "react";
import AXIOS from "../../services/AXIOS";
import { userState } from "../../states/userState";
import Post from "./Post";

function PostList() {
  const [user, setUser] = userState.use();
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    AXIOS.get("/posts/veteran/" + user.profile._id).then((res) => {
      console.log(res.data);
      setPosts(res.data);
    });
  }, []);
  return (
    <div>
      {posts.map((item, index) => {
        return <Post item={item} />;
      })}
    </div>
  );
}

export default PostList;
