import { createLogger, format, transports } from 'winston';

const { combine, colorize, timestamp, align, printf } = format;

const customFormat = combine(
  timestamp(),
  align(),
);

const consoleFormat = combine(
  colorize(),
  customFormat,
  printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const fileFormat = combine(
  customFormat,
  printf(info => `[${info.timestamp}][${info.level.toUpperCase()}]: ${info.message}`)
);

export const logger = createLogger({
  transports: [
    new transports.Console({
      format: consoleFormat
    }),
    new transports.File({ filename: 'logs/info.log', format: fileFormat })
  ]
});
