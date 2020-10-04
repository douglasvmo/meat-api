import * as restify from "restify";
import { environment } from "../common/environment";
import { Router } from "../common/router";

export class Server {
  aplication: restify.Server;

  initRoutes(routers: Router[]) {
    return new Promise((resolve, reject) => {
      try {
        this.aplication = restify.createServer({
          name: "meet-api",
          version: "1.0.0",
        });
        this.aplication.use(restify.plugins.queryParser());

        //routes
        for (let router of routers){
          router.applyRoutes(this.aplication)
        }


        this.aplication.listen(environment.server.port, () => {
          resolve(this.aplication);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  bootstrap(routers: Router[] = []): Promise<Server> {
    return this.initRoutes(routers).then(() => this);
  }
}
