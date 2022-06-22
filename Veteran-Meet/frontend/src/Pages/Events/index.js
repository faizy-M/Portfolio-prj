import React from "react";
import AddEvent from "./AddEvent";
import MainPage from "../Main";
import AXIOS from "../../services/AXIOS";
import moment from "moment";
function RenderEvent({ event }) {
  return (
    <div className="card shadow-lg rounded-lg p-4 card-borderd">
      <div class="card-title">{event.title}</div>
      <div className="card-body">
        <span>{event.description}</span>
        <span>Type : {event.type}</span>
        <span className="ml-1">Stars : {event.event_stars}</span>
        <span>Date and Time : {moment(event.event_time).format("LLL")}</span>
      </div>
      <div className="card-actions">
        <button
          value="join"
          href={event.meet_link}
          className="btn btn-primary btn-outline"
        >
          Join
        </button>
      </div>
    </div>
  );
}

const EventsPage = (props) => {
  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    AXIOS.get("/events/recents").then((res) => {
      console.log(res);
      setEvents(res.data);
    });
  }, []);
  return (
    <MainPage>
      <div className="container">
        <AddEvent />
        <div className="row">
          <div className="absolute top-4 right-4">
            <a href="#addEventModal" className="btn btn-success btn-sm">
              Add Event
            </a>
          </div>
          <div className="col-12">
            <h3>Upcoming Events</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          {events.map((event) => {
            return (
              <div className="col-12 col-md-4 m-1" key={event._id}>
                <RenderEvent event={event} />
              </div>
            );
          })}
        </div>
      </div>
    </MainPage>
  );
};

export default EventsPage;
