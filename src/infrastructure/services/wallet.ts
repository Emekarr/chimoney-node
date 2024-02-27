import { container } from "tsyringe";
import ExternalDependencyErrorClass from "../../application/errors/ExternalDependencyError";
import ChimoneyServce from "../thirdparty/chimoney";
import { LoggerLevel } from "../../application/loggers/types";
import LoggerClass from "../logger";
const Logger = container.resolve(LoggerClass);
const ExternalDependencyError = container.resolve(ExternalDependencyErrorClass);

export default class InfraWalletService {
  async createWallet(firstName: string, lastName: string, email: string) {
    const response = await ChimoneyServce.createWallet(
      firstName,
      lastName,
      email
    );
    if (response.error) {
      Logger.write(LoggerLevel.error, "error from chimoney", {
        key: "response",
        data: response,
      });
      if (response.error === "already exists") {
        ExternalDependencyError.throw(
          "this email has a wallet attached to it",
          500
        );
      }
      ExternalDependencyError.throw(
        "something went wrong creating user wallet",
        500
      );
    }
    if (response.status !== "success")
      ExternalDependencyError.throw(
        "something went wrong creating user wallet",
        500
      );
    return response;
  }

  async fetchWallet(id: string) {
    const response = await ChimoneyServce.fetchWallet(id);
    if (response.error) {
      Logger.write(LoggerLevel.error, "error from chimoney", {
        key: "response",
        data: response,
      });
      ExternalDependencyError.throw(
        "something went wrong fetching user wallet",
        500
      );
    }
    if (response.status !== "success")
      ExternalDependencyError.throw(
        "something went wrong fetching user wallet",
        500
      );
    return response.data;
  }

  async fetchTransactions(id: string) {
    const response = await ChimoneyServce.fetchTransactions(id);
    if (response.error) {
      Logger.write(LoggerLevel.error, "error from chimoney", {
        key: "response",
        data: response,
      });
      ExternalDependencyError.throw(
        "something went wrong fetching wallet transactions",
        500
      );
    }
    if (response.status !== "success")
      ExternalDependencyError.throw(
        "something went wrong fetching wallet transactions",
        500
      );
    return response.data;
  }

  async sendValueViaEmail(id: string, email: string, amount: number) {
    const response = await ChimoneyServce.sendChimoneyEmail(id, email, amount);
    if (response.error) {
      Logger.write(LoggerLevel.error, "error from chimoney", {
        key: "response",
        data: response,
      });
      ExternalDependencyError.throw(
        "something went wrong sending value via email",
        500
      );
    }
    if (response.status !== "success")
      ExternalDependencyError.throw(
        "something went wrong sending value via email",
        500
      );
    return true;
  }

  async requestPayment(id: string, email: string, amount: number) {
    const response = await ChimoneyServce.requestPaymentEmail(
      id,
      email,
      amount
    );
    if (response.error) {
      Logger.write(LoggerLevel.error, "error from chimoney", {
        key: "response",
        data: response,
      });
      ExternalDependencyError.throw(
        "something went wrong requesting payment via email",
        500
      );
    }
    if (response.status !== "success")
      ExternalDependencyError.throw(
        "something went wrong requesting payment via email",
        500
      );
    return true;
  }
}
