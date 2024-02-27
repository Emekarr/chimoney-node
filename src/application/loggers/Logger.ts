import { inject, injectable } from "tsyringe";
import { LoggerInterface } from "./types";
import { WinstonLogger } from "../../infrastructure/logger/winston";

@injectable()
export default class Logger {
  constructor(@inject(WinstonLogger) public bl: LoggerInterface) {}
}
