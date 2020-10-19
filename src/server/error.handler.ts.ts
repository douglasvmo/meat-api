import * as restify from "restify";

export const handleError = (
  req: restify.Request,
  res: restify.Response,
  err: any,
  callback: any
) => {
    
  Object.defineProperty(err, "toJSON", {
    value() {
      const alt = {
        message: err.message,
      };
      return alt;
    },
    configurable: true,
    writable: true,
  });

  switch (err.name) {
    case "CastError":
      err.statusCode = 400;
      break;
    case "ValidationError":
      err.statusCode = 400;
      break;
  }
  return callback();
};
