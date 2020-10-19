import * as restify from "restify";
import { environment } from "../common/environment";
import { Router } from "../common/router";
import { mergePatchBodyParser } from "./merge-patch.marge";
import * as mongoose from "mongoose";

export class Server {
  aplication: restify.Server;

  initializeDb() {
    return mongoose.connect(environment.db.url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  }

  initRoutes(routers: Router[]) {
    return new Promise((resolve, reject) => {
      try {
        this.aplication = restify.createServer({
          name: "meet-api",
          version: "1.0.0",
        });

        this.aplication.use(restify.plugins.queryParser());
        this.aplication.use(restify.plugins.bodyParser());
        this.aplication.use(mergePatchBodyParser);

        //routes
        for (let router of routers) {
          router.applyRoutes(this.aplication);
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
    return this.initializeDb().then(() =>
      this.initRoutes(routers).then(() => this)
    );
  }
}
