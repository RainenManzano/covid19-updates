import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.hackertarget.com/geoip/",
});

export default instance;
