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

  function removeItem(item: Product) {
    update((items) => {
      const itemsIndex = items.findIndex((i) => item.id === i.id);
      const itemExists = itemsIndex !== -1;
      if (itemExists) {
        const itemToUpdate = items[itemsIndex];
        let updatedItems;
        if (itemToUpdate.quantity > 1) {
          updatedItems = [...items];
          updatedItems[itemsIndex].quantity -= 1;
          return updatedItems;
        } else {
          return items.filter((i) => i.id !== item.id);
        }
      }
      return items;
    });
  }

  return {
    addItem,
    removeItem,
    subscribe,
    clearCart,
  };
};

export const cart = createCart();
export const cartTotal = derived(cart, (items) =>
  items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
);
