import { Router, Request, Response } from "express";
import { asyncWrapper } from "../utils/async";

export const productRouter = Router();

productRouter.get(
  "/",
  asyncWrapper(async (req: Request, res: Response) => {
    res
      .send(200)
      .json({ products: [], message: "fetched products succesfully" });
  })
);
