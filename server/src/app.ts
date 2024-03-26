import http from "http";
import {
  Express,
  Router,
  Request,
  Response,
  NextFunction,
  Errback,
  json,
} from "express";
import { HttpException } from "./utils/exception";
import { productRouter } from "./product/routes";
import cors from "cors";
import { balanceRouter } from "./balance/routes";
import { transactionRouter } from "./transaction/routes";

let server: http.Server | undefined = undefined;

function errorHandler(
  err: Errback,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const httpError = new HttpException();
  if (err instanceof HttpException) {
    httpError.statusCode = err.statusCode;
    httpError.message = err.message;
  }

  res.status(httpError.statusCode).json({
    message: httpError.message,
  });
}

export async function initApp(app: Express): Promise<http.Server> {
  server = http.createServer(app);
  app.use(cors());
  app.use(json());

  const apiRouter = Router();
  apiRouter.get("/", (_req, res) => res.sendStatus(200));
  apiRouter.use("/product/v1", productRouter);
  apiRouter.use("/balance/v1", balanceRouter);
  apiRouter.use("/transaction/v1", transactionRouter);

  app.use("/api/", apiRouter);
  app.use("/", apiRouter);
  app.use(errorHandler);

  return server;
}

export async function shutdownApp(): Promise<void> {
  if (server) {
    server.close();
    server = undefined;
  }
}
