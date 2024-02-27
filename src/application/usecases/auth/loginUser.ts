import { container, injectable } from "tsyringe";
import UserErrorClass from "../../errors/UserError";
import WalletServiceClass from "../../services/wallet";
import userRepository from "../../repository/user.repository";
import hasher from "../../cryptography/hasher";
import { User } from "../../../entities/domain/UserDomain";
import { Wallet } from "../../../entities/domain/WalletDomain";
import token_generator from "../../cryptography/token_generator";
const UserError = container.resolve(UserErrorClass);
const WalletService = container.resolve(WalletServiceClass);

@injectable()
class LoginUserUseCase {
  async execute(
    userAgent: string,
    deviceID: string,
    appVersion: string,
    email?: string,
    password?: string
  ): Promise<{ user: User; wallets: Wallet[]; token: string }> {
    if (!email || !password)
      UserError.throw("email and password are required", 400);
    const user = await userRepository.db.findOne({
      filter: [
        {
          field: "email",
          operation: "==",
          value: email!,
        },
      ],
      limit: 1,
    });
    if (!user) UserError.throw("user does not exist", 404);
    const success = await hasher.hs.verify(password!, user.password);
    if (!success) UserError.throw("wrong password", 401);
    const wallets = await WalletService.ws.fetchWallet(user.walletID);
    if (!wallets || !wallets.length)
      UserError.throw("wallet not found. please contact support", 404);
    const token = token_generator.tg.generate({
      email: user.email,
      appVersion: user.appVersion,
      deviceID: user.deviceID,
      userAgent: user.userAgent,
    });
    userRepository.db.updateOne(user.id, {
      activeSession: await hasher.hs.hash(token),
    });
    return { user, wallets, token };
  }
}

export default container.resolve(LoginUserUseCase);
