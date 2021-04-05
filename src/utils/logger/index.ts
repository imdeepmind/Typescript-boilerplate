import chalk from 'chalk';
import * as winston from 'winston';

import env from "../../env";

const { format, createLogger, transports } = winston;
const { combine, timestamp, printf } = format;

class Logger {
    private logger: winston.Logger;

    private static getLevelWithColor = (level: string) => {
        switch (level) {
            case "info":
                return level;
            case "error":
                return chalk.red(level);
            case "warn":
                return chalk.yellow(level);
            case "debug":
                return chalk.gray(level);
            default:
                return level;
        }
    }

    private static customFormat = printf(({ level, message, timestamp }) => {
        return `${Logger.getLevelWithColor(level)}-${timestamp}: ${message}`;
    });

    constructor() {
        this.logger = createLogger({
            level: env.log.level,
            format: combine(
                timestamp(),
                Logger.customFormat
            ),
            transports: [
                new transports.Console(),
                new transports.File({
                    filename: env.log.combinedOutput,
                }),
                new winston.transports.File({
                    filename: env.log.errorOutput,
                    level: 'error'
                })
            ]
        });
    }

    public debug(message: string, ...args: any[]): void {
        this.log('debug', message, args);
    }

    public info(message: string, ...args: any[]): void {
        this.log('info', message, args);
    }

    public warn(message: string, ...args: any[]): void {
        this.log('warn', message, args);
    }

    public error(message: string, ...args: any[]): void {
        this.log('error', message, args);
    }

    private log(level: string, message: string, args: any[]): void {
        this.logger.log({
            level,
            message: message,
            args
        });
    }
}

export {
    Logger
}