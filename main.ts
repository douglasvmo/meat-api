import { Server } from "./src/server/server";
import { userRouter } from "./src/users/users.routes";

const server = new Server();

server
  .bootstrap([userRouter])
  .then((server) => {
    console.log("Server is listening on: ", server.aplication.address());
  })
  .catch((error) => {
    console.log(error);
    console.log("Server failed to start");
  });
