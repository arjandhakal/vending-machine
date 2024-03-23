import express from "express";
import { initApp, shutdownApp } from "../app";
import request from "supertest";
import { StatusCodes } from "http-status-codes";

describe("Product Routes", () => {
  const app = express();
  beforeAll(async () => {
    await initApp(app);
  });

  afterAll(async () => {
    await shutdownApp();
  });

  test("/ route is OK", async () => {
    const res1 = await request(app).get("/api/product/v1");
    expect(res1.status).toBe(StatusCodes.OK);
  });
});
