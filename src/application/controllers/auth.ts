import { Context } from "../../entities/interfaces/Context";
import { CreateUserDTO, LoginUserDTO } from "./dto/auth";
import createUser from "../usecases/auth/createUser";
import loginUser from "../usecases/auth/loginUser";
import signOutUser from "../usecases/auth/signOutUser";

export default abstract class AuthController {
  static async createUser(ctx: Context<CreateUserDTO>) {
    try {
      const user = await createUser.execute(
        ctx.headers!["user-agent"],
        ctx.headers!["x-device-id"],
        ctx.headers!["x-app-version"],
        ctx.body
      );
      ctx.respond(ctx.ctx, "user created", 201, user);
    } catch (err: any) {
      ctx.errRespond(err);
    }
  }

  static async loginUser(ctx: Context<LoginUserDTO>) {
    try {
      const { user, wallets, token } = await loginUser.execute(
        ctx.headers!["user-agent"],
        ctx.headers!["x-device-id"],
        ctx.headers!["x-app-version"],
        ctx.body?.email,
        ctx.body?.password
      );
      ctx.respond(ctx.ctx, "login successful", 201, { user, wallets, token });
    } catch (err: any) {
      ctx.errRespond(err);
    }
  }

  static async signOutUser(ctx: Context<null>) {
    try {
      await signOutUser.execute(ctx.ctxParams!["id"]);
      ctx.respond(ctx.ctx, "signout successful", 201, null);
    } catch (err: any) {
      ctx.errRespond(err);
    }
  }
}
