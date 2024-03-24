declare global {
  type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
  };

  type Balance = {
    coinsInMachine: number;
    cashInMachine: number;
    userCoinsInserted: number;
    userCashInserted: number;
  };
  interface CartItem extends Product {
    quantity: number;
  }
}

export {};
