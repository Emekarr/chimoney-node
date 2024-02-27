import { container } from "tsyringe";
import UserErrorClass from "../errors/UserError";
import { BaseError } from "../errors/BaseError";
import LoggerClass from "../loggers/Logger";
import { Context } from "../../entities/interfaces/Context";
import token_generator from "../cryptography/token_generator";
import userRepository from "../repository/user.repository";
import hasher from "../cryptography/hasher";
const UserError = container.resolve(UserErrorClass);

export const AuthMiddleware = async (ctx: Context<any>) => {
  try {
    const tokenHeader = ctx.headers!["authorization"];
    if (!tokenHeader) UserError.throw("authentication failed", 401);
    const token = tokenHeader.split(" ")[1];
    const payload = token_generator.tg.verify(token);
    // makes sure user is still valid and up to date details are used
    const user = await userRepository.db.findOne({
      filter: [
        {
          field: "email",
          operation: "==",
          value: payload.email!,
        },
      ],
      limit: 1,
    });
    if (user.appVersion !== payload.appVersion) {
      // this should trigger a wallet lock and force the user to
      // verify his identity before a token can be generated
      UserError.throw("authentication failed", 401);
    }
    if (user.userAgent !== payload.userAgent) {
      // this should trigger a wallet lock and force the user to
      // verify his identity before a token can be generated
      UserError.throw("authentication failed", 401);
    }
    if (user.deviceID !== payload.deviceID) {
      // this should trigger a wallet lock and force the user to
      // verify his identity before a token can be generated
      UserError.throw("authentication failed", 401);
    }
    const success = await hasher.hs.verify(token, user.activeSession);
    if (!success) {
      UserError.throw("authentication failed", 401);
    }
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      walletID: user.walletID,
      id: user.id,
    };
  } catch (err: any) {
    if (err.message.includes("jwt")) {
      ctx.errRespond(
        new BaseError("authentication failed", 401, "AuthenticationError")
      );
    }
    ctx.errRespond(err);
  }
};
