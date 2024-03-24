<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Pages } from "../constants";
  import {
    navigateTo,
    balance,
    insertedTotal,
    cartTotal,
    cart,
  } from "../store/index";
  import CartPanel from "../lib/CartPanel.svelte";
  import InsertCurrencyForm from "../lib/InsertCurrencyForm.svelte";
  import InsertCurrencyPanel from "../lib/InsertCurrencyPanel.svelte";
  import { makePurchaseAPI } from "../api";

  let cartItems: CartItem[] | undefined;
  let totalInserted: number;
  let totalCost: number;
  const unsubscribeInsertedTotal = insertedTotal.subscribe(
    (v) => (totalInserted = v)
  );
  const unsubscribeTotalCost = cartTotal.subscribe((v) => (totalCost = v));
  const unsubscribeCart = cart.subscribe((v) => (cartItems = v));

  function onSubmit(data: { amount: number; type: string }) {
    balance.insertBalance(data);
  }

  async function makePurchase() {
    if (totalInserted < totalCost) {
      console.log("Amount inserted is not enough to purchase items");
      return;
    }
    if (cartItems) {
      try {
        const result = await makePurchaseAPI(cartItems);
        console.log(result);
        navigateTo(Pages.TRANSACTION_RESULT, {
          success: true,
          message: "Transaction completed successfully",
          data: result.data,
        });
      } catch (error) {
        navigateTo(Pages.TRANSACTION_RESULT, {
          success: false,
          message:
            error instanceof Error ? error.message : "Unknown error occured",
          data: null,
        });
      }
    }
  }

  onMount(() => {
    balance.fetchBalance();
  });

  onDestroy(() => {
    unsubscribeInsertedTotal();
    unsubscribeTotalCost();
    unsubscribeCart();
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
