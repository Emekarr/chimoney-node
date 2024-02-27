import { injectable } from "tsyringe";
import BaseError from "./BaseError";

@injectable()
export default class ApplicationError extends BaseError {
  public err_name = "ApplicationError";
  throw(msg: string, statusCode: number) {
    super.setErrorName(this.name);
    super.throw(msg, statusCode);
  }
}
