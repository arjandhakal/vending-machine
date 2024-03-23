import { Router, Request, Response } from "express";
import { asyncWrapper } from "../utils/async";
import { fetchproducts } from "./db";
import { StatusCodes } from "http-status-codes";

export const productRouter = Router();

productRouter.get(
  "/",
  asyncWrapper(async (req: Request, res: Response) => {
    const products = await fetchproducts();
    res.status(StatusCodes.OK).json({
      data: products,
      message: "fetched products succesfully",
      success: true,
    });
  })
);
