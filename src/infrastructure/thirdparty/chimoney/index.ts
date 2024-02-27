import config from "../../../config";
import { Wallet } from "../../../entities/domain/WalletDomain";
import NetworkService from "../../network";
import { BaseResponse, WalletCreated } from "./types";

const headers = {
  "X-API-KEY": config.getChimoneyAPIKey(),
  "Content-Type": "application/json",
};

export default abstract class ChimoneyServce {
  private static baseURL = config.getChimoneyBaseURL();
  private static network = new NetworkService(
    this.baseURL,
    headers,
    "chimoney"
  );

  static async createWallet(
    firstName: string,
    lastName: string,
    email: string
  ): Promise<BaseResponse<WalletCreated>> {
    const response = await this.network.post(
      "/sub-account/create",
      {
        firstName,
        lastName,
        email,
        name: `${firstName} ${lastName}`,
      },
      {}
    );
    return response;
  }

  static async fetchWallet(id: string): Promise<BaseResponse<Wallet[]>> {
    const response = await this.network.post(
      `/wallets/list`,
      { subAccount: id },
      {}
    );
    return response;
  }

  static async fetchTransactions(id: string): Promise<BaseResponse<any[]>> {
    const response = await this.network.post(
      `/accounts/transactions`,
      { subAccount: id },
      {}
    );
    return response;
  }

  static async sendChimoneyEmail(
    id: string,
    email: string,
    amount: number
  ): Promise<BaseResponse<any[]>> {
    const response = await this.network.post(
      `/payouts/chimoney`,
      {
        subAccount: id,
        chimoneys: [
          {
            email,
            valueInUSD: amount,
          },
        ],
      },
      {}
    );
    return response;
  }

  static async requestPaymentEmail(
    id: string,
    payerEmail: string,
    amount: number
  ): Promise<BaseResponse<any[]>> {
    const response = await this.network.post(
      `/payment/initiate`,
      {
        subAccount: id,
        payerEmail,
        valueInUSD: amount,
        redirect_url: `${config.getClientURL()}/dashboard`,
      },
      {}
    );
    return response;
  }
}
