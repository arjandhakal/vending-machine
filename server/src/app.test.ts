import express from "express";
import request from "supertest";
import { initApp } from "./app";

describe("App", () => {
  test("Use /api", async () => {
    const app = express();
    await initApp(app);
    const res = await request(app).get("/api");
    expect(res.status).toBe(200);
  });
});
