import { injectable } from "tsyringe";
import BaseError from "./BaseError";

@injectable()
export default class UserError extends BaseError {
  public err_name = "UserError";
  throw(msg: string, statusCode: number) {
    super.setErrorName(this.err_name);
    super.throw(msg, statusCode);
  }
}
