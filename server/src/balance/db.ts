/**
 * Simple in store database for balance
 */
export const database: Balance = {
  coinsInMachine: 100,
  cashInMachine: 200,
  userCashInserted: 0,
  userCoinsInserted: 0,
};

export const fetchBalance = async (): Promise<Balance> => {
  return database;
};
