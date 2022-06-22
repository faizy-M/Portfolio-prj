import moment from "moment";
import React from "react";
import AddHobby from "../../components/Hobby/AddHobby";
import AXIOS from "../../services/AXIOS";
import { userState } from "../../states/userState";
import MainPage from "../Main";
function VisitProfile() {
  // extract id from url react router
  const id = window.location.pathname.split("/")[2];
  const [user, setUser] = React.useState({
    followers: [],
    hobbies: [],
    created_organizations: [],
  });

  const ourUser = userState.useValue();
  React.useEffect(() => {
    AXIOS.get(`/veterans/${id}`).then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
  }, []);

  const [followers, setFollowers] = React.useState([]);
  React.useEffect(() => {
    AXIOS.get(`/veterans/${id}/followers`).then((res) => {
      console.log(res.data);
      setFollowers(res.data);
    });
  }, []);

  function followAcc() {
    console.log(ourUser.profile._id);
    AXIOS.post(`/veterans/${id}/followers`, {
      follower: ourUser.profile._id,
    }).then((res) => {
      console.log(res);
      // setUser(res.data);
    });
  }

  return (
    <MainPage>
      <section class="w-full relative justify-center items-center flex">
        <div className="absolute top-4 right-4">
          <button onClick={followAcc} className="btn btn-success btn-sm">
            Follow
          </button>
        </div>
        <div class="card w-96 bg-base-100 shadow-xl">
          <figure class="px-10 pt-10">
            <img
              src={"http//localhost:5001/images/" + user.image}
              alt="Shoes"
              class="rounded-xl"
            />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">{user.name}</h2>
            <p className="text-semibold">{user.email}</p>
            <p className="text-bold">{user.profession}</p>
            <p className="text-semibold">{moment(user.dob).format("LL")}</p>
            <div class="flex flex-row ">
              {user.hobbies.map((item) => {
                return <div class="badge mx-1 badge-primary">{item}</div>;
              })}
            </div>
            <div>
              Followers : {followers.length}
              <div />
              <div>Organisation: </div>
              <ul>
                {user.created_organizations.map((item) => {
                  return <li>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </MainPage>
  );
}

export default VisitProfile;
