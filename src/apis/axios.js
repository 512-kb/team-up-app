import axios from "axios";

// eslint-disable-next-line
const apiURL = "https://kb512-team-up-api.herokuapp.com";
// eslint-disable-next-line
const localURL =
  window.location.protocol + "//" + window.location.hostname + ":" + 3001;

const URL = window.location.hostname === "localhost" ? localURL : apiURL;

export default axios.create({
  baseURL: URL
});
