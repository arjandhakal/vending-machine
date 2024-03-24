<script lang="ts">
  import { onMount } from "svelte";
  import { products, cart, navigateTo } from "../store/index";
  import { fly } from "svelte/transition";
  import CartPanel from "../lib/CartPanel.svelte";
  import { Pages } from "../constants";

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

<div transition:fly={{ y: 200, duration: 1000 }}>
  <button on:click={() => navigateTo(Pages.HOME)}> Back to home </button>

  {#each $products.data as item (item.id)}
    <div>Item: {item.name}</div>
    <div>Price {item.price}</div>
    <button on:click={() => cart.addItem(item)}>+</button>
    <button on:click={() => cart.removeItem(item)}>-</button>
    <hr />
  {/each}

  <CartPanel />
  {#if $cart.length > 0}
    <button on:click={handleContinue}>Continue</button>
    <button on:click={handleCancel}>Cancel</button>
  {/if}
</div>
