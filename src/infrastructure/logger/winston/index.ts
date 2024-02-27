import {
  LoggerInterface,
  LoggerLevel,
  MetaData,
} from "../../../application/loggers/types";

export class WinstonLogger implements LoggerInterface {
  write(level: LoggerLevel, msg: string, ...meta: MetaData[]) {
    console.log("a proper logger like winston should be implemented 🤲🏻");
    console.log({ level, msg, meta });
  }
}
