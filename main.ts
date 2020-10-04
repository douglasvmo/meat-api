import { Server } from "./server/server";
import { userRouter } from "./users/users.routes";


const server = new Server();


server
  .bootstrap([userRouter])
  .then((server) => {
    console.log("Server iss listening on: ", server.aplication.address());
  })
  .catch((error) => {
    console.log("Server failed to start");
  });
