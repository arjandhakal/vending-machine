import { Router, Request, Response } from "express";
import { asyncWrapper } from "../utils/async";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestException,
  ServiceUnavailableException,
} from "../utils/exception";
import { fetchBalance, updateBalance } from "../balance/db";
import { fetchProductById, updateMany, updateProductById } from "../product/db";

export const transactionRouter = Router();

transactionRouter.post("/", asyncWrapper(handleTransaction));
transactionRouter.put("/refund", asyncWrapper(handleRefund));

async function hasCashForRefund(
  item: Product,
  balance: Balance,
): Promise<boolean> {
  const totalFunds = balance.cashInMachine + balance.coinsInMachine;
  if (item.price > totalFunds) {
    return false;
  }
  return true;
}

/**
 * Calculates the coin and cash to be deducted and gives
 * back the refund amount and the new balance of the system
 */
function deductBalanceAndGetRefund(
  totalRefundAmount: number,
  currentBalance: Balance,
) {
  let newBalance = { ...currentBalance };
  let remainingAmount = totalRefundAmount;
  let coinsRefunded = 0;
  let cashRefunded = 0;

  if (remainingAmount <= newBalance.coinsInMachine) {
    coinsRefunded = remainingAmount;
    newBalance.coinsInMachine -= coinsRefunded;
  } else {
    coinsRefunded = newBalance.coinsInMachine;
    remainingAmount -= newBalance.coinsInMachine;
    newBalance.coinsInMachine = 0;
    cashRefunded = remainingAmount;
    newBalance.cashInMachine -= cashRefunded;
  }

  return {
    newBalance,
    coinsRefunded,
    cashRefunded,
  };
}

async function handleRefund(req: Request, res: Response): Promise<void> {
  const { itemId } = req.body;
  if (!itemId) {
    throw new BadRequestException("Item id not provided");
  }

  const item = await fetchProductById(itemId);
  if (!item) {
    throw new BadRequestException("Item given not in the system");
  }

  const balance = await fetchBalance();
  const systemHasFunds = await hasCashForRefund(item, balance);
  if (!systemHasFunds) {
    throw new ServiceUnavailableException("System out of fund");
  }

  await updateProductById(item.id, {
    stock: item.stock + 1,
  });

  const { newBalance, coinsRefunded, cashRefunded } = deductBalanceAndGetRefund(
    item.price,
    balance,
  );
  await updateBalance(newBalance);

  res.status(StatusCodes.OK).json({
    data: {
      coins: coinsRefunded,
      cash: cashRefunded,
    },
    success: true,
    message: "Item refunded success fully",
  });
}

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
