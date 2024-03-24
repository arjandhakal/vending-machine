import { writable } from "svelte/store";
import { fetchBalanceAPI } from "../api";

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

const createBalance = () => {
  const { subscribe, update } = writable<BalanceStore>({
    isInserting: false,
    isFetchinBalance: false,
    error: null,
    data: {
      coinsInMachine: 0,
      cashInMachine: 0,
      userCashInserted: 0,
      userCoinsInserted: 0,
    },
  });

  function handleError(error: unknown) {
    update((value) => ({
      ...value,
      isInserting: false,
      isFetchinBalance: false,
      error: error instanceof Error ? error.message : "Unknown error occured",
    }));
  }

  async function fetchBalance() {
    try {
      update((value) => {
        return {
          ...value,
          isFetchinBalance: true,
        };
      });

      const result = await fetchBalanceAPI();
      update((value) => {
        return {
          ...value,
          isFetchinBalance: false,
          data: result.data,
        };
      });
    } catch (error) {
      handleError(error);
    }
  }

  return {
    subscribe,
    fetchBalance,
  };
};
