<script lang="ts">
  import { onMount } from "svelte";
  import { products, cart, navigateTo } from "../store/index";
  import { fly } from "svelte/transition";
  import CartPanel from "../lib/CartPanel.svelte";
  import { Pages } from "../constants";
  import CustomButton from "../lib/CustomButton.svelte";

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
  <button on:click={() => navigateTo(Pages.HOME)}> Back to home </button>

  <div class="items-list">
    {#each $products.data as item (item.id)}
      <div class="item-box">
        <div>{item.name}</div>
        <div>Price: Rs {item.price}</div>
        <div class="buttons">
          <div class="button">
            <button on:click={() => cart.addItem(item)}>+</button>
          </div>
          <div class="button">
            <button on:click={() => cart.removeItem(item)}>-</button>
          </div>
        </div>
      </div>
    {/each}
  </div>

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

  .item-box {
    max-width: 100px;
    border: 2px solid var(--theme-text-color);
    border-radius: 15px;
    padding: 10px;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
  }

  .buttons .button {
    background: var(--theme-text-color);
  }

  .buttons button {
    width: 30px;
    color: #333;
  }
</style>
