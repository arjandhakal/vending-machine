import express from "express";
import { initApp, shutdownApp } from "../app";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { database as productDatabase } from "../product/db";
import { database as balanceDatabase } from "../balance/db";
import { updateBalanceAndGetChange } from "./routes";

describe("Transaction Routes", () => {
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
      change: {
        coins: 50,
        cash: 0,
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
