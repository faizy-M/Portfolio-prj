import moment from "moment";
import React from "react";
import AddHobby from "../../components/Hobby/AddHobby";
import { userState } from "../../states/userState";
import MainPage from "../Main";
function index() {
  const [user, setUser] = userState.use();
  console.log(user);

  return (
    <MainPage>
      <section class="w-full relative justify-center items-center flex">
        <AddHobby />
        <div className="absolute top-4 right-4">
          <a href="#addHobbyModal" className="btn btn-success btn-sm">
            Add Hobby
          </a>
        </div>
        <div class="card w-96 bg-base-100 shadow-xl">
          <figure class="px-10 pt-10">
            <img src={user.profile.image} alt="Shoes" class="rounded-xl" />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">{user.profile.name}</h2>
            <p className="text-semibold">{user.profile.email}</p>
            <p className="text-bold">{user.profile.profession}</p>
            <p className="text-semibold">
              {moment(user.profile.dob).format("LL")}
            </p>
            <div class="flex flex-row ">
              {user.profile.hobbies.map((item) => {
                return <div class="badge mx-1 badge-primary">{item}</div>;
              })}
            </div>
          </div>
        </div>
      </section>
    </MainPage>
  );
}

export default index;
