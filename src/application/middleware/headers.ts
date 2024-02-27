import { container } from "tsyringe";
import { Context } from "../../entities/interfaces/Context";
import UserErrorClass from "../errors/UserError";
const UserError = container.resolve(UserErrorClass);

const requiredHeaders = ["user-agent", "x-app-version", "x-device-id"];

export const HeadersMiddleware = (ctx: Context<any>) => {
  requiredHeaders.forEach((header) => {
    if (!ctx.headers![header]) {
      throw UserError.throw("missing headers", 400);
    }
  });
};
