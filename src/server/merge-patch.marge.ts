import * as restify from "restify";

const mpContentType = "application/merge-patch+json";

export function mergePatchBodyParser(
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
) {
  if (req.contentType() === mpContentType && req.method === "PATCH") {
    try {
      req.body = JSON.parse(req.body);
    } catch (e) {
      return next(new Error(e));
    }
  }
  return next();
}
