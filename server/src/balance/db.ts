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

export const insertBalance = async (
  values: Record<keyof Balance, number>
): Promise<Balance> => {
  for (const key in values) {
    database[key] += values[key];
  }
  return database;
};
