import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.covid19api.com/",
});

export default instance;
