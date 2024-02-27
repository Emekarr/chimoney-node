import { injectable } from "tsyringe";
import BaseError from "./BaseError";

@injectable()
export default class ExternalDependencyError extends BaseError {
  public err_name = "ExternalDependencyError";
  throw(msg: string, statusCode: number) {
    super.setErrorName(this.err_name);
    super.throw(msg, statusCode);
  }
}
