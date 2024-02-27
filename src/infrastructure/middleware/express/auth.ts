import { NextFunction, Request, Response } from "express";
import Responder from "../../responder";
import { AuthMiddleware } from "../../../application/middleware/auth";

export default async (req: Request, res: Response, next: NextFunction) => {
  const userDetails = await AuthMiddleware({
    respond: Responder.respond,
    errRespond: next,
    ctx: res,
    body: req.body,
    query: req.query as Record<string, string>,
    headers: req.headers as Record<string, string>,
    setHTTPOnlyCookie: Responder.seHTTPOnlyCookie,
  });
  req.ctx.ctxParams = { ...req.ctx.ctxParams, ...userDetails };
  next();
};
