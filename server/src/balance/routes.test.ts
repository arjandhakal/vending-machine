import express from "express";
import { initApp, shutdownApp } from "../app";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { database } from "./db";

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

  test("PUT: /api/balance/v1 ", async () => {
    database.userCashInserted = 30;
    database.userCoinsInserted = 0;
    const res = await request(app)
      .put("/api/balance/v1")
      .send({ type: "cash", amount: 10 });

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.data).toMatchObject({
      userCashInserted: 40,
      userCoinsInserted: 0,
    });
  });

  test("PUT: /api/balance/v1 should throw bad request error, if validation does not hold", async () => {
    const res1 = await request(app).put("/api/balance/v1");
    expect(res1.status).toBe(StatusCodes.BAD_REQUEST);

    const res2 = await request(app)
      .put("/api/balance/v1")
      .send({ type: "cash" });
    expect(res2.status).toBe(StatusCodes.BAD_REQUEST);

    const res3 = await request(app).put("/api/balance/v1").send({ amount: 20 });
    expect(res2.status).toBe(StatusCodes.BAD_REQUEST);

    const res4 = await request(app)
      .put("/api/balance/v1")
      .send({ amount: "abc", type: "cash" });
    expect(res4.status).toBe(StatusCodes.BAD_REQUEST);
  });
});
