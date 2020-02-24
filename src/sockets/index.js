import io from "socket.io-client";

// eslint-disable-next-line
const apiURL = "https://demo-api.herokuapp.com";
// eslint-disable-next-line
const localURL =
  window.location.protocol + "//" + window.location.hostname + ":" + 3002;

const socket = io(window.location.hostname === "localhost" ? localURL : apiURL);

socket.on("sockets on", id => {
  console.log("connection: " + id);
});

export default socket;
