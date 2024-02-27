import { container, injectable } from "tsyringe";
import { TokenGenerator } from "../../../infrastructure/cryptography";

@injectable()
class AuthTokenGeneratorService {
  constructor(public tg: TokenGenerator) {}
}

export default container.resolve(AuthTokenGeneratorService);
