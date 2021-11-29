import { createLogger, format, transports } from "winston";
// require("winston-mongodb");

export class WinstonLogger {
  constructor() {
    process.on("unhandledRejection", (ex) => {
      throw ex;
    });
  }

  logger = createLogger({
    transports: [
      new transports.Console({
        level: "error",

        format: format.combine(
          format.timestamp(),
          format.simple(),
          format.colorize(),
          format.align()
        ),
        handleExceptions: true,
      }),
      new transports.Console({
        level: "info",
        format: format.combine(format.timestamp(), format.simple()),
        handleExceptions: true,
      }),
      // new transports.File({
      //     filename: "error.log",
      //     level: "error",
      //     level: 'info',
      //     // level:'',
      //     format: format.combine(format.timestamp(), format.json(), format.colorize(), format.align(), format.prettyPrint()),
      //     handleExceptions: true
      // }),
      // new transports.MongoDB({
      //     db: process.env.MONGO_URI
      //     , level: "error",
      //     options: { useUnifiedTopology: true },
      //     collection: "error",
      //     format: format.combine(format.timestamp(), format.json(), format.prettyPrint()),
      //     handleExceptions: true,
      // })
    ],
  });
}

const logger = new WinstonLogger();
export default logger.logger;
