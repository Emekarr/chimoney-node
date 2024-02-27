import { NextFunction, Request, Response } from "express";
import Responder from "../../responder";
import { HeadersMiddleware } from "../../../application/middleware/headers";
import { Context } from "../../../entities/interfaces/Context";

export default (req: Request, res: Response, next: NextFunction) => {
  const ctx: Context<any> = {
    respond: Responder.respond,
    errRespond: next,
    ctx: res,
    body: req.body,
    query: req.query as Record<string, string>,
    headers: req.headers as Record<string, string>,
    setHTTPOnlyCookie: Responder.seHTTPOnlyCookie,
  };
  HeadersMiddleware(ctx);
  req.ctx = ctx;
  next();
};
