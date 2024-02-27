import { NextFunction, Request, Response } from "express";
import { ErrorMiddleware } from "../../../application/middleware/error";
import Responder from "../../responder";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  ErrorMiddleware({
    err,
    respond: Responder.respond,
    ctx: res,
    errRespond: next,
    setHTTPOnlyCookie: Responder.seHTTPOnlyCookie
  });
};
