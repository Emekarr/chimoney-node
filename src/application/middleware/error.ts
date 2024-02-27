import { container } from "tsyringe";
import BaseError from "../errors/BaseError";
import LoggerClass from "../loggers/Logger";
import { LoggerLevel } from "../loggers/types";
import { Context } from "../../entities/interfaces/Context";
const Logger = container.resolve(LoggerClass);

const baseErrors = ["ApplicationError", "UserError", "ExternalDependencyError"];

export const ErrorMiddleware = (ctx: Context<any>) => {
  Logger.bl.write(LoggerLevel.error, `${ctx.err.name} - ${ctx.err.message}`);
  if (baseErrors.includes(ctx.err.name)) {
    ctx.respond(
      ctx.ctx,
      "an error occured",
      (ctx.err as BaseError).statusCode,
      null,
      ctx.err.message
    );
  } else {
    ctx.respond(ctx.ctx, "an error occured", 500, null, ctx.err.message);
  }
};
