import express from "express";
import { initApp, shutdownApp } from "../app";
import request from "supertest";
import { StatusCodes } from "http-status-codes";

describe("Balance Routes", () => {
  const app = express();
  beforeAll(async () => {
    await initApp(app);
  });

  afterAll(async () => {
    await shutdownApp();
  });

  test("GET: balance route gives initial balance", async () => {
    const res = await request(app).get("/api/balance/v1");
    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.data).toMatchObject({
      coinsInMachine: 100,
      cashInMachine: 200,
      userCashInserted: 0,
      userCoinsInserted: 0,
    });
  });
});
