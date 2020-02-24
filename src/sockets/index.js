import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:3002");

socket.on("sockets on", id => {
  console.log("connection: " + id);
});

export default socket;
