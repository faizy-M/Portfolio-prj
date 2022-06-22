import React from "react";
import moment from "moment";

function Post(props) {
  let { item } = props;
  return (
    <div className="bg-white shadow rounded-lg mt-10 pb-3">
      <div className="flex flex-row px-2 py-3 mx-3">
        <div className="w-auto h-auto rounded-full border-2 border-green-500">
          <img
            className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
            alt="User avatar"
            src={item.post.created_by.image}
          />
        </div>
        <div className="flex flex-col mb-2 ml-4 mt-1">
          <div className="text-gray-600 text-sm font-semibold">
            {item.post.created_by.name}
          </div>
          <div className="flex w-full mt-1">
            <div className="text-gray-400 font-thin text-xs">
              • {moment(item.post.created_at).format("L")}
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-100"></div>
      <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
        {item.post.media && (
          <img
            className="rounded w-full"
            src={"http://localhost:5001/images/" + item.post.media}
          />
        )}
      </div>
      <div className="text-gray-600 font-semibold  mb-2 mx-3 px-2">
        {item.post.title}
      </div>
      <div className="text-gray-500 text-sm mb-6 mx-3 px-2">
        {item.post.content}
      </div>
    </div>
  );
}

export default Post;
