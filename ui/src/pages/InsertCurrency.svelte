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
  import { fly } from "svelte/transition";
  import CustomButton from "../lib/CustomButton.svelte";

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

<section in:fly={{ x: -200, duration: 300, delay: 300 }}>
  <div class="back-button">
    <CustomButton
      onClick={() => navigateTo(Pages.ITEMS)}
      buttonLabel="← Back"
      ariaLabel="Back to items page"
    />
  </div>
  <InsertCurrencyForm {onSubmit} />
  <hr />
  <CartPanel />
  <hr />
  <InsertCurrencyPanel />
  <hr />
  <div>
    <CustomButton
      onClick={makePurchase}
      buttonLabel="Purchase"
      ariaLabel="Purchase items"
    />
  </div>
</section>

<style>
  .back-button {
    max-width: 100px;
    margin-bottom: 20px;
  }
</style>
