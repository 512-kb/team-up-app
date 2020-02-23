import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:3001");

socket.on("sockets on", id => {
  console.log(id);
});

export default socket;
