import { inject, injectable } from "tsyringe";
import Logger from "../loggers/Logger";
import { LoggerLevel } from "../loggers/types";

export class BaseError extends Error {
  constructor(public message: string, public statusCode: number, public name: string) {
    super(message);
  }
}

@injectable()
export default class ExtendableBaseError {
  public name: string = "BaseError";
  public message: string = "";
  public statusCode!: number;
  constructor(@inject(Logger) private errLogger: Logger) {}

  private logErr(level: LoggerLevel, message: string) {
    this.errLogger.bl.write(level, message, {
      key: this.name,
      data: {
        statusCode: this.statusCode,
      },
    });
    console.log("also report to an error monitoring software like sentry");
  }

  setErrorName(name: string) {
    this.name = name;
  }

  setErrorMsg(message: string) {
    this.message = message;
  }

  setStatusCode(code: number) {
    this.statusCode = code;
  }

  protected throw(message: string, statusCode: number) {
    this.setStatusCode(statusCode);
    this.setErrorMsg(message);
    this.logErr(LoggerLevel.error, message);
    throw new BaseError(message, this.statusCode, this.name);
  }
}
