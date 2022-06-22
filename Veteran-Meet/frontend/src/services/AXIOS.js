import axios from "axios";

const AXIOS = axios.create({
  baseURL: "http://localhost:5001",
});

export default AXIOS;
