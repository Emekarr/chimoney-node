import axios, { AxiosInstance, AxiosResponse } from "axios";
import { NetworkServiceType } from "../type";
import ExternalDependencyErrorClass from "../../../application/errors/ExternalDependencyError";
import { container } from "tsyringe";
import UserErrorClass from "../../../application/errors/UserError";
import LoggerClass from "../../../application/loggers/Logger";
import { LoggerLevel } from "../../../application/loggers/types";
const Logger = container.resolve(LoggerClass);
const ExternalDependencyError = container.resolve(ExternalDependencyErrorClass);
const UserError = container.resolve(UserErrorClass);

export default class AxiosNetworkService implements NetworkServiceType {
  private axios: AxiosInstance;
  constructor(
    baseURL: string,
    headers: Record<string, string>,
    private serviceName: string
  ) {
    this.axios = axios.create({
      baseURL,
      headers,
    });
    this.setResponseInterceptors();
  }

  private setResponseInterceptors() {
    this.axios.interceptors.response.use(this.logCall);
    this.axios.interceptors.response.use(this.handleError);
  }

  logCall(response: AxiosResponse<any, any>): AxiosResponse<any, any> {
    Logger.bl.write(
      LoggerLevel.info,
      `${response.config.method} request to ${response.config.url}`,
      {
        key: "statusCode",
        data: response.status,
      }
    );
    return response;
  }

  handleError(response: AxiosResponse<any, any>): AxiosResponse<any, any> {
    if (response.status >= 400 && response.status < 500) {
      UserError.throw(
        `error communicating with ${this.serviceName}`,
        response.status
      );
    } else if (response.status >= 500 && response.status < 600) {
      ExternalDependencyError.throw(
        `${this.serviceName} Error 🛑`,
        response.status
      );
    }
    return response;
  }

  setHeaders(headers: Record<string, string>) {
    this.axios.defaults.headers = {
      ...this.axios.defaults.headers,
      ...headers,
    };
  }

  async post(url: string, payload: any, params: Record<string, string>) {
    try {
      const response = await this.axios.post(url, payload, {
        params,
      });
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  }

  async get(url: string, params: Record<string, string>) {
    try {
      const response = await this.axios.get(url, params);
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  }
}
