import { writable } from "svelte/store";
import { fetchProductsAPI } from "../api";

type ProductsStore = {
  isFetching: boolean;
  error: null | string;
  data: Product[];
};

const createProducts = () => {
  const { subscribe, update } = writable<ProductsStore>({
    isFetching: false,
    error: null,
    data: [],
  });

  function handleError(error: unknown) {
    update((value) => ({
      ...value,
      data: [],
      isFetching: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }));
  }

  async function fetchProducts() {
    try {
      update((value) => {
        return {
          ...value,
          isFetching: true,
        };
      });
      const result = await fetchProductsAPI();
      update((_value) => {
        return {
          isFetching: false,
          error: null,
          data: result.data,
        };
      });
    } catch (error) {
      handleError(error);
    }
  }

  return {
    subscribe,
    fetchProducts,
  };
};

export const products = createProducts();
