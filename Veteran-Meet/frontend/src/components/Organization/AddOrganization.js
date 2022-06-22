import React from "react";
import AXIOS from "../../services/AXIOS";
import { userState } from "../../states/userState";

function AddOrganization() {
  const [data, setData] = React.useState({});
  const [user, setUser] = userState.use();
  function add() {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);
    formData.append("about", data.about);
    formData.append("veteran", user.profile._id);
    console.log(data.about);
    AXIOS.post("/organizations", formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  const handleImageUpload = (e) => {
    const files = e.target.files;

    if (files && files[0]) {
      setData({
        ...data,
        image: files[0],
      });
    }
  };

  return (
    <div class="modal" id="addOrganizationModal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Add An Organization</h3>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          value={data.name}
        />
        <textarea
          type="text"
          placeholder="About"
          class="input mt-4 input-bordered w-full max-w-xs"
          onChange={(e) => setData({ ...data, about: e.target.value })}
          value={data.about}
        />

        {/* image field */}
        {/* user image input */}
        <div class="my-4 flex flex-row justify-between items-center">
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            name="myfile"
          />
        </div>
        <div class="modal-action">
          <a href="#" class="btn">
            Close
          </a>
          <button onClick={add} class="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOrganization;
