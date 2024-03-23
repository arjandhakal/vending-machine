import { initApp } from "./app";
import { loadConfig } from "./utils/config";
import { globalLogger } from "./utils/logger";
import express from "express";
import gracefulShutdown from "http-graceful-shutdown";

async function main() {
  process.on("unhandledRejection", (err: any) => {
    globalLogger.error("Unhandled rejection error", err);
  });

  process.on("uncaughtException", (err) => {
    globalLogger.error("Uncaught exception thrown and not handled", err);
    process.exit(1);
  });

  globalLogger.info("Starting Vending Machine Server....");

  const config = loadConfig();

  const app = await initApp(express());
  const server = app.listen(config.port || 8000);
  globalLogger.info(
    `Vending machine server started at port ${config.port || 8000}`,
  );

  gracefulShutdown(server, {
    development: process.env.NODE_ENV !== "production",
    preShutdown: async (signal) => {
      globalLogger.info(`Signal received to turn off vending machine`, {
        signal,
      });
    },
    finally: () => {
      globalLogger.info("Vending machine turned offf!!");
    },
  });
}

main();
