import { writable, derived } from "svelte/store";
import { fetchBalanceAPI, insertBalanceAPI } from "../api";

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

  async function insertBalance(data: { type: string; amount: number }) {
    try {
      update((value) => ({
        ...value,
        isInserting: true,
      }));

      const result = await insertBalanceAPI(data);

      update((value) => ({
        ...value,
        isInserting: false,
        data: result.data,
      }));
    } catch (error) {
      handleError(error);
    }
  }

  return {
    subscribe,
    fetchBalance,
    insertBalance,
  };
};

export const balance = createBalance();
export const insertedTotal = derived(
  balance,
  ($b) => $b.data.userCashInserted + $b.data.userCoinsInserted,
);
