import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddOrganization from "../../components/Organization/AddOrganization";
import AXIOS from "../../services/AXIOS";
import { userState } from "../../states/userState";
import MainPage from "../Main";
function OrganizationPage() {
  const [user, setUser] = userState.use();
  const history = useHistory();
  console.log(user);
  const [organizations, setOrganizations] = React.useState([]);
  React.useEffect(() => {
    AXIOS.get("/organizations/" + user.profile._id).then((res) => {
      console.log(res.data);
      setOrganizations(res.data);
    });
  }, []);
  return (
    <MainPage>
      <section class="w-full relative  flex">
        <AddOrganization />
        <div className="absolute top-4 right-4">
          <a href="#addOrganizationModal" className="btn btn-success btn-sm">
            Add Organization
          </a>
        </div>
        <div className="h-2"></div>
        <div class=" overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((item, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>
                      <img
                        src={"http://localhost:5001/images/" + item.image}
                        className="h-20 w-20 "
                      />
                    </td>
                    <td>
                      <button
                        className="mx-2 btn btn-success"
                        onClick={() =>
                          history.push("/organizations/" + item._id)
                        }
                      >
                        View
                      </button>
                      <button
                        className="mx-2 btn btn-primary"
                        onClick={() => history.push("")}
                      >
                        Edit
                      </button>
                      <button
                        className="mx-2 btn btn-danger"
                        onClick={() => history.push("")}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </MainPage>
  );
}

export default OrganizationPage;
