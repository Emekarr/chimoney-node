import { Context } from "../../entities/interfaces/Context";
import WalletServiceClass from "../services/wallet";
import { container } from "tsyringe";
import { EmailTransactionDTO } from "./dto/wallet";
import sendValueViaEmail from "../usecases/wallet/sendValueViaEmail";
import requestPaymentViaEmail from "../usecases/wallet/requestPaymentViaEmail";
const WalletService = container.resolve(WalletServiceClass);

export default abstract class WalletController {
  static async fetchWallet(ctx: Context<any>) {
    try {
      const wallets = await WalletService.ws.fetchWallet(
        ctx.ctxParams!["walletID"]
      );
      ctx.respond(ctx.ctx, "wallets fetched", 200, wallets);
    } catch (err: any) {
      ctx.errRespond(err);
    }
  }

  static async fetchTransactions(ctx: Context<any>) {
    try {
      const transactions = await WalletService.ws.fetchTransactions(
        ctx.ctxParams!["walletID"]
      );
      ctx.respond(ctx.ctx, "user created", 200, transactions);
    } catch (err: any) {
      ctx.errRespond(err);
    }
  }

  static async sendValueViaEmail(ctx: Context<EmailTransactionDTO>) {
    try {
      const success = await sendValueViaEmail.execute(
        ctx.ctxParams!["walletID"],
        ctx.ctxParams!["id"],
        ctx.body
      );
      ctx.respond(ctx.ctx, "transaction completed", 200, success);
    } catch (err: any) {
      ctx.errRespond(err);
    }
  }

  static async requestPaymentViaEmail(ctx: Context<EmailTransactionDTO>) {
    try {
      const success = await requestPaymentViaEmail.execute(
        ctx.ctxParams!["walletID"],
        ctx.ctxParams!["id"],
        ctx.body
      );
      ctx.respond(ctx.ctx, "transaction completed", 200, success);
    } catch (err: any) {
      ctx.errRespond(err);
    }
  }
}
