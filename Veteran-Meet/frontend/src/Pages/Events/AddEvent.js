import React from "react";
import AXIOS from "../../services/AXIOS";
import { userState } from "../../states/userState";

function AddEvent() {
  const [title, settitle] = React.useState("");
  const [description, setdescription] = React.useState("");
  const [meetLink, setmeetLink] = React.useState("");
  const [eventTime, setEventTime] = React.useState("");
  const [eventType, seteventType] = React.useState("");
  const [eventStars, seteventStars] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [veteran, setVeteran] = React.useState("");
  const [user, setUser] = userState.use();
  function addEvent() {
    let data = {
      title,
      description,
      meet_link: meetLink,
      event_time: eventTime,
      type: eventType,
      event_stars: eventStars,
    };
    if (organization !== "" || organization !== undefined) {
      data.organization = organization;
    }
    if (veteran !== "" || veteran !== undefined) {
      data.veteran = user.profile._id;
    }
    AXIOS.post(`/events`, {
      ...data,
    }).then((res) => {
      console.log(res);
    });
  }
  return (
    <div class="modal" id="addEventModal">
      <div class="modal-box">
        <input
          type="text"
          placeholder="Title"
          class="input input-bordered w-full my-1 max-w-xs"
          onChange={(e) => settitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          placeholder="Description"
          class="input input-bordered w-full my-1 max-w-xs"
          onChange={(e) => setdescription(e.target.value)}
          value={description}
        />
        <input
          type="text"
          placeholder="Meet Link"
          class="input input-bordered w-full my-1 max-w-xs"
          onChange={(e) => setmeetLink(e.target.value)}
          value={meetLink}
        />
        <input
          type="date"
          placeholder="Event Time"
          class="input input-bordered w-full my-1 max-w-xs"
          onChange={(e) => setEventTime(e.target.value)}
          value={eventTime}
        />
        <select
          type="text"
          placeholder="Event Type"
          class="input input-bordered w-full my-1 max-w-xs"
          onChange={(e) => seteventType(e.target.value)}
          value={eventType}
        >
          <option value="">Select Event Type</option>
          <option value="Meeting">Meeting</option>
          <option value="Training">Training</option>
          <option value="Seminar">Seminar</option>
          <option value="Conference">Conference</option>
          <option value="Convention">Convention</option>
          <option value="Conference">Conference</option>
          <option value="Convention">Convention</option>
        </select>
        <input
          type="text"
          placeholder="Star Counts"
          class="input input-bordered w-full my-1 max-w-xs"
          onChange={(e) => seteventStars(e.target.value)}
          value={eventStars}
        />
        <div>Create As A </div>
        <div className="my-2 mr-2">
          <label>
            <input
              type="radio"
              value="veteran"
              checked={veteran !== undefined}
              onChange={(e) => setVeteran(e.target.value)}
              className="mr-2"
            />
            Veteran
          </label>
          <label>
            <input
              type="radio"
              value="veteran"
              checked={organization !== undefined}
              className="ml-2"
              onChange={(e) => setOrganization(e.target.value)}
            />
            Organisation
          </label>
        </div>
        <div class="modal-action">
          <a href="#" class="btn">
            Close
          </a>
          <button onClick={addEvent} class="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
