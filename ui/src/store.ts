import { writable } from "svelte/store";
import { Pages } from "./constants";

const apiUrl = import.meta.env.VITE_API_URL;

const createProducts = () => {
  const { subscribe, set } = writable([]);

  async function fetchProducts() {
    try {
      const url = apiUrl + "/product/v1";
      const response = await fetch(url);
      if (!response.ok) {
        console.log(response);
        return;
      }
      const data = await response.json();
      console.log(data);
      set(data);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    subscribe,
    fetchProducts,
  };
};

export const displayPage = writable<{
  current: Pages;
  data?: Record<string, any>;
}>({ current: Pages.HOME, data: {} });

export const products = createProducts();
