import React from "react";
import AXIOS from "../../services/AXIOS";
import { userState } from "../../states/userState";

function CreatePostForm() {
  const [data, setData] = React.useState({
    title: "",
    content: "",
    image: "",
  });

  const handleImageUpload = (e) => {
    const files = e.target.files;

    if (files && files[0]) {
      // setImage(files[0]);
      setData({
        ...data,
        image: files[0],
      });
    }
  };
  const [user, setUser] = userState.use();

  const addPost = () => {
    let formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("content", data.content);
    formdata.append("media", data.image);
    formdata.append("veteran", user.profile._id);
    formdata.append("posted_at", user.profile._id);
    AXIOS.post("/posts", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="">
      <div className="bg-white shadow rounded-lg mb-6 p-4 w-full">
        <input
          name="title"
          placeholder="Title..."
          onChange={(e) => setData({ ...data, title: e.target.value })}
          value={data.title}
          className=" focus:outline-none  w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
        ></input>
        <textarea
          name="message"
          onChange={(e) => setData({ ...data, content: e.target.value })}
          value={data.content}
          placeholder="Type something..."
          className=" focus:outline-none my-2 w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
        ></textarea>
        <footer className="flex justify-between mt-2">
          <div className="flex gap-2">
            <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
              <div class="mb-4 flex flex-row justify-between items-center">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  name="myfile"
                />
              </div>
            </span>
          </div>
          <button
            onClick={addPost}
            className="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg"
          >
            Post
            <svg
              className="ml-1"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CreatePostForm;
