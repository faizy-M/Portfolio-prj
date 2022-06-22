import AXIOS from "./AXIOS";
import Cookie from "js-cookie";
import { userState } from "../states/userState";

export async function login(email, password) {
  AXIOS.post("/veterans/login", { email, password })
    .then((res) => {
      console.log(res.data);
      userState.set({ token: res.data.token, profile: res.data.veteran });
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

export async function register(data) {
  // we also need to send image
  const formData = new FormData();
  if (data.image) {
    formData.append("image", data.image);
  }
  // latitudes of new york
  data.address = {
    latitude: 40.73061,
    longitude: -73.935242,
  };
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("profession", data.profession);
  formData.append("address", data.address);
  formData.append("dob", data.dob);

  AXIOS.post("/veterans/register", { ...data })
    .then((res) => {
      console.log(res.data);
      userState.set({ token: res.data.token, profile: res.data.veteran }); 
      Cookie.set("token", res.data.token);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
