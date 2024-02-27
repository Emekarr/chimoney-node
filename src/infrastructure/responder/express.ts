import { Response } from "express";
import { cleanPayload } from "../../application/utils";

export abstract class ExpressResponder {
  static respond(
    ctx: Response,
    message: string,
    statusCode: number,
    payload: any,
    errors?: any[]
  ): void {
    payload = cleanPayload(payload);
    ctx.status(statusCode).json({
      message,
      payload,
      errors,
    });
  }

  static seHTTPOnlyCookie(ctx: Response, name: string, cookie: string) {
    ctx.cookie(name, cookie, {
      httpOnly: true,
    });
  }
}
