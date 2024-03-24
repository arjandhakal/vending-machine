import { Router, Request, Response } from "express";
import { asyncWrapper } from "../utils/async";
import { fetchBalance, insertBalance } from "./db";
import { StatusCodes } from "http-status-codes";
import { BadRequestException } from "../utils/exception";

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

balanceRouter.put(
  "/",
  asyncWrapper(async (req: Request, res: Response) => {
    const { type, amount } = req.body;
    if (!type || !amount) {
      throw new BadRequestException("currency type and amount must be present");
    }
    if (type != "cash" && type != "coin") {
      throw new BadRequestException(
        "currency type received is not coin or cash"
      );
    }
    if (isNaN(Number(amount))) {
      throw new BadRequestException("amount must be numeric");
    }

    let dataToSave: Record<string, any> = {};
    if (type === "cash") {
      dataToSave["userCashInserted"] = amount;
    }
    if (type == "coin") {
      dataToSave["userCoinsInserted"] = amount;
    }

    const balance = await insertBalance(dataToSave);
    res.status(StatusCodes.OK).json({
      data: balance,
      message: "fetched balance succesfully",
      success: true,
    });
  })
);
