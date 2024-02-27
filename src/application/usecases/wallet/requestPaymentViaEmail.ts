import { container, injectable } from "tsyringe";
import Validator from "../../validator";
import UserErrorClass from "../../errors/UserError";
import WalletServiceClass from "../../services/wallet";
import { EmailTransactionDTO } from "../../controllers/dto/wallet";
import hasher from "../../cryptography/hasher";
import userRepository from "../../repository/user.repository";
const UserError = container.resolve(UserErrorClass);
const WalletService = container.resolve(WalletServiceClass);

@injectable()
class RequestPaymentViaEmailUseCase {
  constructor(private validator: Validator) {}

  async execute(
    id: string,
    userID: string,
    payload?: EmailTransactionDTO
  ): Promise<boolean> {
    const result = this.validator.vl.validate(payload, "send_value_email");
    if (result.err) UserError.throw(result.err.message, 400);
    const user = await userRepository.db.findbyID(userID);
    if (!user) UserError.throw("user not found", 404);
    const trxValidationSuccess = await hasher.hs.verify(
      payload?.transactionPin!,
      user.transactionPin
    );
    if (!trxValidationSuccess) UserError.throw("wrong transaction pin", 401);
    const success = await WalletService.ws.requestPayment(
      id,
      result.value!.email,
      result.value!.amount
    );
    if (!success)
      UserError.throw(`could not request payment from ${payload!.email}`, 400);
    return success;
  }
}

export default container.resolve(RequestPaymentViaEmailUseCase);
