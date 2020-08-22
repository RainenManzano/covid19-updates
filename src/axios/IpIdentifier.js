import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.cloudflare.com/cdn-cgi/trace",
});

export default instance;
