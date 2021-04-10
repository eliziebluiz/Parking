import axios from "axios";

const api = axios.create({
  baseURL: "https://parking-lot-to-pfz.herokuapp.com/parking",
});

export default api;
