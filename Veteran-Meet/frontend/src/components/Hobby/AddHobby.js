import React from "react";
import AXIOS from "../../services/AXIOS";
import { userState } from "../../states/userState";

function AddHobby() {
  const [hobby, setHobby] = React.useState("");
  const [user, setUser] = userState.use();
  function addHobby() {
    if (hobby) {
      const newHobbies = [...user.profile.hobbies, hobby];
      console.log(newHobbies);
      AXIOS.put(`/veterans/${user.profile._id}`, {
        hobbies: newHobbies,
      }).then((res) => {
        console.log(res);
        setUser({
          ...user,
          profile: {
            ...user.profile,
            hobbies: newHobbies,
          },
        });
      });
    }
  }
  return (
    <div class="modal" id="addHobbyModal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Add A Hobby</h3>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
          onChange={(e) => setHobby(e.target.value)}
          value={hobby}
        />
        <div class="modal-action">
          <a href="#" class="btn">
            Close
          </a>
          <button onClick={addHobby} class="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddHobby;
