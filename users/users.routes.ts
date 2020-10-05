import * as restify from "restify";
import { Router } from "../common/router";

class UserRouter extends Router {
  applyRoutes(application: restify.Server) {
    application.get("/users", (req, resp, next) => {
      resp.json({ message: "users routes" });
    });

    application.get("/users/:id", (req, resp, next) => {
      req.params.id;
      resp.send(404);
    });

  }
}

export const userRouter = new UserRouter();
