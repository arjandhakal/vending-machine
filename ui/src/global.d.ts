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
}

export {};
