import { app } from "./app";

import { StartupDb } from "./utils/startUp/db";
// import swaggerUi from "swagger-ui-express";

import logger, { WinstonLogger } from "./utils/logger";

new WinstonLogger();
new StartupDb();

const port = process.env.PORT || 8000;
app.listen(port, () =>
  logger.info(`Example app listening at =>>>> http://localhost:${port}`)
);
