import { derived, writable } from "svelte/store";

const createCart = () => {
  const { subscribe, set, update } = writable<CartItem[]>([]);

  function clearCart() {
    set([]);
  }

  function addItem(item: Product) {
    update((items) => {
      const itemIndex = items.findIndex((i) => item.id === i.id);
      const itemExists = itemIndex !== -1;
      if (itemExists) {
        const itemToUpdate = items[itemIndex];
        const updatedItems = [...items];
        if (itemToUpdate.quantity < itemToUpdate.stock)
          updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...items, { ...item, quantity: 1 }];
      }
    });
  }

  return {
    addItem,
    subscribe,
    clearCart,
  };
};

export const cart = createCart();
export const cartTotal = derived(cart, (items) =>
  items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
);
