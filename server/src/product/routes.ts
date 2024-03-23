import { Router, Request, Response } from "express";
import { asyncWrapper } from "../utils/async";
import { fetchproducts } from "./db";

export const productRouter = Router();

productRouter.get(
  "/",
  asyncWrapper(async (req: Request, res: Response) => {
    const products = await fetchproducts();
    res
      .status(200)
      .json({ data: products, message: "fetched products succesfully" });
  })
);
