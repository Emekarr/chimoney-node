import { NextFunction, Request, Response } from "express";
import { ErrorMiddleware } from "../../../application/middleware/error";
import Responder from "../../responder";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  // this middleware should get the ip of the client and parse it through an ip database like
  // maxmind to figure out if the user is using a masked ip or a vpn or is in an odd location
  next();
};
