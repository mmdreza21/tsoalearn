import "reflect-metadata";
import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import swaggerUi from "swagger-ui-express";

import "./controllers/countryController";

import { RegisterRoutes } from "../build/routes";
import { ValidateError } from "@tsoa/runtime";
import logger from "./utils/logger";

export const app = express();
// ...
app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    logger.error(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
      err,
    });
  }

  next();
});
app.use(express.json());

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});
RegisterRoutes(app);
