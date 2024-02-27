import { container, injectable } from "tsyringe";
import UserErrorClass from "../../errors/UserError";
import userRepository from "../../repository/user.repository";
const UserError = container.resolve(UserErrorClass);

@injectable()
class SignOutUserUseCase {
  async execute(userID: string): Promise<boolean> {
    const user = await userRepository.db.findbyID(userID);
    if (!user) UserError.throw("user not found", 404);
    return await userRepository.db.updateOne(userID, {
      activeSession: "",
    });
  }
}

export default container.resolve(SignOutUserUseCase);
