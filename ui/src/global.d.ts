declare global {
  interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
  }

  interface CartItem extends Product {
    quantity: number;
  }

  type MachineBalance = {
    coinsInStock: number;
    cashInStock: number;
    insertedCash: number;
    insertedCoin: number;
  };

  type Balance = {
    coinsInMachine: number;
    cashInMachine: number;
    userCashInserted: number;
    userCoinsInserted: number;
  };

  type BalanceStore = {
    isInserting: boolean;
    isFetchinBalance: boolean;
    error: null | string;
    data: Balance;
  };
}

export {};
