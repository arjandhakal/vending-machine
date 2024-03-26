<script lang="ts">
  import CustomButton from "./CustomButton.svelte";
  import { cart } from "../store/index";
  import { onDestroy } from "svelte";

  export let item: Product;
  export let cartItems: CartItem[] = [];

  const unsubscribeCartItems = cart.subscribe((v) => (cartItems = v));

  onDestroy(unsubscribeCartItems);

  let currentStock: number;
  $: {
    const itemInCartIndex = cartItems.findIndex((i) => i.id === item.id);
    if (itemInCartIndex === -1) {
      currentStock = item.stock;
    } else {
      currentStock = item.stock - cartItems[itemInCartIndex].quantity;
    }
  }
  let outOfStock: boolean;
  $: {
    outOfStock = currentStock === 0;
  }
</script>

<div class="item-box" class:empty={outOfStock}>
  <span>{item.name}</span>
  <span class="item-price">Price: Rs {item.price}</span>
  {#if currentStock}
    <span>In stock: {currentStock}</span>
  {:else}
    <span>Out of Stock</span>
  {/if}
  <div class="buttons">
    <CustomButton
      ariaLabel="Plus"
      buttonLabel="+"
      styleClass="button-reverse"
      onClick={() => item && cart.addItem(item)}
      disabled={outOfStock}
    />
    <CustomButton
      ariaLabel="Minus"
      buttonLabel="&minus;"
      styleClass="button-reverse"
      onClick={() => item && cart.removeItem(item)}
    />
  </div>
</div>

<style>
  .item-box {
    max-width: 100px;
    border: 2px solid var(--theme-text-color);
    border-radius: 15px;
    padding: 10px;
  }

  .item-box span {
    display: inline-block;
  }

  .empty {
    border-color: rgba(236, 92, 92, 0.473);
  }

  .buttons {
    display: flex;
    justify-content: space-around;
  }
</style>
