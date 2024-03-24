<script lang="ts">
  import { onMount } from "svelte";
  import { products, cart, navigateTo } from "../store/index";
  import { fly } from "svelte/transition";
  import CartPanel from "../lib/CartPanel.svelte";
  import { Pages } from "../constants";
  import CustomButton from "../lib/CustomButton.svelte";
  import ItemBox from "../lib/ItemBox.svelte";

  function handleContinue() {
    navigateTo(Pages.INSERT_CURRENCY);
  }

  function handleCancel() {
    cart.clearCart();
    navigateTo(Pages.HOME);
  }

  onMount(() => {
    products.fetchProducts();
  });
</script>

<section in:fly={{ x: -200, duration: 300, delay: 300 }}>
  <div class="back-button">
    <CustomButton
      onClick={() => navigateTo(Pages.HOME)}
      buttonLabel="← Back"
      ariaLabel="Back to Home"
    />
  </div>

  <div class="items-list">
    {#each $products.data as item (item.id)}
      <ItemBox {item} />
    {/each}
  </div>
  <hr />
  <CartPanel />
  {#if $cart.length > 0}
    <div class="action-btns">
      <CustomButton
        ariaLabel="Continue"
        buttonLabel="Continue"
        onClick={handleContinue}
      />
      <CustomButton
        ariaLabel="Cancel"
        buttonLabel="Cancel"
        styleClass="button-reverse"
        onClick={handleCancel}
      />
    </div>
  {/if}
</section>

<style>
  .action-btns {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .items-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .back-button {
    max-width: 100px;
    margin-bottom: 20px;
  }
</style>
