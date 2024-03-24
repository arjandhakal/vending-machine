<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Pages } from "../constants";
  import {
    navigateTo,
    balance,
    insertedTotal,
    cartTotal,
  } from "../store/index";
  import CartPanel from "../lib/CartPanel.svelte";
  import InsertCurrencyForm from "../lib/InsertCurrencyForm.svelte";
  import InsertCurrencyPanel from "../lib/InsertCurrencyPanel.svelte";

  let currentBalance: BalanceStore | undefined;
  const unsubscribeBalance = balance.subscribe((v) => (currentBalance = v));
  let totalInserted: number;
  let totalCost: number;
  const unsubscribeInsertedTotal = insertedTotal.subscribe(
    (v) => (totalInserted = v)
  );
  const unsubscribeTotalCost = cartTotal.subscribe((v) => (totalCost = v));

  function onSubmit(data: { amount: number; type: string }) {
    balance.insertBalance(data);
  }

  function makePurchase() {
    if (totalInserted < totalCost) {
      console.log("Amount inserted is not enough to purchase items");
      return;
    }

    /*
    input: 
      cartItems: []

    return:
      {
        change: {
          coins: x,
          cash: x
        }
      }
   */
  }

  onMount(() => {
    balance.fetchBalance();
  });

  onDestroy(() => {
    unsubscribeBalance();
    unsubscribeInsertedTotal();
    unsubscribeTotalCost();
  });
</script>

<div>
  <button on:click={() => navigateTo(Pages.ITEMS)}> Back to Items List </button>
  <InsertCurrencyForm {onSubmit} />
  <CartPanel />
  <InsertCurrencyPanel />
  <div>
    <button on:click={makePurchase}>Purchase </button>
  </div>
</div>
