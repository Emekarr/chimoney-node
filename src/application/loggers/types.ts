export interface LoggerInterface {
  write(level: LoggerLevel, msg: string, ...meta: MetaData[]): any;
}

export enum LoggerLevel {
  warning = "warning",
  info = "info",
  error = "error",
}

export interface MetaData {
  key: string;
  data: any;
}
