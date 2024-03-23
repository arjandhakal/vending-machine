import http from "http";
import { Express, Router } from "express";

let server: http.Server | undefined = undefined;

export async function initApp(app: Express): Promise<http.Server> {
  server = http.createServer(app);

  const apiRouter = Router();
  apiRouter.get("/", (_req, res) => res.sendStatus(200));

  app.use("/api/", apiRouter);
  app.use("/", apiRouter);

  return server;
}
