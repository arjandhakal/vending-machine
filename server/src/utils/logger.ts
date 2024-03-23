export enum LogLevel {
  NONE = 0,
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

export class Logger {
  constructor(
    readonly write: (msg: string) => void,
    readonly metadata: Record<string, any> = {},
    public level: LogLevel = LogLevel.INFO,
  ) {}

  error(msg: string, data?: Record<string, any>): void {
    this.log(LogLevel.ERROR, msg, data);
  }

  warn(msg: string, data?: Record<string, any>): void {
    this.log(LogLevel.WARN, msg, data);
  }

  info(msg: string, data?: Record<string, any>): void {
    this.log(LogLevel.INFO, msg, data);
  }

  debug(msg: string, data?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, msg, data);
  }

  log(level: LogLevel, msg: string, data?: Record<string, any>): void {
    if (level > this.level) {
      return;
    }
    if (data instanceof Error) {
      data = {
        error: data.toString(),
        stack: data.stack?.split("\n"),
      };
    }
    this.write(
      JSON.stringify({
        level: LogLevel[level],
        timestamp: new Date().toISOString(),
        msg,
        ...data,
        ...this.metadata,
      }),
    );
  }
}

export const globalLogger = new Logger(
  (msg) => console.log(msg),
  undefined,
  process.env.NODE_ENV === "test" ? LogLevel.ERROR : LogLevel.INFO,
);
