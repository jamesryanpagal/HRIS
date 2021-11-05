import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:8080/",
  // baseURL: "https://grandspan.herokuapp.com/",
});

export default axiosConfig;
