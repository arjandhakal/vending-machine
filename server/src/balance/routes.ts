import { Router, Request, Response } from "express";
import { asyncWrapper } from "../utils/async";
import { fetchBalance } from "./db";
import { StatusCodes } from "http-status-codes";

export const balanceRouter = Router();

balanceRouter.get(
  "/",
  asyncWrapper(async (_req: Request, res: Response) => {
    const balance = await fetchBalance();
    res.status(StatusCodes.OK).json({
      data: balance,
      message: "fetched balance succesfully",
      success: true,
    });
  })
);
