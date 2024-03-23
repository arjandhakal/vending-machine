import http from "http";
import {
  Express,
  Router,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";
import { HttpException } from "./utils/exception";
import { productRouter } from "./product/routes";

let server: http.Server | undefined = undefined;

function errorHandler(
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const httpError = new HttpException();
  if (err instanceof HttpException) {
    httpError.statusCode = err.statusCode;
    httpError.message = err.message;
  }

  res.status(httpError.statusCode).json({
    messsage: httpError.message,
  });
}

export async function initApp(app: Express): Promise<http.Server> {
  server = http.createServer(app);

  const apiRouter = Router();
  apiRouter.get("/", (_req, res) => res.sendStatus(200));
  apiRouter.use("/product/v1", productRouter);

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
