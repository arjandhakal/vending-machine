import { expect, it, describe, beforeAll, afterEach, afterAll } from "vitest";
import { cart, cartTotal } from "./cart";
import type { Unsubscriber } from "svelte/store";

let coke = {
  id: 1,
  name: "Coke",
  price: 30,
  stock: 10,
};
let pepsi = {
  id: 2,
  name: "Pepsi",
  price: 10,
  stock: 5,
};

describe("testing cart store", () => {
  let cartItems: CartItem[] | undefined;
  const { subscribe: subscribeCartItems, clearCart, addItem } = cart;
  let unsubscribeCartItems: Unsubscriber;

  let totalCost: number | undefined;
  const { subscribe: subscribeCartTotal } = cartTotal;
  let unsubscribeCartTotal: Unsubscriber;

  beforeAll(() => {
    unsubscribeCartItems = subscribeCartItems((v) => {
      cartItems = v;
    });

    unsubscribeCartTotal = subscribeCartTotal((v) => {
      totalCost = v;
    });
  });

  afterEach(() => {
    clearCart();
  });

  afterAll(() => {
    unsubscribeCartItems();
  });

  it("should add one item properly", () => {
    addItem(coke);

    expect(cartItems).toMatchObject([{ ...coke, quantity: 1 }]);
  });

  it("should add one item multiple times correctly", () => {
    let coke = {
      id: 1,
      name: "Coke",
      price: 30,
      stock: 10,
    };

    addItem(coke);
    addItem(coke);

    expect(cartItems).toMatchObject([{ ...coke, quantity: 2 }]);
  });

  it("should not add more than the stock available", () => {
    for (let i = 0; i < 20; i++) {
      addItem(coke);
    }

    expect(cartItems).toMatchObject([{ ...coke, quantity: 10 }]);
  });

  // TODO : subtract page

  it("should calculate the total cost of items in cart properly", () => {
    expect(totalCost).toBe(0);

    addItem(coke);

    expect(totalCost).toBe(coke.price);

    addItem(coke);
    addItem(pepsi);

    expect(totalCost).toBe(2 * coke.price + pepsi.price);
  });
});
