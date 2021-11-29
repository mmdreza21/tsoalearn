import mongoose from "mongoose";
import logger from "../logger";

export class StartupDb {
  constructor() {
    mongoose.connect("mongodb://localhost:27017/talk").then(() => {
      logger.info(`mongo to the connected on  !`);
    });
  }
}
