import chalk from 'chalk';

/**
 * @description
 * An enum of valid logging levels.
 */
export enum LogLevel {
  Error,
  Warn,
  Default,
  Debug,
}

/**
 * @description Server-Side Logger
 *
 * @see [Inspiration](https://github.com/vendure-ecommerce/vendure)
 */
export class Logger {
  private level: LogLevel = LogLevel.Default;
  private readonly timestamp: boolean;

  constructor(options?: { level?: LogLevel; timestamp?: boolean }) {
    this.level = options?.level ?? LogLevel.Default;
    this.timestamp = options?.timestamp ?? true;
  }

  /** @internal */
  error(message: string, trace?: object | string | undefined) {
    if (this.level <= LogLevel.Error) return;

    const output = trace ? `${message}: ${JSON.stringify(trace)}` : message;
    const timestamp = new Date(Date.now()).toLocaleString(undefined);

    process.stderr.write(
      `[${chalk.red(`ERROR`)}] ${timestamp} - ${chalk.cyan(output)} \n`
    );
  }

  /** @internal */
  warn(message: string) {
    if (this.level <= LogLevel.Warn) return;
    this.print(chalk.yellow(`WARNING`), message);
  }

  /** @internal */
  info(message: string) {
    if (this.level <= LogLevel.Default) return;
    this.print(chalk.blueBright(`INFO`), message);
  }

  /** @internal */
  debug(message: string) {
    if (this.level <= LogLevel.Debug) return;
    this.print(chalk.magenta(`DEBUG`), message);
  }

  private print(prefix: string, message: string) {
    const timestamp = new Date(Date.now()).toLocaleString(undefined);
    process.stdout.write(
      `[${prefix}] ${timestamp} - ${chalk.cyan(message)} \n`
    );
  }
}

export default new Logger({ level: LogLevel.Default });
