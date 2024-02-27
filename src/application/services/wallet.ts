import { inject, injectable } from "tsyringe";
import InfraWalletService from "../../infrastructure/services/wallet";

@injectable()
export default class WalletService {
  constructor(@inject(InfraWalletService) public ws: InfraWalletService) {}
}
