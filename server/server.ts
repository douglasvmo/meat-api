import * as restify from "restify";
import { environment } from "../common/environment";

export class Server {
  aplication: restify.Server;

  initRoutes() {
    return new Promise((resolve, reject) => {
      try {
        this.aplication = restify.createServer({
          name: "meet-api",
          version: "1.0.0",
        });
        this.aplication.use(restify.plugins.queryParser());
        this.aplication.listen(environment.server.port, () => {
          resolve(this.aplication);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  bootstrap(): Promise<Server> {
    return this.initRoutes().then(() => this);
  }
}
