import Header from "../Main/Header";
import Sidebar from "../Main/Sidebar";
import { userState } from "../../states/userState";
import React from "react";
import AXIOS from "../../services/AXIOS";
import MainPage from "../Main";

function FollowerList(props) {
  let { list } = props;
  return (
    <div>
      <h3>Followers</h3>
      <ul>
        {list.map((follower) => {
          if (follower.follower)
            return (
              <li className="flex flex-row justify-center">
                <img className="w-20 h-20" src={follower.follower.image} />
                {follower.follower.name}
              </li>
            );
        })}
      </ul>
    </div>
  );
}

const FollowerPage = (props) => {
  const [user, setUser] = userState.use();
  const [followers, setFollowers] = React.useState([]);
  React.useEffect(() => {
    AXIOS.get(`/veterans/${user.profile._id}/followers`).then((res) => {
      console.log(res.data);
      setFollowers(res.data);
    });
  }, []);
  return (
    <MainPage>
      <FollowerList list={followers} />
    </MainPage>
  );
};
export default FollowerPage;
