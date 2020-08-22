import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://restcountries.eu/rest/v2/",
});

export default instance;
