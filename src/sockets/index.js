import io from "socket.io-client";

// eslint-disable-next-line
const apiURL = "https://kb512-team-up-api.herokuapp.com";
// eslint-disable-next-line
const localURL =
  window.location.protocol + "//" + window.location.hostname + ":" + 3001;

const socket = io(window.location.hostname === "localhost" ? localURL : apiURL);

export default socket;
