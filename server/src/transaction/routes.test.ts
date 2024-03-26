import express from "express";
import { initApp, shutdownApp } from "../app";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { fetchProductById, database as productDatabase } from "../product/db";
import { database as balanceDatabase } from "../balance/db";
import { updateBalanceAndGetChange } from "./routes";

describe("Transaction Routes (Purchase)", () => {
  const app = express();
  beforeAll(async () => {
    await initApp(app);
  });

  afterAll(async () => {
    await shutdownApp();
  });

  test("update balance function", () => {
    const totalCost = 100;
    const balance = {
      coinsInMachine: 100,
      cashInMachine: 100,
      userCashInserted: 50,
      userCoinsInserted: 100,
    };
    const change = updateBalanceAndGetChange(balance, totalCost);
    expect(balance).toMatchObject({
      coinsInMachine: 150,
      cashInMachine: 150,
      userCashInserted: 0,
      userCoinsInserted: 0,
    });
    expect(change).toMatchObject({
      coins: 50,
      cash: 0,
    });
  });

  test("purchase transaction works properly, test 1: normal checkout", async () => {
    const input = {
      cartItems: [
        {
          id: 1,
          name: "Coke",
          price: 20,
          stock: 10,
          quantity: 5,
        },
      ],
    };
    productDatabase[0] = {
      id: 1,
      name: "Coke",
      price: 20,
      stock: 10,
    };

    balanceDatabase.coinsInMachine = 100;
    balanceDatabase.cashInMachine = 100;
    balanceDatabase.userCashInserted = 50;
    balanceDatabase.userCoinsInserted = 100;

    const expectedApiOutput = {
      success: true,
      message: expect.any(String),
      data: {
        change: {
          coins: 50,
          cash: 0,
        },
      },
    };

    const res = await request(app).post("/api/transaction/v1").send(input);
    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body).toMatchObject(expectedApiOutput);
    expect(productDatabase[0]).toMatchObject({
      id: 1,
      name: "Coke",
      price: 20,
      stock: 5,
    });
    expect(balanceDatabase).toMatchObject({
      coinsInMachine: 150,
      cashInMachine: 150,
      userCashInserted: 0,
      userCoinsInserted: 0,
    });
  });
});

describe("Transaction Route (Refund)", () => {
  const app = express();
  beforeAll(async () => {
    await initApp(app);
  });

  afterAll(async () => {
    await shutdownApp();
  });

  test("refund should account for cash/coin in system properly", async () => {
    balanceDatabase.coinsInMachine = 0;
    balanceDatabase.cashInMachine = 0;

    const res1 = await request(app)
      .put("/api/transaction/v1/refund")
      .send({ itemId: 1 });
    expect(res1.status).toBe(StatusCodes.SERVICE_UNAVAILABLE);
    balanceDatabase.coinsInMachine = 10;
    balanceDatabase.cashInMachine = 9;

    const res2 = await request(app)
      .put("/api/transaction/v1/refund")
      .send({ itemId: 1 });
    expect(res2.status).toBe(StatusCodes.SERVICE_UNAVAILABLE);

    balanceDatabase.coinsInMachine = 10;
    balanceDatabase.cashInMachine = 10;

    const res3 = await request(app)
      .put("/api/transaction/v1/refund")
      .send({ itemId: 1 });
    expect(res3.status).toBe(StatusCodes.OK);

    balanceDatabase.coinsInMachine = 20;
    balanceDatabase.cashInMachine = 0;

    const res4 = await request(app)
      .put("/api/transaction/v1/refund")
      .send({ itemId: 1 });
    expect(res4.status).toBe(StatusCodes.OK);

    balanceDatabase.coinsInMachine = 0;
    balanceDatabase.cashInMachine = 20;

    const res5 = await request(app)
      .put("/api/transaction/v1/refund")
      .send({ itemId: 1 });
    expect(res5.status).toBe(StatusCodes.OK);
  });

  test("refund, increases the stock of the item properly", async () => {
    const stockBeforeRefund = productDatabase.find(
      (p: any) => p.id === 1,
    ).stock;

    const res = await request(app)
      .put("/api/transaction/v1/refund")
      .send({ itemId: 1 });
    expect(res.status).toBe(StatusCodes.OK);

    const cokeAfterRefund = productDatabase.find((p: any) => p.id === 1);
    expect(stockBeforeRefund + 1).toBe(cokeAfterRefund.stock);
  });
});
