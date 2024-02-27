import { container, injectable } from "tsyringe";
import { InfraHasher } from "../../../infrastructure/cryptography";

@injectable()
class Hasher {
  constructor(public hs: InfraHasher) {}
}

export default container.resolve(Hasher);
