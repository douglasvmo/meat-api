import { Server } from "./server/server";

const server = new Server();

server
  .bootstrap()
  .then((server) => {
    console.log("Server iss listening on: ", server.aplication.address());
  })
  .catch((error) => {
    console.log("Server failed to start");
  });
