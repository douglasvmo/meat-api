import * as restify from "restify";
import { EventEmitter } from "events";

export abstract class Router extends EventEmitter {
  abstract applyRoutes(application: restify.Server);

  render(resp: restify.Response, next: restify.Next) {
    return (document) => {
      if (document) {
        this.emit("beforeRender", document);
        resp.json(document);
      } else {
        resp.send(404);
      }
      return next();
    };
  }

  renderAll(resp: restify.Response, next: restify.Next) {
    return (documents: any[]) => {
      if (documents) {
        documents.forEach(document => {
          this.emit("beforeRender", document);
        })
        resp.json(documents)
      } else {
        resp.json([])
      }
    }
  }
}
