import * as restify from "restify";
import { Router } from "../common/router";

class UserRouter extends Router {
  applyRoutes(application: restify.Server) {
    application.get("/users", (req, resp, next) => {
      resp.json({ message: "users routes" });
    });
  }
}

export const userRouter = new UserRouter();
