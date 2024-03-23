declare global {
  type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
  };

  type MachineBalance = {
    coinsInStock: number;
    cashInStock: number;
    insertedCash: number;
    insertedCoin: number;
  };
}

export {};
