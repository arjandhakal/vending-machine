import { Router, Request, Response } from "express";
import { asyncWrapper } from "../utils/async";
import { StatusCodes } from "http-status-codes";
import { BadRequestException } from "../utils/exception";
import { fetchBalance, updateBalance } from "../balance/db";
import { updateMany } from "../product/db";

export const transactionRouter = Router();

transactionRouter.post("/", asyncWrapper(handleTransaction));

async function handleTransaction(req: Request, res: Response): Promise<void> {
  const { cartItems } = req.body;
  if (!cartItems || cartItems.length === 0) {
    throw new BadRequestException("Cart items not sent or empty");
  }

  const totalCost = calculateTotalCost(cartItems);
  const balance = await fetchBalance();
  const change = updateBalanceAndGetChange(balance, totalCost);
  await updateBalance(balance);
  const adjustedProducts = adjustProductStock(cartItems);
  await updateMany(adjustedProducts);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Items purchased successfully",
    data: { change },
  });
}

function calculateTotalCost(cartItems: CartItem[]): number {
  return cartItems.reduce((acc: number, curr: CartItem) => {
    if (curr.price && curr.quantity) {
      return acc + curr.price * curr.quantity;
    } else {
      throw new BadRequestException("Invalid item format");
    }
  }, 0);
}

export function updateBalanceAndGetChange(balance: Balance, totalCost: number) {
  let remainingCost = totalCost;
  let change = {
    coins: 0,
    cash: 0,
  };

  while (remainingCost > 0) {
    if (remainingCost <= balance.userCashInserted) {
      balance.cashInMachine += remainingCost;
      balance.userCashInserted -= remainingCost;
      change.cash = balance.userCashInserted;
      balance.userCashInserted = 0;
      remainingCost = 0;
    } else {
      remainingCost -= balance.userCashInserted;
      balance.cashInMachine += balance.userCashInserted;
      balance.userCashInserted = 0;

      balance.coinsInMachine += remainingCost;
      balance.userCoinsInserted -= remainingCost;
      change.coins = balance.userCoinsInserted;
      balance.userCoinsInserted = 0;
      remainingCost = 0;
    }
  }

  return change;
}

function adjustProductStock(cartItems: CartItem[]): Partial<Product>[] {
  return cartItems.map((item: CartItem) => {
    const updatedItem = { ...item };
    if (updatedItem.quantity && updatedItem.stock) {
      updatedItem.stock -= updatedItem.quantity;
      delete updatedItem.quantity;
    }
    return updatedItem;
  });
}
