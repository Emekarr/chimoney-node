import { container, injectable } from "tsyringe";
import Validator from "../../validator";
import { v4 } from "uuid";
import { CreateUserDTO } from "../../controllers/dto/auth";
import UserErrorClass from "../../errors/UserError";
import WalletServiceClass from "../../services/wallet";
import { User } from "../../../entities/domain/UserDomain";
import userRepository from "../../repository/user.repository";
import hasher from "../../cryptography/hasher";
const UserError = container.resolve(UserErrorClass);
const WalletService = container.resolve(WalletServiceClass);

@injectable()
class CreateUserUseCase {
  constructor(private validator: Validator) {}

  async execute(
    userAgent: string,
    deviceID: string,
    appVersion: string,
    payload?: CreateUserDTO
  ): Promise<Partial<User>> {
    const result = this.validator.vl.validate(
      { ...payload, userAgent, deviceID, appVersion },
      "create_user"
    );
    if (result.err) UserError.throw(result.err.message, 400);
    // in a real life scenario the chimoney wallet will also be managed locally on the system (can't do that now becasue of time)
    // and also the wallet creation and user creation will be tied to a single transaction to avoid 1 creation process suceeding and the other failing
    const walletData = await WalletService.ws.createWallet(
      result.value.firstName!,
      result.value.lastName!,
      result.value.email!
    );
    result.value.password = await hasher.hs.hash(result.value.password!);
    result.value.transactionPin = await hasher.hs.hash(
      result.value.transactionPin!
    );
    const userPayload = {
      ...result.value,
      walletID: walletData.data.id,
    };
    const id = await userRepository.db.saveOne(userPayload);
    return { ...userPayload, id };
  }
}

export default container.resolve(CreateUserUseCase);
